import { create } from "zustand";
import { EQUIPMENTS } from "./config";
import { add, mul } from "@/utils/number";
import type { Equipment } from "./type";

interface EquipmentStore {
  equipments: Equipment[];
  totalSize: number;
  totalWeight: number;
  resetEquipments: (eq: Equipment[]) => void;
  setEquipmentsCount: (key: string, count: number) => void;
}

export const useEquipmentStore = create<EquipmentStore>((set) => ({
  equipments: EQUIPMENTS,
  totalSize: 0,
  totalWeight: 0,
  resetEquipments: (eq: Equipment[]) => {
    set((state) => {
      return {
        ...state,
        totalSize: 0,
        totalWeight: 0,
        equipments: eq,
      };
    });
  },
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
}));
