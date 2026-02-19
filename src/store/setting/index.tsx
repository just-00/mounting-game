import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

type SettingStore = {
  mounting: boolean;
  setMounting: (m: boolean) => void;
};

export const useSettingStore = create<SettingStore>()(
  subscribeWithSelector((set) => ({
    mounting: true,
    setMounting: (mounting: boolean) => {
      set((state) => ({
        ...state,
        mounting,
      }));
    },
  })),
);
