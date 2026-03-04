import { create } from "zustand";
import type { AchievementKey } from "./type";
import { subscribeWithSelector } from "zustand/middleware";

const ACHIEVE_LOCAL = "MOUNTING_ACHIEVE_LOCAL";

type AchievementStore = {
  achieved: AchievementKey[];
  newAchieved: boolean;
  newAchievedTimeout: number | undefined;
  addAchieved: (keys?: AchievementKey[]) => void;
};

export const useAchievementStore = create<AchievementStore>()(
  subscribeWithSelector((set, get) => ({
    achieved:
      (localStorage.getItem(ACHIEVE_LOCAL)?.split(",") as AchievementKey[]) ||
      [],
    newAchieved: false,
    newAchievedTimeout: undefined,
    addAchieved: (keys?: AchievementKey[]) => {
      set((state) => {
        if (!keys) return state;
        // 看目前的成就项有没有
        const addedAchieved = Array.from(new Set([...get().achieved, ...keys]));
        const isExited = addedAchieved.length === get().achieved.length;

        if (isExited) {
          return state;
        }

        if (get().newAchievedTimeout) {
          clearTimeout(get().newAchievedTimeout);
        }
        const timeout = setTimeout(() => {
          set({
            newAchieved: false,
            newAchievedTimeout: undefined,
          });
        }, 2500);
        // 成就本地化
        // localStorage.setItem(ACHIEVE_LOCAL, addedAchieved.join(","))
        return {
          ...state,
          achieved: addedAchieved,
          newAchieved: true,
          newAchievedTimeout: timeout,
        };
      });
    },
  })),
);
