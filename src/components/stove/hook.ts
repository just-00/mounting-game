import { useGameEffect, type Effect } from "@/store/effect";
import { EQUIPMENTS } from "@/store/equipment/config";
import { EquipmentKey } from "@/store/equipment/type";

export const useCook = () => {
  const { computeEffect } = useGameEffect();

  // 根据选择的食物装备进行烹饪
  const cook = (select: EquipmentKey[]) => {
    const effect: Effect = {
      equipments: {},
    };
    const equipments = effect.equipments!;
    let doneDish: EquipmentKey;

    // 所有使用的食物都减1
    select.forEach((item) => {
      equipments[item] = -1;
    });
    while (true) {
      // 放剧毒蘑菇
      if (
        select.find(
          (item) =>
            item === EquipmentKey.MushroomEGao ||
            item === EquipmentKey.MushroomDuYing,
        )
      ) {
        // 得到毒蘑菇杂烩
        break;
      }

      // 做菜放运动饮料？喜提湿腻焦糊
      if (select.includes(EquipmentKey.SportsDrink)) {
        doneDish = EquipmentKey.EWW;
        break;
      }

      // 只要有自热锅
      if (select.find((item) => item === EquipmentKey.SelfHeatingPot)) {
        if (select.length === 1) {
          doneDish = EquipmentKey.SelfHeatingPot;
        }
        // 自热锅火锅杂烩
        break;
      }

      if (select.find((item) => item === EquipmentKey.Mushroom_JianShouQing)) {
        // 见手青菜肴
        break;
      }

      if (select.find((item) => item === EquipmentKey.BeastSteak)) {
        if (select.length === 1) {
          // 煎肉排
        }
        // 肉排杂烩
        break;
      }
    }

    const { toast } = computeEffect(effect);

    return {
      toast: `${toast}<br/><b>锵锵！${EQUIPMENTS.find((item) => item.key === doneDish)?.name}做好了！</b>`,
    };
  };
  return { cook };
};
