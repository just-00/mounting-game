import { SELECT_EQUIPMENT_PRELOAD } from "@/const/ResourceUrl";
import type { Equipment } from "./type";

export const EQUIPMENT_MAX_SIZE = 55
export const EQUIPMENT_MAX_WEIGHT = 20

export enum EquipmentKey {
  LightTent = 'lightTent',
  WarmTent = 'warmTent',
  SleepingBag = 'sleepingBag',
  FirstAidKit = 'firstAidKit',
  SurvivalBlanket = 'survivalBlanket',
  SportsDrink = 'sportsDrink',
  CompressedBiscuit = 'compressedBiscuit',
  SelfHeatingPot = 'selfHeatingPot',
  HikingPole = 'hikingPole',
  Crampons = 'crampons',
  PowerBank = 'powerBank',
  BearBell = 'bearBell',
  Headlamp = 'headlamp'
}

export const EQUIPMENTS: Equipment[] = [
  // 生存保障类
  {
    key: EquipmentKey.LightTent,
    name: '轻便帐篷',
    weight: 1.2, 
    size: 8,
    src: SELECT_EQUIPMENT_PRELOAD.LIGHT_TENT,
    useTime: 15, 
    warm: 5, 
  },
  {
    key: EquipmentKey.WarmTent,
    name: '保暖帐篷',
    weight: 3, 
    size: 12, 
    src: SELECT_EQUIPMENT_PRELOAD.WARM_TENT,
    useTime: 30, 
    warm: 8,
  },
  {
    key: EquipmentKey.SleepingBag,
    name: '睡袋',
    weight: 1.8, 
    size: 7,
    src: SELECT_EQUIPMENT_PRELOAD.SLEEPING_BAG,
    warm: 5, 
  },
  {
    key: EquipmentKey.FirstAidKit,
    name: '急救包',
    weight: 0.8, 
    size: 2,
    src: SELECT_EQUIPMENT_PRELOAD.FIRST_AID_KIT,
    useTime: 10, 
    disposable: true,
  },
  {
    key: EquipmentKey.SurvivalBlanket,
    name: '救生毯',
    weight: 0.1, 
    size: 0.5, 
    src: SELECT_EQUIPMENT_PRELOAD.SURVIAL_BLANKET,
    disposable: true, 
    warm: 20, 
  },
  // 食物类
  {
    key: EquipmentKey.SportsDrink,
    name: '运动饮料',
    weight: 0.55, 
    size: 0.5, 
    src: SELECT_EQUIPMENT_PRELOAD.SPORTS_DRINK,
    disposable: true,
  },
  {
    key: EquipmentKey.CompressedBiscuit,
    name: '压缩饼干',
    weight: 0.3, 
    size: 0.3, 
    src: SELECT_EQUIPMENT_PRELOAD.COMPRESSED_BISCUIT,
    disposable: true, 
  },
  {
    key: EquipmentKey.SelfHeatingPot,
    name: '自热锅',
    weight: 1.2,
    size: 2, 
    src: SELECT_EQUIPMENT_PRELOAD.SELF_HEATING_POT,
    useTime: 10, 
    disposable: true, 
    warm: 10, 
  },
  // 登山器材类
  {
    key: EquipmentKey.HikingPole,
    name: '登山杖',
    weight: 0.3,
    size: 0, 
    src: SELECT_EQUIPMENT_PRELOAD.HIKING_POLE,
  },
  {
    key: EquipmentKey.Crampons,
    name: '冰爪',
    weight: 0.8, 
    size: 2,
    src: SELECT_EQUIPMENT_PRELOAD.CRAMPONS,
  },
  // 特殊用品
  {
    key: EquipmentKey.PowerBank,
    name: '充电宝',
    weight: 0.3, 
    size: 0.4, 
    src: SELECT_EQUIPMENT_PRELOAD.POWER_BANK,
  },
  {
    key: EquipmentKey.BearBell,
    name: '熊铃',
    weight: 0.05,
    size: 0,
    src: SELECT_EQUIPMENT_PRELOAD.BEAR_BELL,
  },
  {
    key: EquipmentKey.Headlamp,
    name: '头灯',
    weight: 0.2, 
    size: 0.2,
    src: SELECT_EQUIPMENT_PRELOAD.HEAD_LAMP,
  },
];