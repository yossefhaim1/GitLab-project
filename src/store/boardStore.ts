import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../Type";

interface BoardStore {
  activeBoardId: number | undefined;
  searchItem: string;
  profile: User | undefined;

  setSearchItem: (value: string) => void;
  setActiveBoardId: (id: number | undefined) => void;
  setProfile: (profile: User) => void;
  clearProfile: () => void;
}

export const useBoardStore = create<BoardStore>()(
  persist(
    (set) => ({
      searchItem: "",
      activeBoardId: undefined,
      profile: undefined,

      setSearchItem: (value) => {
        set({ searchItem: value });
      },

      setActiveBoardId: (id) => {
        set({ activeBoardId: id });
      },

      setProfile: (profile) => {
        set({ profile });
      },

      clearProfile: () => {
        set({
          profile: undefined,
          activeBoardId: undefined,
          searchItem: "",
        });
      },
    }),
    {
      name: "board-store",

      partialize: (state) => ({
        profile: state.profile,
      }),
    },
  ),
);