import { create } from "zustand";
import type {
  Boards,
  Columns,
  Items,
  CreateItemPayload,
  CreateColumnPayload,
  CreateBoardPayload,
  CreateUserPayload,
  User,
} from "../Type";
import { API } from "../Api/boardPageApi";

interface BoardStore {
  boards: Boards[];
  activeBoardId: number | null;
  columns: Columns[];
  items: Items[];
  loading: boolean;
  error: string | null;
  nextColumnId: number | null;
  searchItem: string;
  users: User[];

  // פונקציות שמעדכנות את הסטייט של הסטור
  setItems: (items: Items[]) => void;

  // פה זה עושה פאצ לכל הייטם והכולום לפי ה ID   ולסטטוס בכללי
  fetchBoardData: (boardId: number) => Promise<void>;
  // משנה מצב קיים לבורד אחר שהוא יהיה מעכשיו ה DEFAULT
  setActiveBoardId: (boardId: number) => void;

  // מחפש את כל הבורדים ומגדיר את ה ACTIVEBOARDID כברירת מחדל
  fetchBoards: () => Promise<void>;

  //עושה פאצ לכל ה ITEMS לפי ה ID של הבורד
  fetchItems: (boardId: number) => Promise<void>;

  // מוסיף ל DATABASE ITEM חדש
  addItem: (item: CreateItemPayload) => Promise<void>;

  // הוספת COLUMN חדש ל DATABASE
  addColumn: (column: CreateColumnPayload) => Promise<void>;

  // מעדכן ITEMS קיימים
  updateItem: (id: number, changes: Partial<Items>) => Promise<void>;

  // מוחק ITEM קיים
  deleteItem: (id: number) => Promise<void>;

  // מוסיף בורד חדש ל DATABASE של BOARDS
  addBoard: (board: CreateBoardPayload) => Promise<Boards | null>;

  // מגדיר את כל הבורדים שה ID שלהם שונה מ TRUE ל FALSE
  setDefaultBoard: (boardId: number) => Promise<void>;

  // מייבא את כל ה COLUMS לפי ה ID של הבורד
  fetchColumns: (boardId: number) => Promise<void>;

  // מוחק בורד קיים
  deleteBoard: (boardId: number) => Promise<void>;

  deleteColumn: (columnId: number) => Promise<void>;
  // מגדיר את ה SEARCH ITEM
  setSearchItem: (value: string) => void;

  // הצגת כל המשתמשים
  fetchUsers: () => Promise<void>;
  // הוספת משתמש חדש
  addUser: (user: CreateUserPayload) => Promise<void>;

  // מחיקת משתמש קיים
  deleteUser: (id: number) => Promise<void>;

  // עדכון משתמש קיים
  updateUser: (id: number, changes: Partial<User>) => Promise<void>;
}

export const useBoardStore = create<BoardStore>((set, get) => ({
  boards: [],
  activeBoardId: null,
  columns: [],
  items: [],
  loading: false,
  error: null,
  nextColumnId: null,
  searchItem: "",
  users: [],

  fetchBoards: async () => {
    set({ loading: true, error: null });

    try {
      const boards = await API.getBoards();

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

  fetchUsers: async () => {
    set({ loading: true, error: null });

    try {
      const Users = await API.getUsers();
      set({
        users: Users,
        loading: false,
      });
    } catch (err) {
      console.error(err);
      set({
        error: "Failed to fetch users",
        loading: false,
      });
    }
  },

  addUser: async (user: CreateUserPayload) => {
    try {
      const newUser = await API.addUser(user);
      set((state) => ({
        users: [...state.users, newUser],
      }));
    } catch (err) {
      console.error(err);
      set({
        error: "Failed to add user",
      });
    }
  },

  deleteUser: async (id: number) => {
    const prevUsers = get().users;
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    }));
    try {
      await API.deleteUserById(id);
    } catch (err) {
      console.error(err);
      set({
        users: prevUsers,
        error: "Failed to delete user",
      });
    }
  },

  updateUser: async (id: number, changes: Partial<User>) => {
    const prevUsers = get().users;
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, ...changes } : user,
      ),
    }));
    try {
      await API.updateUserById(id, changes);
    } catch (err) {
      console.error(err);
      set({
        users: prevUsers,
        error: "Failed to update user",
      });
    }
  },

  //  נוסף בשביל Drag And Drop: מעדכן את כל ה-items ב-Zustand
  setItems: (items) => {
    set({ items });
  },

  setSearchItem: (value) => {
    set({ searchItem: value });
  },

  deleteColumn: async (columnId) => {
    const prevColumns = get().columns;
    const prevItems = get().items;

    //  עדכון מיידי UI
    set((state) => ({
      columns: state.columns.filter((c) => c.id !== columnId),
      items: state.items.filter((i) => i.columnId !== columnId),
    }));

    try {
      await API.DeleteColumnById(columnId);
    } catch (err) {
      set({
        columns: prevColumns,
        items: prevItems,
      });
    }
  },

  deleteBoard: async (boardId: number) => {
    const prevBoards = get().boards;
    const prevColumns = get().columns;
    const prevItems = get().items;
    const prevActiveBoardId = get().activeBoardId;

    let nextBoardId: number | null = null;

    set((state) => {
      const boardsAfterDelete = state.boards.filter(
        (board) => board.id !== boardId,
      );

      const nextActiveBoard = boardsAfterDelete[0] ?? null;
      nextBoardId = nextActiveBoard?.id ?? null;

      return {
        boards: boardsAfterDelete.map((board) => ({
          ...board,
          isDefault: board.id === nextBoardId,
        })),

        activeBoardId: nextBoardId,

        columns: state.columns.filter((col) => col.boardId !== boardId),
        items: state.items.filter((item) => item.boardId !== boardId),
      };
    });

    try {
      await API.deleteBoardById(boardId);

      if (nextBoardId !== null) {
        await API.updateBoardById(nextBoardId, { isDefault: true });
        await get().setActiveBoardId(nextBoardId);
      }
    } catch (err) {
      console.error(err);

      set({
        boards: prevBoards,
        columns: prevColumns,
        items: prevItems,
        activeBoardId: prevActiveBoardId,
        error: "Failed to delete board",
      });
    }
  },

  setActiveBoardId: async (boardId) => {
    try {
      const selectedBoard = get().boards.find((board) => board.id === boardId);

      if (!selectedBoard) {
        set({
          error: "Board not found",
        });
        return;
      }

      set({
        activeBoardId: boardId,
        error: null,
      });

      await get().fetchBoardData(boardId);
    } catch (err) {
      console.error(err);
      set({
        error: "Failed to set active board",
      });
    }
  },

  fetchColumns: async (boardId) => {
    try {
      const res = await API.getColumns(boardId);

      set({
        columns: res,
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
        items: res,
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
      const [columnsRes, itemsRes, usersRes] = await Promise.all([
        API.getColumns(boardId),
        API.getItems(boardId),
        API.getUsers(),
      ]);

      set({
        activeBoardId: boardId,
        columns: columnsRes,
        items: itemsRes,
        users: usersRes,
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

  addColumn: async (column: CreateColumnPayload) => {
    try {
      const res = await API.addColumn(column);
      set((state) => ({
        columns: [...state.columns, res],
      }));
    } catch (err) {
      console.error(err);
      set({
        error: "Failed to add column",
      });
    }
  },

  addItem: async (item: CreateItemPayload) => {
    try {
      const res = await API.addItemRequest(item);

      set((state) => ({
        items: [...state.items, res],
      }));
    } catch (err) {
      console.error(err);
      set({
        error: "Failed to add item",
      });
    }
  },

  updateItem: async (id: number, changes: Partial<CreateItemPayload>) => {
    try {
      const updatedItem = await API.updateItemRequest(id, changes);

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

  deleteItem: async (id: number) => {
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

  addBoard: async (boardData: CreateBoardPayload) => {
    try {
      const isFirstBoard = get().boards.length === 0;

      const res = await API.addBoard({
        ...boardData,
        isDefault: isFirstBoard,
      });

      const createdBoard = res;

      set((state) => ({
        boards: [...state.boards, createdBoard],
        activeBoardId: createdBoard.id,
        error: null,
      }));

      await get().fetchBoardData(createdBoard.id);

      return createdBoard;
    } catch (err) {
      console.error(err);
      set({ error: "Failed to add board" });
      return null;
    }
  },

  setDefaultBoard: async (boardId) => {
    try {
      const boards = get().boards;

      await Promise.all(
        boards.map((board) =>
          API.updateBoardById(board.id, {
            isDefault: board.id === boardId,
          }),
        ),
      );

      set((state) => ({
        boards: state.boards.map((board) => ({
          ...board,
          isDefault: board.id === boardId,
        })),
      }));
    } catch (err) {
      console.error(err);
      set({
        error: "Failed to set default board",
      });
    }
  },
}));
