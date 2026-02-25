import { Poison } from "../status/type";
import { SELECT_EQUIPMENT_PRELOAD } from "@/const/ResourceUrl";
import { EquipmentKey, EquipmentType, type Equipment } from "./type";
import { SnowMainEventKey } from "../event/config/type";

export const EQUIPMENTS: Equipment[] = [
  {
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
  {
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
  {
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

  {
    key: EquipmentKey.GasStove,
    name: "汽炉",
    weight: 0.8,
    size: 4,
    src: SELECT_EQUIPMENT_PRELOAD.FIRST_AID_KIT,
    type: EquipmentType.Tool,
    isSelectEquipmentShow: true,
  },

  {
    key: EquipmentKey.FirstAidKit,
    name: "急救包",
    weight: 0.8,
    size: 2,
    src: SELECT_EQUIPMENT_PRELOAD.FIRST_AID_KIT,
    disposable: true,
    type: EquipmentType.Medical,
    isSelectEquipmentShow: true,
    effect: {
      useTime: 10,
    },
  },
  {
    key: EquipmentKey.SurvivalBlanket,
    name: "救生毯",
    weight: 0.1,
    size: 0.5,
    src: SELECT_EQUIPMENT_PRELOAD.SURVIAL_BLANKET,
    disposable: true,
    type: EquipmentType.Warmth,
    isSelectEquipmentShow: true,
    effect: {
      warm: 20,
    },
  },
  // 鸡油菌
  {
    key: EquipmentKey.MushroomJiYou,
    name: "蘑菇",
    weight: 0.2,
    size: 0.2,
    src: SELECT_EQUIPMENT_PRELOAD.MUSHROOM_JIYOU,
    disposable: true,
    type: EquipmentType.Food,
    effect: {
      hunger: 10,
    },
  },
  // 香菇
  {
    key: EquipmentKey.MushroomXiangGu,
    name: "蘑菇",
    weight: 0.2,
    size: 0.2,
    src: SELECT_EQUIPMENT_PRELOAD.MUSHROOM_XIANGGU,
    disposable: true,
    type: EquipmentType.Food,
    effect: {
      hunger: 10,
    },
  },
  // 毒蝇菌
  {
    key: EquipmentKey.MushroomDuYing,
    name: "蘑菇",
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
  // 鹅膏菌
  {
    key: EquipmentKey.MushroomEGao,
    name: "蘑菇",
    weight: 0.2,
    size: 0.2,
    src: SELECT_EQUIPMENT_PRELOAD.MUSHROOM_EGAO,
    disposable: true,
    type: EquipmentType.Food,
    effect: {
      endKey: SnowMainEventKey.IceMain_Poison_BadEnd,
    },
  },
  // 见手青
  {
    key: EquipmentKey.Mushroom_JianShouQing,
    name: "蘑菇",
    weight: 0.2,
    size: 0.2,
    src: SELECT_EQUIPMENT_PRELOAD.MUSHROOM_JIANSHOUQING,
    disposable: true,
    type: EquipmentType.Food,
    effect: {
      poison: Poison.JianShouQing,
    },
  },
  // 菜肴
  {
    key: EquipmentKey.EWW,
    name: "湿腻焦糊",
    weight: 0.2,
    size: 0.2,
    src: SELECT_EQUIPMENT_PRELOAD.MUSHROOM_JIANSHOUQING,
    disposable: true,
    type: EquipmentType.DISH,
    effect: {
      san: -10,
    },
  },
  {
    key: EquipmentKey.SportsDrink,
    name: "运动饮料",
    weight: 0.55,
    size: 0.5,
    src: SELECT_EQUIPMENT_PRELOAD.SPORTS_DRINK,
    disposable: true,
    type: EquipmentType.Food,
    isSelectEquipmentShow: true,
    cantCook: true,
  },
  {
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
  {
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
  {
    key: EquipmentKey.BeastSteak,
    name: "野兽肉排",
    weight: 0.3,
    size: 0.4,
    src: SELECT_EQUIPMENT_PRELOAD.SELF_HEATING_POT,
    disposable: true,
    type: EquipmentType.Food,
    effect: {
      hunger: 20,
    },
  },
  {
    key: EquipmentKey.Egg,
    name: "鸡蛋",
    weight: 0.2,
    size: 1,
    src: SELECT_EQUIPMENT_PRELOAD.SELF_HEATING_POT,
    disposable: true,
    type: EquipmentType.Food,
    effect: {
      hunger: 5,
    },
  },
  {
    key: EquipmentKey.Spear,
    name: "长矛",
    weight: 0.2,
    size: 0.2,
    src: SELECT_EQUIPMENT_PRELOAD.SPORTS_DRINK,
    type: EquipmentType.Tool,
  },
  {
    key: EquipmentKey.HikingPole,
    name: "登山杖",
    weight: 0.3,
    size: 0,
    src: SELECT_EQUIPMENT_PRELOAD.HIKING_POLE,
    type: EquipmentType.Tool,
    isSelectEquipmentShow: true,
  },
  {
    key: EquipmentKey.Crampons,
    name: "冰爪",
    weight: 0.8,
    size: 2,
    src: SELECT_EQUIPMENT_PRELOAD.CRAMPONS,
    type: EquipmentType.Tool,
    isSelectEquipmentShow: true,
  },
  {
    key: EquipmentKey.BearBell,
    name: "熊铃",
    weight: 0.05,
    size: 0,
    src: SELECT_EQUIPMENT_PRELOAD.BEAR_BELL,
    type: EquipmentType.Tool,
    isSelectEquipmentShow: true,
  },
  {
    key: EquipmentKey.PowerBank,
    name: "充电宝",
    weight: 0.3,
    size: 0.4,
    src: SELECT_EQUIPMENT_PRELOAD.POWER_BANK,
    type: EquipmentType.Tool,
    isSelectEquipmentShow: true,
  },
  {
    key: EquipmentKey.Headlamp,
    name: "头灯",
    weight: 0.2,
    size: 0.2,
    src: SELECT_EQUIPMENT_PRELOAD.HEAD_LAMP,
    type: EquipmentType.Tool,
    isSelectEquipmentShow: true,
  },
];
