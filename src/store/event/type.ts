import type { Effect } from "../effect";
import type { Equipment } from "../equipment/type";

export enum EventType {
  // 主线相关
  Main = "Main",
  // 偶遇蘑菇
  Mushroom = "Mushroom",
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
  // 特殊
  Special = "Special",
}

export const EVENT_PRIORITY: Partial<Record<EventType, number>> = {
  [EventType.Mushroom]: 2,
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
  // 下一个必会触发的后置事件key
  mustTriggerAfterKey?: string;

  // 点击选项后会出现的图片
  optionPics?: string[]

  // 计算是否出现这个选项
  isShow?: (equipments: Equipment[]) => boolean;

  // 算结果，返回结局key、toast、副作用、成就
  result?: (equipments: Equipment[]) => Effect
}

export interface GameEvent {
  // 唯一标识
  key: string;
  // 事件标题
  title: string;
  // 事件类型
  eventType: EventType;
  // 事件配的图片，类型：结局图片 / 非结局事件图片
  eventPic?: string;
  // 事件选项
  options?: Option[];

  // 需要满足触发的前置选项key（简单场景下）
  preOptionKeys?: string[];
  // 计算是否出现这个事件，默认是true（复杂场景下）
  isShow?: (equipments: Equipment[]) => boolean;

  // true的话，只能通过mustTriggerAfterKey触发，不可以通过随机计算触发
  isForcedTriggerAfterKey?: boolean;

  // 主线专属：需要满足的公里数后触发
  distance?: number;
  // 是否是结局
  isEnd?: boolean;
}
