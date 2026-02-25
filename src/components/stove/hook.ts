import { useGameEffect, type Effect } from "@/store/effect";
import { EquipmentKey } from "@/store/equipment/type";

export const useCook = () => {
  const { computeEffect } = useGameEffect();
  
  // 根据选择的食物装备进行烹饪
  const cook = (select: EquipmentKey[]) => {
    const effect: Effect = {
      equipments: {},
    };
    const equipments = effect.equipments!;

    // 所有使用的食物都减1
    select.forEach((item) => {
      equipments[item] = -1;
    });
    while (true) {
      // 做菜放运动饮料？喜提湿腻焦糊
      if (select.includes(EquipmentKey.SportsDrink)) {
        equipments[EquipmentKey.EWW] = 1;
        break;
      }

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

      // 只要有自热锅
      if(select.find(item => item === EquipmentKey.SelfHeatingPot)){
        if(select.length === 1){
            equipments[EquipmentKey.SelfHeatingPot] = 1
        }
        // 自热锅火锅杂烩
        break
      }

      if(select.find(item => item === EquipmentKey.Mushroom_JianShouQing)){
        // 见手青菜肴
        break;
      }

      if(select.find(item => item === EquipmentKey.BeastSteak)){
        if(select.length === 1){
            // 煎肉排
        }
        // 肉排杂烩
        break;
      }


    }

    const { toast } = computeEffect(effect);
    console.log("做菜======", toast);
  };
  return { cook };
};
