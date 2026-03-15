import type { AchievementKey } from "../achievement/type";
import type { Action, Effect } from "../effect";

export type DishConfig = {
  // 限定食材数量
  equipmentCount?: number[] | number;
  // 需要的食材类型以及数量，用other限制数量
  equipmentConfig?: Array<{
    // 这个用来表示或逻辑，且逻辑直接增加一项
    equipment: EquipmentKey[] | EquipmentKey;
    count: number[] | number;
  }>;
  // 优先级，数字越小越先被计算
  priority: number;
};

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
  // 增加时获得的成就
  addedAchievement?: AchievementKey[];
  // 使用后的副作用
  effect?: Effect;
  // 使用后的动作
  action?: Action;
  // 使用后会变成的垃圾key
  emptyRubish?: EquipmentKey;
  // 菜肴特定配置
  dishConfig?: DishConfig;
}

export enum EquipmentKey {
  LightTent = "LightTent",
  WarmTent = "WarmTent",
  SleepingBag = "SleepingBag",
  Herbs = "Herbs",
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
  // 垃圾类
  EmptyDrink = "EmptyDrink",
  EmptySelfHeatingPot = "EmptySelfHeatingPot",

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
  // 大份蘑菇杂烩
  MushroomMixedBig = "MushroomMixedBig",
  // 毒蘑菇杂烩
  PoisonMushroomMixed = "PoisonMushroomMixed",
  // 煎肉排
  FriedSteak = "FriedSteak",
  // 肉排杂烩
  FriedSteakMixed = "FriedSteakMixed",
  // 大份肉排杂烩
  FriedSteakMixedBig = "FriedSteakMixedBig",
  // 大肉汤
  FriedSteakLuxury = "FriedSteakLuxury",
  // 早餐锅
  FriedSteakBreakfast = "FriedSteakBreakfast",
  // 煎蛋
  FriedEgg = "FriedEgg",
  // 炒蛋
  ScrambledEgg = "ScrambledEgg",
  // 大份炒蛋
  ScrambledEggBig = "ScrambledEggBig",
  // 炒饼干
  FriedBiscuit = "FriedBiscuit",
  // 高能饼干条
  FriedBiscuitLuxury = "FriedBiscuitLuxury",
  // 炒菜
  StirFried = "StirFried",
  // 大份炒菜
  StirFriedBig = "StirFriedBig",
  // 美味炒菜
  StirFriedLuxury = "StirFriedLuxury",
  // 大份美味炒菜
  StirFriedLuxuryBig = "StirFriedLuxuryBig",
  // 湿腻焦糊
  Eww = "Eww",
  // 自热锅杂烩
  SelfHeatingPotMixed = "SelfHeatingPotMixed",
  // 大份自热锅杂烩
  SelfHeatingPotMixedBig = "SelfHeatingPotMixedBig",
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
  // 垃圾类
  RUBISH = "RUBISH",
  // 工具类
  Tool = "tool",
}
