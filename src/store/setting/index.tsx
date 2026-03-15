import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

type SettingStore = {
  see: boolean;
  setSee: (see: boolean) => void;
  isStove: boolean;
  setIsStove: (isStove: boolean) => void;
  mounting: boolean;
  setMounting: (m: boolean) => void;
};

export const useSettingStore = create<SettingStore>()(
  subscribeWithSelector((set) => ({
    see: true,
    setSee: (see: boolean) => {
      set((state) => ({
        ...state,
        see,
      }));
    },
    isStove: false,
    setIsStove: (isStove: boolean) => {
      set((state) => ({
        ...state,
        isStove,
      }));
    },
    mounting: true,
    setMounting: (mounting: boolean) => {
      set((state) => ({
        ...state,
        mounting,
      }));
    },
  })),
);
