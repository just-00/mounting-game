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
  LightTent = "LightTent",
  WarmTent = "WarmTent",
  SleepingBag = "SleepingBag",
  FirstAidKit = "FirstAidKit",
  SurvivalBlanket = "SurvivalBlanket",
  Spear = "Spear",
  HikingPole = "HikingPole",
  Crampons = "Crampons",
  PowerBank = "PowerBank",
  BearBell = "BearBell",
  Headlamp = "Headlamp",
  // 汽炉
  GasStove = "GasStove",

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
  MushroomJianShouQing = "MushroomJianShouQing",
  Egg = "Egg",
  BeastSteak = "BeastSteak",
  SportsDrink = "SportsDrink",
  CompressedBiscuit = "CompressedBiscuit",
  SelfHeatingPot = "SelfHeatingPot",
  // 菜肴
  // 炒蘑菇
  ScrambledMushroom = "ScrambledMushroom",
  // 炒毒蘑菇
  PoisonMushroom = "PoisonMushroom",
  // 蘑菇杂烩
  MushroomMixed = "MushroomMixed",
  // 毒蘑菇杂烩
  PoisonMushroomMixed = "PoisonMushroomMixed",
  // 煎肉排
  FriedSteak = "FriedSteak",
  // 肉排杂烩
  FriedSteakMixed = "FriedSteakMixed",
  // 大肉汤
  FriedSteakLuxury = "FriedSteakLuxury",
  // 早餐锅
  FriedSteakBreakfast = "FriedSteakBreakfast",
  // 煎蛋
  FriedEgg = "FriedEgg",
  // 炒蛋
  ScrambledEgg = "ScrambledEgg",
  // 炒饼干
  FriedBiscuit = "FriedBiscuit",
  // 高能饼干条
  FriedBiscuitLuxury = "FriedBiscuitLuxury",
  // 炒菜
  StirFried = "StirFried",
  // 美味炒菜
  StirFriedLuxury = "StirFriedLuxury",
  // 湿腻焦糊
  Eww = "Eww",
  // 自热锅杂烩
  SelfHeatingPotMixed = "SelfHeatingPotMixed",
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
