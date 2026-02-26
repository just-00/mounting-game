import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

type SettingStore = {
  isStove: boolean;
  setIsStove: (isStove: boolean) => void;
  mounting: boolean;
  setMounting: (m: boolean) => void;
};

export const useSettingStore = create<SettingStore>()(
  subscribeWithSelector((set) => ({
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
