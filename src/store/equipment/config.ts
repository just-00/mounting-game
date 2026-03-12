import { Poison } from "../status/type";
import { SELECT_EQUIPMENT_PRELOAD } from "@/const/ResourceUrl";
import { EquipmentKey, EquipmentType, type Equipment } from "./type";
import { AchievementKey } from "../achievement/type";

const COOK_NOT_POISON_MUSHROOM = [
  EquipmentKey.MushroomJiYou,
  EquipmentKey.MushroomJianShouQing,
  EquipmentKey.MushroomXiangGu,
];
const COOK_POISON_MUSHROOM = [
  EquipmentKey.MushroomDuYing,
  EquipmentKey.MushroomEGao,
];

export const EQUIPMENTS: Record<EquipmentKey, Equipment> = {
  // 食物
  [EquipmentKey.MushroomJiYou]: {
    key: EquipmentKey.MushroomJiYou,
    name: "某种蘑菇",
    weight: 0.2,
    size: 0.2,
    src: SELECT_EQUIPMENT_PRELOAD.MUSHROOM_JIYOU,
    disposable: true,
    type: EquipmentType.Food,
    effect: {
      hunger: 10,
    },
  },
  [EquipmentKey.MushroomXiangGu]: {
    key: EquipmentKey.MushroomXiangGu,
    name: "某种蘑菇",
    weight: 0.2,
    size: 0.2,
    src: SELECT_EQUIPMENT_PRELOAD.MUSHROOM_XIANGGU,
    disposable: true,
    type: EquipmentType.Food,
    effect: {
      hunger: 10,
    },
  },
  [EquipmentKey.MushroomDuYing]: {
    key: EquipmentKey.MushroomDuYing,
    name: "某种蘑菇",
    weight: 0.2,
    size: 0.2,
    src: SELECT_EQUIPMENT_PRELOAD.MUSHROOM_DUYING,
    disposable: true,
    type: EquipmentType.Food,
    effect: {
      poison: Poison.DuYing,
      hunger: 5,
    },
  },
  [EquipmentKey.MushroomEGao]: {
    key: EquipmentKey.MushroomEGao,
    name: "某种蘑菇",
    weight: 0.2,
    size: 0.2,
    src: SELECT_EQUIPMENT_PRELOAD.MUSHROOM_EGAO,
    disposable: true,
    type: EquipmentType.Food,
  },
  [EquipmentKey.MushroomJianShouQing]: {
    key: EquipmentKey.MushroomJianShouQing,
    name: "某种蘑菇",
    weight: 0.2,
    size: 0.2,
    src: SELECT_EQUIPMENT_PRELOAD.MUSHROOM_JIANSHOUQING,
    disposable: true,
    type: EquipmentType.Food,
    effect: {
      poison: Poison.JianShouQing,
    },
  },
  [EquipmentKey.Egg]: {
    key: EquipmentKey.Egg,
    name: "鸡蛋",
    weight: 0.2,
    size: 1,
    src: SELECT_EQUIPMENT_PRELOAD.EGG,
    disposable: true,
    type: EquipmentType.Food,
    effect: {
      hunger: 5,
    },
  },
  [EquipmentKey.BeastSteak]: {
    key: EquipmentKey.BeastSteak,
    name: "野兽肉排",
    weight: 0.3,
    size: 0.4,
    src: SELECT_EQUIPMENT_PRELOAD.BeastSteak,
    disposable: true,
    type: EquipmentType.Food,
    effect: {
      hunger: 20,
    },
  },
  [EquipmentKey.SportsDrink]: {
    key: EquipmentKey.SportsDrink,
    name: "运动饮料",
    weight: 0.55,
    size: 0.5,
    src: SELECT_EQUIPMENT_PRELOAD.SPORTS_DRINK,
    disposable: true,
    type: EquipmentType.Food,
    isSelectEquipmentShow: true,
  },
  [EquipmentKey.CompressedBiscuit]: {
    key: EquipmentKey.CompressedBiscuit,
    name: "压缩饼干",
    weight: 0.3,
    size: 0.3,
    src: SELECT_EQUIPMENT_PRELOAD.COMPRESSED_BISCUIT,
    disposable: true,
    type: EquipmentType.Food,
    isSelectEquipmentShow: true,
    effect: {
      hunger: 5,
    },
  },
  [EquipmentKey.SelfHeatingPot]: {
    key: EquipmentKey.SelfHeatingPot,
    name: "自热锅",
    weight: 1.2,
    size: 2,
    src: SELECT_EQUIPMENT_PRELOAD.SELF_HEATING_POT,
    disposable: true,
    type: EquipmentType.Food,
    isSelectEquipmentShow: true,
    effect: {
      useTime: 10,
      warm: 10,
    },
  },
  // 菜肴 单蘑菇
  [EquipmentKey.ScrambledMushroom]: {
    key: EquipmentKey.ScrambledMushroom,
    name: "炒蘑菇",
    weight: 0.2,
    size: 0.2,
    src: SELECT_EQUIPMENT_PRELOAD.SCRAMBLED_MUSHROOM,
    disposable: true,
    type: EquipmentType.DISH,
    effect: {
      san: -10,
    },
    dishConfig: {
      priority: 0,
      equipmentCount: 1,
      equipmentConfig: [
        {
          equipment: COOK_NOT_POISON_MUSHROOM,
          count: 1,
        },
      ],
    },
  },
  [EquipmentKey.PoisonMushroom]: {
    key: EquipmentKey.PoisonMushroom,
    name: "不妙的炒蘑菇",
    weight: 0.2,
    size: 0.2,
    src: SELECT_EQUIPMENT_PRELOAD.POISON__MUSHROOM,
    disposable: true,
    type: EquipmentType.DISH,
    effect: {
      san: -10,
    },
    addedAchievement: [AchievementKey.POISON_DISH],
    dishConfig: {
      priority: 0,
      equipmentCount: 1,
      equipmentConfig: [
        {
          equipment: COOK_POISON_MUSHROOM,
          count: 1,
        },
      ],
    },
  },
  [EquipmentKey.MushroomMixed]: {
    key: EquipmentKey.MushroomMixed,
    name: "蘑菇杂烩",
    weight: 0.2,
    size: 0.2,
    src: SELECT_EQUIPMENT_PRELOAD.MUSHROOM_MIXED,
    disposable: true,
    type: EquipmentType.DISH,
    effect: {
      hunger: 10,
    },
    dishConfig: {
      priority: 10,
      equipmentCount: 2,
      equipmentConfig: [
        {
          equipment: COOK_NOT_POISON_MUSHROOM,
          count: 2,
        },
      ],
    },
  },
  [EquipmentKey.MushroomMixedBig]: {
    key: EquipmentKey.MushroomMixedBig,
    name: "大份蘑菇杂烩",
    weight: 0.2,
    size: 0.2,
    src: SELECT_EQUIPMENT_PRELOAD.MUSHROOM_MIXED,
    disposable: true,
    type: EquipmentType.DISH,
    effect: {
      hunger: 18,
    },
    dishConfig: {
      priority: 10,
      equipmentCount: 3,
      equipmentConfig: [
        {
          equipment: COOK_NOT_POISON_MUSHROOM,
          count: 3,
        },
      ],
    },
  },
  [EquipmentKey.PoisonMushroomMixed]: {
    key: EquipmentKey.PoisonMushroomMixed,
    name: "不妙的蘑菇杂烩",
    weight: 0.2,
    size: 0.2,
    src: SELECT_EQUIPMENT_PRELOAD.POISON_MUSHROOM_MIXED,
    disposable: true,
    type: EquipmentType.DISH,
    effect: {
      san: -10,
    },
    addedAchievement: [AchievementKey.POISON_DISH],
    dishConfig: {
      priority: 0,
      equipmentCount: [2, 3],
      equipmentConfig: [
        {
          equipment: COOK_POISON_MUSHROOM,
          count: [1, 3],
        },
      ],
    },
  },
  // 单个肉
  [EquipmentKey.FriedSteak]: {
    key: EquipmentKey.FriedSteak,
    name: "煎肉排",
    weight: 0.3,
    size: 0.4,
    src: SELECT_EQUIPMENT_PRELOAD.FRIED_STEAK,
    disposable: true,
    type: EquipmentType.DISH,
    effect: {
      warm: 15,
      hunger: 20,
    },
    dishConfig: {
      priority: 0,
      equipmentCount: 1,
      equipmentConfig: [
        {
          equipment: EquipmentKey.BeastSteak,
          count: 1,
        },
      ],
    },
  },
  [EquipmentKey.FriedSteakMixed]: {
    key: EquipmentKey.FriedSteakMixed,
    name: "肉排杂烩",
    weight: 0.3,
    size: 0.4,
    src: SELECT_EQUIPMENT_PRELOAD.FRIED_STEAK_MIXED,
    disposable: true,
    type: EquipmentType.DISH,
    effect: {
      warm: 15,
      hunger: 20,
    },
    dishConfig: {
      priority: 10,
      equipmentCount: 2,
      equipmentConfig: [
        {
          equipment: EquipmentKey.BeastSteak,
          count: [1, 2],
        },
      ],
    },
  },
  [EquipmentKey.FriedSteakMixedBig]: {
    key: EquipmentKey.FriedSteakMixedBig,
    name: "大份肉排杂烩",
    weight: 0.3,
    size: 0.4,
    src: SELECT_EQUIPMENT_PRELOAD.FRIED_STEAK_MIXED,
    disposable: true,
    type: EquipmentType.DISH,
    effect: {
      warm: 15,
      hunger: 20,
    },
    dishConfig: {
      priority: 10,
      equipmentCount: 3,
      equipmentConfig: [
        {
          equipment: EquipmentKey.BeastSteak,
          count: [1, 2],
        },
      ],
    },
  },
  // 三个肉
  [EquipmentKey.FriedSteakLuxury]: {
    key: EquipmentKey.FriedSteakLuxury,
    name: "大肉汤",
    weight: 0.3,
    size: 0.4,
    src: SELECT_EQUIPMENT_PRELOAD.FRIED_STEAK_LUXURY,
    disposable: true,
    type: EquipmentType.DISH,
    effect: {
      warm: 15,
      hunger: 20,
    },
    dishConfig: {
      priority: 10,
      equipmentCount: 3,
      equipmentConfig: [
        {
          equipment: EquipmentKey.BeastSteak,
          count: 3,
        },
      ],
    },
  },
  // 有肉有蛋有蔬菜/菌菇
  [EquipmentKey.FriedSteakBreakfast]: {
    key: EquipmentKey.FriedSteakBreakfast,
    name: "早餐锅",
    weight: 0.3,
    size: 0.4,
    src: SELECT_EQUIPMENT_PRELOAD.FRIED_STEAK_BREAKFAST,
    disposable: true,
    type: EquipmentType.DISH,
    effect: {
      warm: 15,
      hunger: 20,
    },
    addedAchievement: [AchievementKey.BREAKFAST],
    dishConfig: {
      priority: 9,
      equipmentCount: 3,
      equipmentConfig: [
        {
          equipment: EquipmentKey.BeastSteak,
          count: 1,
        },
        {
          equipment: EquipmentKey.Egg,
          count: 1,
        },
        {
          equipment: COOK_NOT_POISON_MUSHROOM,
          count: 1,
        },
      ],
    },
  },
  [EquipmentKey.FriedEgg]: {
    key: EquipmentKey.FriedEgg,
    name: "煎蛋",
    weight: 0.3,
    size: 0.4,
    src: SELECT_EQUIPMENT_PRELOAD.FRIED_EGG,
    disposable: true,
    type: EquipmentType.DISH,
    effect: {
      warm: 15,
      hunger: 20,
    },
    dishConfig: {
      priority: 0,
      equipmentCount: 1,
      equipmentConfig: [
        {
          equipment: EquipmentKey.Egg,
          count: 1,
        },
      ],
    },
  },
  [EquipmentKey.ScrambledEgg]: {
    key: EquipmentKey.ScrambledEgg,
    name: "炒蛋",
    weight: 0.3,
    size: 0.4,
    src: SELECT_EQUIPMENT_PRELOAD.SCRAMBLED_EGG,
    disposable: true,
    type: EquipmentType.DISH,
    effect: {
      warm: 15,
      hunger: 20,
    },
    dishConfig: {
      priority: 10,
      equipmentCount: 2,
      equipmentConfig: [
        {
          equipment: EquipmentKey.Egg,
          count: 2,
        },
      ],
    },
  },
  [EquipmentKey.ScrambledEggBig]: {
    key: EquipmentKey.ScrambledEggBig,
    name: "大份炒蛋",
    weight: 0.3,
    size: 0.4,
    src: SELECT_EQUIPMENT_PRELOAD.SCRAMBLED_EGG,
    disposable: true,
    type: EquipmentType.DISH,
    effect: {
      warm: 15,
      hunger: 20,
    },
    dishConfig: {
      priority: 10,
      equipmentCount: 3,
      equipmentConfig: [
        {
          equipment: EquipmentKey.Egg,
          count: 3,
        },
      ],
    },
  },
  [EquipmentKey.FriedBiscuit]: {
    key: EquipmentKey.FriedBiscuit,
    name: "饼干糊糊",
    weight: 0.3,
    size: 0.4,
    src: SELECT_EQUIPMENT_PRELOAD.FRIED_BISCUIT,
    disposable: true,
    type: EquipmentType.DISH,
    effect: {
      warm: 15,
      hunger: 20,
    },
    dishConfig: {
      priority: 10,
      equipmentCount: [1, 2],
      equipmentConfig: [
        {
          equipment: EquipmentKey.FriedBiscuit,
          count: [1, 2],
        },
      ],
    },
  },

  [EquipmentKey.FriedBiscuitLuxury]: {
    key: EquipmentKey.FriedBiscuitLuxury,
    name: "高能饼干条",
    weight: 0.3,
    size: 0.4,
    src: SELECT_EQUIPMENT_PRELOAD.FRIED_BISCUIT_LUXURY,
    disposable: true,
    type: EquipmentType.DISH,
    effect: {
      warm: 15,
      hunger: 20,
    },
    dishConfig: {
      priority: 10,
      equipmentCount: 3,
      equipmentConfig: [
        {
          equipment: EquipmentKey.FriedBiscuit,
          count: 3,
        },
      ],
    },
  },
  [EquipmentKey.StirFried]: {
    key: EquipmentKey.StirFried,
    name: "炒菜",
    weight: 0.3,
    size: 0.4,
    src: SELECT_EQUIPMENT_PRELOAD.STIR_FRIED,
    disposable: true,
    type: EquipmentType.DISH,
    effect: {
      warm: 15,
      hunger: 20,
    },
    dishConfig: {
      priority: 100,
      equipmentCount: 2,
    },
  },
  [EquipmentKey.StirFriedBig]: {
    key: EquipmentKey.StirFriedBig,
    name: "大份炒菜",
    weight: 0.3,
    size: 0.4,
    src: SELECT_EQUIPMENT_PRELOAD.STIR_FRIED,
    disposable: true,
    type: EquipmentType.DISH,
    effect: {
      warm: 15,
      hunger: 20,
    },
    dishConfig: {
      priority: 100,
      equipmentCount: 3,
    },
  },
  [EquipmentKey.StirFriedLuxury]: {
    key: EquipmentKey.StirFriedLuxury,
    name: "美味炒菜",
    weight: 0.3,
    size: 0.4,
    src: SELECT_EQUIPMENT_PRELOAD.STIR_FRIED_LUXURY,
    disposable: true,
    type: EquipmentType.DISH,
    effect: {
      warm: 15,
      hunger: 20,
    },
    dishConfig: {
      priority: 20,
      equipmentCount: 2,
      equipmentConfig: [
        {
          equipment: [EquipmentKey.BeastSteak, EquipmentKey.Egg],
          count: [1, 2],
        },
      ],
    },
  },
  [EquipmentKey.StirFriedLuxuryBig]: {
    key: EquipmentKey.StirFriedLuxuryBig,
    name: "大份美味炒菜",
    weight: 0.3,
    size: 0.4,
    src: SELECT_EQUIPMENT_PRELOAD.STIR_FRIED_LUXURY,
    disposable: true,
    type: EquipmentType.DISH,
    effect: {
      warm: 15,
      hunger: 20,
    },
    dishConfig: {
      priority: 20,
      equipmentCount: 3,
      equipmentConfig: [
        {
          equipment: [EquipmentKey.BeastSteak, EquipmentKey.Egg],
          count: [1, 3],
        },
      ],
    },
  },
  [EquipmentKey.Eww]: {
    key: EquipmentKey.Eww,
    name: "湿腻焦糊",
    weight: 0.2,
    size: 0.2,
    src: SELECT_EQUIPMENT_PRELOAD.EWW,
    disposable: true,
    type: EquipmentType.DISH,
    effect: {
      san: -10,
      achievements: [AchievementKey.EWW],
    },
    dishConfig: {
      priority: 1,
      equipmentConfig: [
        {
          equipment: EquipmentKey.SportsDrink,
          count: [1, 3],
        },
      ],
    },
  },
  [EquipmentKey.SelfHeatingPotMixed]: {
    key: EquipmentKey.SelfHeatingPotMixed,
    name: "自热锅杂烩",
    weight: 0.3,
    size: 0.4,
    src: SELECT_EQUIPMENT_PRELOAD.SELF_HEATING_POT_MIXED,
    disposable: true,
    type: EquipmentType.DISH,
    effect: {
      warm: 15,
      hunger: 20,
    },
    dishConfig: {
      priority: 10,
      equipmentCount: 2,
      equipmentConfig: [
        {
          equipment: EquipmentKey.SelfHeatingPot,
          count: 1,
        },
      ],
    },
  },
  [EquipmentKey.SelfHeatingPotMixedBig]: {
    key: EquipmentKey.SelfHeatingPotMixedBig,
    name: "大份自热锅杂烩",
    weight: 0.3,
    size: 0.4,
    src: SELECT_EQUIPMENT_PRELOAD.SELF_HEATING_POT_MIXED,
    disposable: true,
    type: EquipmentType.DISH,
    effect: {
      warm: 15,
      hunger: 20,
    },
    dishConfig: {
      priority: 10,
      equipmentCount: 3,
      equipmentConfig: [
        {
          equipment: EquipmentKey.SelfHeatingPot,
          count: [1, 2],
        },
      ],
    },
  },
  // 菜肴结束

  [EquipmentKey.GasStove]: {
    key: EquipmentKey.GasStove,
    name: "汽炉",
    weight: 0.8,
    size: 4,
    src: SELECT_EQUIPMENT_PRELOAD.GAS_STOVE,
    type: EquipmentType.Tool,
    isSelectEquipmentShow: true,
  },
  [EquipmentKey.Spear]: {
    key: EquipmentKey.Spear,
    name: "长矛",
    weight: 0.2,
    size: 0.2,
    src: SELECT_EQUIPMENT_PRELOAD.SPEAR,
    type: EquipmentType.Tool,
  },
  [EquipmentKey.HikingPole]: {
    key: EquipmentKey.HikingPole,
    name: "登山杖",
    weight: 0.3,
    size: 0,
    src: SELECT_EQUIPMENT_PRELOAD.HIKING_POLE,
    type: EquipmentType.Tool,
    isSelectEquipmentShow: true,
  },
  [EquipmentKey.Crampons]: {
    key: EquipmentKey.Crampons,
    name: "冰爪",
    weight: 0.8,
    size: 2,
    src: SELECT_EQUIPMENT_PRELOAD.CRAMPONS,
    type: EquipmentType.Tool,
    isSelectEquipmentShow: true,
  },
  [EquipmentKey.BearBell]: {
    key: EquipmentKey.BearBell,
    name: "熊铃",
    weight: 0.05,
    size: 0,
    src: SELECT_EQUIPMENT_PRELOAD.BEAR_BELL,
    type: EquipmentType.Tool,
    isSelectEquipmentShow: true,
  },
  [EquipmentKey.PowerBank]: {
    key: EquipmentKey.PowerBank,
    name: "充电宝",
    weight: 0.3,
    size: 0.4,
    src: SELECT_EQUIPMENT_PRELOAD.POWER_BANK,
    type: EquipmentType.Tool,
    isSelectEquipmentShow: true,
  },
  [EquipmentKey.Headlamp]: {
    key: EquipmentKey.Headlamp,
    name: "头灯",
    weight: 0.2,
    size: 0.2,
    src: SELECT_EQUIPMENT_PRELOAD.HEAD_LAMP,
    type: EquipmentType.Tool,
    isSelectEquipmentShow: true,
  },
  [EquipmentKey.Herbs]: {
    key: EquipmentKey.Herbs,
    name: "药草",
    weight: 0.2,
    size: 0.2,
    src: SELECT_EQUIPMENT_PRELOAD.FIRST_AID_KIT,
    disposable: true,
    type: EquipmentType.Medical,
    effect: {
      injuried: true,
    },
  },
  [EquipmentKey.FirstAidKit]: {
    key: EquipmentKey.FirstAidKit,
    name: "急救包",
    weight: 0.8,
    size: 2,
    src: SELECT_EQUIPMENT_PRELOAD.FIRST_AID_KIT,
    disposable: true,
    type: EquipmentType.Medical,
    isSelectEquipmentShow: true,
    effect: {
      injuried: true,
      useTime: 10,
    },
  },
  [EquipmentKey.SurvivalBlanket]: {
    key: EquipmentKey.SurvivalBlanket,
    name: "救生毯",
    weight: 0.1,
    size: 0.5,
    src: SELECT_EQUIPMENT_PRELOAD.SURVIVAL_BLANKET,
    disposable: true,
    type: EquipmentType.Warmth,
    isSelectEquipmentShow: true,
    effect: {
      warm: 20,
    },
  },
  [EquipmentKey.LightTent]: {
    key: EquipmentKey.LightTent,
    name: "轻便帐篷",
    weight: 1.2,
    size: 8,
    src: SELECT_EQUIPMENT_PRELOAD.LIGHT_TENT,
    type: EquipmentType.Tent,
    effect: {
      useTime: 15,
      warm: 5,
    },
  },
  [EquipmentKey.WarmTent]: {
    key: EquipmentKey.WarmTent,
    name: "保暖帐篷",
    weight: 3,
    size: 12,
    src: SELECT_EQUIPMENT_PRELOAD.WARM_TENT,
    type: EquipmentType.Tent,
    effect: {
      useTime: 30,
      warm: 8,
    },
  },
  [EquipmentKey.SleepingBag]: {
    key: EquipmentKey.SleepingBag,
    name: "睡袋",
    weight: 1.8,
    size: 7,
    src: SELECT_EQUIPMENT_PRELOAD.SLEEPING_BAG,
    effect: {
      warm: 5,
    },
    type: EquipmentType.Warmth,
  },
};

export const EQUIPMENTS_INIT = Object.values(EQUIPMENTS);
