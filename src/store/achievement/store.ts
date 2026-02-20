import { create } from "zustand";
import type { AchievementKey } from "./type";

const ACHIEVE_LOCAL = "MOUNTING_ACHIEVE_LOCAL";

type AchievementStore = {
  achieved: AchievementKey[];
  addAchieved: (key: AchievementKey) => void;
};

export const useAchievementStore = create<AchievementStore>((set) => ({
  achieved: localStorage.getItem(ACHIEVE_LOCAL)?.split(",") as AchievementKey[] || [],
  addAchieved: (key: AchievementKey) => {
    set((state) => {
      const achieved = state.achieved.concat(key);
      // 成就本地化
      localStorage.setItem(ACHIEVE_LOCAL, achieved.join(","))
      return {
        ...state,
        achieved,
      };
    });
  },
}));
