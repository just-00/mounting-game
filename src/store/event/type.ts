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
  // 升高体温
  warm?: number;
  // 精神
  san?: number;
  // 用一次要多少分钟
  useTime?: number;
  // 会出什么图片
  pics?: string[]
  // 天气
  weather?: Weather;
  // 装备相关
  equipment?: {
    [key: string]: number;
  };
  // 下一个必会触发的后置事件key
  mustTriggerAfterKey?: string;
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

  // 需要满足触发的前置事件key
  preEventKeys?: string[];
  // 需要满足触发的前置选项key
  preOptionKeys?: string[];
  // true的话，只能通过mustTriggerAfterKey触发
  isForcedTriggerAfterKey?: boolean;

  // 需要满足的公里数后触发
  distance?: number;
  // 需要满足的装备key
  equipmentKey?: EquipmentKey[];
  // 需要满足的天气key
  weatherKey?: Weather[];
  // 需要满足的时间key
  timeKey?: Time[];
}
