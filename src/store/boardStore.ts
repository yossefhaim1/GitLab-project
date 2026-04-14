import { create } from "zustand";
import type { Boards, Columns, Items, Statuses } from "../Type";
import { API } from "../Api/boardPageApi";

interface BoardStore {
  boards: Boards[];
  activeBoardId: string | null;
  columns: Columns[];
  items: Items[];
  loading: boolean;
  error: string | null;
  statuses: Statuses[];

  setActiveBoardId: (boardId: string) => void;
  fetchBoards: () => Promise<void>;
  fetchColumns: (boardId: string) => Promise<void>;
  fetchItems: (boardId: string) => Promise<void>;
  fetchBoardData: (boardId: string) => Promise<void>;
  addItem: (item: Items) => Promise<void>;
  updateItem: (id: string, changes: Partial<Items>) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  addStatus: (status: Statuses) => Promise<void>;
  addBoard: (board: Boards) => Promise<void>;
}

export const useBoardStore = create<BoardStore>((set, get) => ({
  boards: [],
  activeBoardId: null,
  columns: [],
  items: [],
  loading: false,
  error: null,
  statuses: [],

  setActiveBoardId: (boardId) => {
    set({ activeBoardId: boardId });
    get().fetchBoardData(boardId);
  },

  fetchBoards: async () => {
    set({ loading: true, error: null });

    try {
      const res = await API.getBoards();
      const boards = res.data;

      const defaultBoard = boards.find((board) => board.isDefault);

      set({
        boards,
        activeBoardId: defaultBoard?.id || null,
        loading: false,
      });

      if (defaultBoard?.id) {
        await get().fetchBoardData(defaultBoard.id);
      }
    } catch (err) {
      console.error(err);
      set({
        error: "Failed to fetch boards",
        loading: false,
      });
    }
  },

  fetchColumns: async (boardId) => {
    try {
      const res = await API.getColumns(boardId);

      set({
        columns: res.data,
      });
    } catch (err) {
      console.error(err);
      set({
        error: "Failed to fetch columns",
      });
    }
  },

  fetchItems: async (boardId) => {
    try {
      const res = await API.getItems(boardId);

      set({
        items: res.data,
      });
    } catch (err) {
      console.error(err);
      set({
        error: "Failed to fetch items",
      });
    }
  },

  fetchBoardData: async (boardId) => {
    set({ loading: true, error: null });

    try {
      const [columnsRes, itemsRes, statusesRes] = await Promise.all([
        API.getColumns(boardId),
        API.getItems(boardId),
        API.getStatuses(),
      ]);

      set({
        activeBoardId: boardId,
        columns: columnsRes.data,
        items: itemsRes.data,
        statuses: statusesRes.data,
        loading: false,
      });
    } catch (err) {
      console.error(err);
      set({
        error: "Failed to fetch board data",
        loading: false,
      });
    }
  },

  addItem: async (item) => {
    try {
      const res = await API.addItemRequest(item);

      set((state) => ({
        items: [...state.items, res.data],
      }));
    } catch (err) {
      console.error(err);
      set({
        error: "Failed to add item",
      });
    }
  },

  updateItem: async (id, changes) => {
    try {
      const res = await API.updateItemRequest(id, changes);
      const updatedItem = res.data;

      set((state) => ({
        items: state.items.map((item) => (item.id === id ? updatedItem : item)),
      }));
    } catch (err) {
      console.error(err);
      set({
        error: "Failed to update item",
      });
    }
  },

  deleteItem: async (id) => {
    try {
      await API.deleteItemById(id);

      set((state) => ({
        items: state.items.filter((item) => item.id !== id),
      }));
    } catch (err) {
      console.error(err);
      set({
        error: "Failed to delete item",
      });
    }
  },

  addStatus: async (status) => {
    try {
      const res = await API.addStatus(status);

      set((state) => ({
        statuses: [...state.statuses, res.data],
      }));
    } catch (err) {
      console.error(err);
      set({
        error: "Failed to add status",
      });
    }
  },

  addBoard: async (board) => {
    try {
      const res = await API.addBoard(board);

      set((state) => ({
        boards: [...state.boards, res.data],
      }));
    } catch (err) {
      console.error(err);
      set({
        error: "Failed to add board",
      });
    }
  },
}));