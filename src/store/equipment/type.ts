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
  // 升高体温
  warm?: number;
  // 精神
  san?: number;
  // 用一次要多少分钟
  useTime?: number;
}

export enum EquipmentKey {
  LightTent = "lightTent",
  WarmTent = "warmTent",
  SleepingBag = "sleepingBag",
  FirstAidKit = "firstAidKit",
  SurvivalBlanket = "survivalBlanket",
  Mushroom = "mushroom",
  Egg = 'egg',
  BeastSteak = 'BeastSteak',
  Spear = "Spear",
  SportsDrink = "sportsDrink",
  CompressedBiscuit = "compressedBiscuit",
  SelfHeatingPot = "selfHeatingPot",
  HikingPole = "hikingPole",
  Crampons = "crampons",
  PowerBank = "powerBank",
  BearBell = "bearBell",
  Headlamp = "headlamp",
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
  // 工具类
  Tool = "tool",
  // 日常用品类
  Daily = "daily",
}
