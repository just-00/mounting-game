import type { Effect } from "../effect";

export interface Equipment {
  key: EquipmentKey;
  // 类型
  type: EquipmentType;
  // 体积
  size: number;
  // 重量
  weight: number;
  name: string;
  // 图片地址
  src: string;
  // 备注
  tips?: string;
  // 是否在装备选择页面出现
  isSelectEquipmentShow?: boolean;
  // 持有数量
  count?: number;
  // 只可用一次
  disposable?: boolean;
  // 不可烹饪
  cantCook?: boolean;
  // 使用后的副作用
  effect?: Effect;
}

export enum EquipmentKey {
  LightTent = "lightTent",
  WarmTent = "warmTent",
  SleepingBag = "sleepingBag",
  FirstAidKit = "firstAidKit",
  SurvivalBlanket = "survivalBlanket",

  // 食物
  // 鸡油菌
  MushroomJiYou = "MushroomJiYou",
  // 香菇
  MushroomXiangGu = "MushroomXiangGu",
  // 毒蝇菌
  MushroomDuYing = "MushroomDuYing",
  // 鹅膏菌
  MushroomEGao = "MushroomEGao",
  // 见手青
  Mushroom_JianShouQing = "Mushroom_JianShouQing",
  Egg = "egg",
  BeastSteak = "BeastSteak",
  SportsDrink = "sportsDrink",
  CompressedBiscuit = "compressedBiscuit",
  SelfHeatingPot = "selfHeatingPot",
  // 菜肴
  // 湿腻焦糊
  EWW = "EWW",
  // 毒蘑菇杂烩
  PoisonMushroomMixed = "PoisonMushroomMixed",
  // 蘑菇杂烩
  MushroomMixed = 'MushroomMixed',
  // 自热锅杂烩
  SelfHeatingPotMixed = "SelfHeatingPotMixed",
  // 煎肉排
  FriedSteak = 'FriedSteak',
  // 肉排杂烩
  FriedSteakMixed = 'FriedSteakMixed',

  Spear = "Spear",
  HikingPole = "hikingPole",
  Crampons = "crampons",
  PowerBank = "powerBank",
  BearBell = "bearBell",
  Headlamp = "headlamp",
  // 汽炉
  GasStove = "GasStove",
}

export enum EquipmentType {
  // 帐篷类
  Tent = "tent",
  // 保暖类
  Warmth = "warmth",
  // 医疗类
  Medical = "medical",
  // 食品/补给类
  Food = "food",
  // 菜肴类
  DISH = "DISH",
  // 工具类
  Tool = "tool",
}
