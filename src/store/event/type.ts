import type { Time, Weather } from "../environment/type";
import type { EquipmentKey } from "../equipment/type";

export enum EventType {
  // 主线相关
  Main = "Main",
  // 偶遇物品
  Item = "Item",
  // 野兽遭遇
  Beast = "Beast",
  // 碰到人
  Human = "Human",
  // 探索类
  Explore = "Explore",
  // 遇到危险
  Danger = "Danger",
}

export const EVENT_PRIORITY: Partial<Record<EventType, number>> = {
  [EventType.Item]: 5,
  [EventType.Beast]: 5,
  [EventType.Human]: 5,
  [EventType.Explore]: 3,
  [EventType.Danger]: 3,
};

export interface Option {
  // 唯一标识
  key: string;
  title: string;
  // 触发选项后的副作用
  effect?: {
    // 装备的增减
    equipment?: {
      add?: {
        [key in EquipmentKey]?: number;
      };
      sub?: {
        [key in EquipmentKey]?: number;
      };
    };
    // 精神值
    san?: {
      add?: number;
      sub?: number;
    };
    // 体温
    temperature?: {
      add?: number;
      sub?: number;
    };
    // 时间（s）
    timestamp?: number;
  };
}

export interface GameEvent {
  // 唯一标识
  key: string;
  // 事件标题
  title: string;
  // 事件类型
  eventType: EventType;
  // 事件选项
  options?: Option[];
  // 需要满足触发的前置事件id
  preEventKeys?: number[];
  // 必会触发的后置事件id
  afterEventIds?: number[];

  // 需要满足的公里数后触发
  distance?: number;
  // 需要满足的装备key
  equipmentKey?: EquipmentKey[];
  // 需要满足的天气key
  weatherKey?: Weather[];
  // 需要满足的时间key
  timeKey?: Time[];
}
