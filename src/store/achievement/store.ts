import { create } from "zustand";
import type { AchievementKey } from "./type";

type AchievementStore = {
  achieved: AchievementKey[];
  addAchieved: (key: AchievementKey) => void;
};

export const useAchievementStore = create<AchievementStore>((set) => ({
  achieved: [],
  addAchieved: (key: AchievementKey) => {
    set((state) => ({
      ...state,
      achieved: state.achieved.concat(key),
    }));
  },
}));
