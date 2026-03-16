import { create } from "zustand";
import { add, mul, sub } from "@/utils/number";
import type { Equipment, EquipmentKey } from "./type";
import { subscribeWithSelector } from "zustand/middleware";
import { EQUIPMENTS, EQUIPMENTS_INIT } from "./config";

interface EquipmentStore {
  equipments: Equipment[];
  totalSize: number;
  totalWeight: number;
  setEquipmentsCount: (
    key: EquipmentKey,
    count: number,
    notRubbish?: boolean,
  ) => void;
  resetEquipmentStore: () => void;
}

const INIT_STORE = {
  equipments: EQUIPMENTS_INIT,
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
    setEquipmentsCount: (
      key: EquipmentKey,
      count: number,
      notRubbish?: boolean,
    ) => {
      set((state) => {
        let rubbishKey: EquipmentKey | undefined;
        let totalSize: number = 0;
        let totalWeight: number = 0;
        let originCount = 0;

        // 如果会转换成垃圾的话，垃圾增加
        if (!notRubbish) {
          rubbishKey = EQUIPMENTS[key].emptyRubbish;
          originCount =
            state.equipments.find((item) => item.key === key)?.count ?? 0;
        }

        const newEq = state.equipments.map((item) => {
          let itemCount = item.count ?? 0;
          if (item.key === key) {
            itemCount = count;
          }
          if (item.key === rubbishKey) {
            if (count < originCount) {
              itemCount += sub(originCount, count);
            }
          }
          totalSize = add(mul(itemCount ?? 0, item.size), totalSize);
          totalWeight = add(mul(itemCount ?? 0, item.weight), totalWeight);
          return {
            ...item,
            count: itemCount,
          };
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
