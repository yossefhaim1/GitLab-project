import { create } from "zustand";
interface BoardStore {
  activeBoardId?: number;
  searchItem: string;

  // מגדיר את ה SEARCH ITEM
  setSearchItem: (value: string) => void;
  setActiveBoardId: (id: number) => void;
}

export const useBoardStore = create<BoardStore>((set, get) => ({
  searchItem: "",
  activeBoardId: undefined,

  //  נוסף בשביל Drag And Drop: מעדכן את כל ה-items ב-Zustand

  setSearchItem: (value) => {
    set({ searchItem: value });
  },

  setActiveBoardId: (id) => {
    set({ activeBoardId: id });
  },
}));
