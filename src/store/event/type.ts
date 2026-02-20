import type { AchievementKey } from "../achievement/type";
import type { Effect } from "../effect";
import type { Time, Weather } from "../environment/type";
import type { Equipment, EquipmentKey } from "../equipment/type";
import type { Poison } from "../status/type";

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
  Special = 'Special'
}

export const EVENT_PRIORITY: Partial<Record<EventType, number>> = {
  [EventType.Mushroom]: 2,
  [EventType.Item]: 5,
  [EventType.Beast]: 5,
  [EventType.Human]: 5,
  [EventType.Explore]: 3,
  [EventType.Danger]: 3,
};

export interface Option extends Effect {
  // 唯一标识
  key: string;
  title: string;
  // 下一个必会触发的后置事件key
  mustTriggerAfterKey?: string;
  // 点击选项后会出现的图片
  optionPics?: string[];
  // 计算是否出现这个选项
  isShow?: (equipments: Equipment[]) => boolean;
  // 成就
  achievements?: AchievementKey[]
  // 动态计算结果，返回结局key或者toast
  result?: (equipments: Equipment[]) => {
    endKey?: string;
    toast?: string;
    effect?: Effect;
    achievements?: AchievementKey[]
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

  // 需要满足触发的前置事件key
  preEventKeys?: string[];
  // 需要满足触发的前置选项key
  preOptionKeys?: string[];
  // true的话，只能通过mustTriggerAfterKey触发
  isForcedTriggerAfterKey?: boolean;
  // 成就
  achievements?: AchievementKey[]

  // 需要满足的公里数后触发
  distance?: number;
  // 需要满足的装备key
  equipmentKey?: EquipmentKey[];
  // 需要满足的天气key
  weatherKey?: Weather[];
  // 需要满足的时间key
  timeKey?: Time[];
  // 需要满足的状态
  status?: {
    san?: {
      max?: number,
      min?: number
    };
    warm: {
      max?: number,
      min?: number
    };
    hunger:  {
      max?: number,
      min?: number
    };
    // 受伤
    injuried?: boolean;
    // 中毒
    poison: Poison[];
  };

  // 是否是结局
  isEnd?: boolean;
  // 事件配的图片
  eventPic?: string;
}
