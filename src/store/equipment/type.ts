export interface Equipment {
  key: EquipmentKey;
  size: number;
  weight: number;
  name: string;
  // 图片地址
  src: string;
  // 备注
  tips?: string;
  // 只可用一次
  disposable?: boolean;
  // 升高体温
  warm?: number;
  // 用一次要多少分钟
  useTime?: number;
  // 持有数量
  count?: number;
  // 类型
  type: EquipmentType;
  // 是否在装备选择页面出现
  isSelectEquipmentShow?: boolean;
}

// 装备的效果
export const EquipmentText: {
  [key: string]: {
    addOrSub: string[];
    text: string;
  };
} = {
  warm: {
    text: '体温',
    addOrSub: ['降低', '升高']
  },
};

export enum EquipmentKey {
  LightTent = "lightTent",
  WarmTent = "warmTent",
  SleepingBag = "sleepingBag",
  FirstAidKit = "firstAidKit",
  SurvivalBlanket = "survivalBlanket",
  Mushroom = "mushroom",
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
