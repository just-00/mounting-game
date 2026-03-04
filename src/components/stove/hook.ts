import { useAchievementStore } from "@/store/achievement/store";
import { AchievementKey } from "@/store/achievement/type";
import { useGameEffect, type Effect } from "@/store/effect";
import { EQUIPMENTS, EQUIPMENTS_INIT } from "@/store/equipment/config";
import { EquipmentKey, EquipmentType } from "@/store/equipment/type";

export const useCook = () => {
  const { computeEffect } = useGameEffect();
  const { addAchieved } = useAchievementStore();

  // 根据选择的食物装备进行烹饪
  const cook = (select: EquipmentKey[]) => {
    const effect: Effect = {
      equipments: {},
    };
    const equipments = effect.equipments!;
    let doneDish: EquipmentKey = EquipmentKey.Eww;

    // 所有使用的食物都减1
    select.forEach((item) => {
      equipments[item] = -1;
    });

    const dishes = EQUIPMENTS_INIT.filter(
      (item) => item.type === EquipmentType.DISH,
    ).sort((a, b) => {
      const ap = a.dishConfig?.priority ?? 0;
      const bp = b.dishConfig?.priority ?? 0;

      if (!ap && !bp) {
        return 0;
      }
      if (!ap) {
        return -1;
      }
      if (!bp) {
        return 1;
      }
      return ap - bp;
    });

    const selectMap = select.reduce(
      (
        total: {
          [key in EquipmentKey]?: number;
        },
        current,
      ) => {
        total[current] = total[current] ? total[current] + 1 : 1;
        return total;
      },
      {},
    );
    for (let i = 0; i < dishes.length; i++) {
      const item = dishes[i];
      const dishKey = item.key;
      const dishConfig =
        item.dishConfig || EQUIPMENTS[EquipmentKey.Eww].dishConfig!;
      const configs = dishConfig.equipmentConfig;
      const count = dishConfig.equipmentCount;

      // 要求数量都对不上，下一个
      if (count) {
        if (typeof count === "number" && select.length !== count) {
          continue;
        }
        if (
          count instanceof Array &&
          (select.length < count[0] || select.length > count[1])
        ) {
          continue;
        }
      }

      // 没有装备配置要求，那就是这一个
      if (!configs?.length) {
        doneDish = dishKey;
        break;
      }
      let isFound = true;
      // 对每道菜判定，config是否能满足
      for (let j = 0; j < configs.length; j++) {
        const eItem = configs[j];
        let min: number;
        let max: number;
        if (typeof eItem.count === "number") {
          min = eItem.count;
          max = eItem.count;
        } else {
          min = eItem.count[0];
          max = eItem.count[1];
        }
        let equipments: EquipmentKey[] = [];
        // 适配单或者多装备情况
        if (typeof eItem.equipment !== "object") {
          equipments = [eItem.equipment];
        } else {
          equipments = eItem.equipment;
        }
        let num = 0;
        for (let k = 0; k < equipments.length; k++) {
          const currentEquipmentKey = equipments[k];
          // 提交的这个key的数量
          num += selectMap[currentEquipmentKey] ?? 0;
          // 如果数量不在要求之内则直接下一道菜
        }
        if (num > max || num < min) {
          isFound = false;
          break;
        }
      }
      // 在前面都不break时执行
      if (isFound) {
        doneDish = dishKey;
        break;
      }
    }

    // 执行减去的菜的副作用，并且计算toast
    const { toast } = computeEffect({
      effect,
    });
    // 执行增加的菜的副作用
    computeEffect({
      effect: {
        equipments: {
          [doneDish]: 1,
        },
      },
    });
    // 做出有毒的菜
    if (
      doneDish === EquipmentKey.PoisonMushroomMixed ||
      doneDish === EquipmentKey.PoisonMushroom
    ) {
      addAchieved([AchievementKey.POISON_DISH]);
    }
    // 做出早餐锅
    if (doneDish === EquipmentKey.FriedSteakBreakfast) {
      addAchieved([AchievementKey.BREAKFAST]);
    }
    return {
      toast: `${toast}<br/><b>锵锵！${EQUIPMENTS[doneDish]?.name}做好了！</b>`,
      doneDish,
    };
  };
  return { cook };
};
