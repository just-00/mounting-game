import { create } from "zustand";
import { EQUIPMENTS } from "./config";
import { add, mul } from "@/utils/number";
import type { Equipment } from "./type";
import { subscribeWithSelector } from "zustand/middleware";

interface EquipmentStore {
  equipments: Equipment[];
  totalSize: number;
  totalWeight: number;
  setEquipmentsCount: (key: string, count: number) => void;
  resetEquipmentStore: () => void;
}

const INIT_STORE = {
  equipments: EQUIPMENTS,
  totalSize: 0,
  totalWeight: 0,
};

export const useEquipmentStore = create<EquipmentStore>()(
  subscribeWithSelector((set) => ({
    ...INIT_STORE,
    resetEquipmentStore: () => {
      set(() => ({
        ...INIT_STORE,
      }));
    },
    // 设置单个的装备key和装备数量，重新计算total的size和weight
    setEquipmentsCount: (key: string, count: number) => {
      set((state) => {
        let totalSize: number = 0;
        let totalWeight: number = 0;
        const newEq = state.equipments.map((item) => {
          if (item.key === key) {
            totalSize = add(mul(count ?? 0, item.size), totalSize);
            totalWeight = add(mul(count ?? 0, item.weight), totalWeight);
            return {
              ...item,
              count,
            };
          }
          totalSize = add(mul(item.count ?? 0, item.size), totalSize);
          totalWeight = add(mul(item.count ?? 0, item.weight), totalWeight);
          return item;
        });
        return {
          ...state,
          equipments: newEq,
          totalSize,
          totalWeight,
        };
      });
    },
  })),
);
