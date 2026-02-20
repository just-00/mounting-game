import { create } from "zustand";
import { EVENT_PRIORITY, type EventType, type GameEvent } from "./type";
import { ROUTES } from "./config";
import { useEnvironmenStore } from "@/store/environment/store";
import type { Equipment } from "../equipment/type";
import { useEquipmentStore } from "../equipment/store";
import { GameRoute } from "./config/type";

interface EventStore {
  currentEvent: GameEvent | null;
  routeId: GameRoute | null;
  eventPriority: Partial<Record<EventType, number>>;
  doneEventKeys: string[];
  setRouteId: (routeId: GameRoute) => void;
  resetEventStore: () => void;
  setCurrentEventByKey: (key: string, title?: string) => void;
  setCurrentEventByCompute: () => void;
}

const INIT_STORE = {
  // 初始无事件
  currentEvent: null,
  // WIP 测试方便
  routeId: GameRoute.Ice,
  // 遇到事件的优先级，优先级越大越容易遇到此类事件
  eventPriority: EVENT_PRIORITY,
  // 已经做过的eventKeys
  doneEventKeys: [],
};

export const useEventStore = create<EventStore>((set, get) => ({
  ...INIT_STORE,
  // 重置
  resetEventStore: () => {
    set(() => ({
      ...INIT_STORE,
    }));
  },
  // 路线选择页选择路线id
  setRouteId: (routeId: GameRoute) => {
    set((state) => ({
      ...state,
      routeId,
    }));
  },
  // 通过key设置当前事件
  setCurrentEventByKey: (afterEventKey: string, title?: string) => {
    set((state) => {
      const { routeId, doneEventKeys } = get();
      const { equipments } = useEquipmentStore.getState();
      const currentRoute = ROUTES.find((item) => item.key === routeId);
      const afterEvent = [
        ...currentRoute!.otherEvents,
        ...currentRoute!.mainEvents,
      ].find((item) => item.key === afterEventKey);
      return {
        ...state,
        doneEventKeys: doneEventKeys.concat(afterEventKey),
        currentEvent: computeEvent(afterEvent!, equipments, title),
      };
    });
  },
  // 计算设置当前事件
  setCurrentEventByCompute: () => {
    set((state) => {
      // 前置需要的数据
      const distance = useEnvironmenStore.getState().distance;
      const { routeId, eventPriority, doneEventKeys } = get();
      const { equipments } = useEquipmentStore.getState();
      const currentRoute = ROUTES.find((item) => item.key === routeId);
      // 先看有无状态低导致的必发事件

      // 再看distance check导致的必发事件
      const originMain = currentRoute!.mainEvents.filter(
        (item) => !doneEventKeys.includes(item.key),
      )?.[0];
      if (
        originMain &&
        typeof originMain.distance === "number" &&
        distance > originMain.distance
      ) {
        return {
          ...state,
          doneEventKeys: doneEventKeys.concat(originMain.key),
          currentEvent: computeEvent(originMain, equipments),
        };
      }

      // 根据优先级和事件库随机出一个事件
      // 找出没有做过的事件
      const originOtherEvents = currentRoute!.otherEvents.filter(
        (item) =>
          !doneEventKeys.includes(item.key) && !item.isForcedTriggerAfterKey,
      );

      // 计算出当前事件按eventType的分类
      const eventsMap = originOtherEvents!.reduce(
        (
          total: Partial<Record<EventType, GameEvent[]>>,
          current: GameEvent,
        ) => {
          const curEvent = current.eventType;
          if (!total[curEvent]) {
            total[curEvent] = [];
          }
          total[curEvent].push(current);
          return total;
        },
        {},
      );

      // 如果该eventType已经没有剩余事件了，直接删除这种priority
      Object.keys(eventPriority).forEach((key: string) => {
        if (!eventsMap[key as EventType]?.length) {
          delete eventPriority[key as EventType];
        }
      });

      // 筛选出还有剩余事件的eventType的priority总量
      const total = Object.keys(eventPriority).reduce(
        (total, current) =>
          total + (eventPriority?.[current as EventType] || 0),
        0,
      );
      // 给出一个随机数
      const eventTypeRandom = Math.random() * total;

      // 找到随机算出的eventType
      let temp = 0;
      const eventTypeKey = Object.entries(eventPriority).find(([, value]) => {
        temp += value;
        return temp >= eventTypeRandom;
      })?.[0] as EventType;

      if (!eventTypeKey) {
        // 理论上不会发生
        console.warn("已经没有剩余事件了");
        return state;
      }

      // 这种eventType优先级减1
      if (eventPriority[eventTypeKey]) {
        eventPriority[eventTypeKey] -= 1;
        if (eventPriority[eventTypeKey] === 0) {
          delete eventPriority[eventTypeKey];
        }
      }

      // 找到算出的eventType对应的events
      const events = eventsMap[eventTypeKey as EventType];
      // 给出一个随机数
      const eventRandom = Math.floor(Math.random() * (events?.length || 0));

      return {
        ...state,
        doneEventKeys: doneEventKeys.concat(events![eventRandom]!.key),
        eventPriority: { ...eventPriority },
        currentEvent: computeEvent(events![eventRandom], equipments),
      };
    });
  },
}));

const computeEvent = (
  event: GameEvent,
  equipments: Equipment[],
  title?: string,
) => {
  const options = event.options?.filter((item) => {
    if (!item.isShow) {
      return true;
    }
    return item.isShow(equipments);
  });
  const result = {
    ...event,
    options,
  };
  if (title) {
    result.title = title;
  }
  return result;
};
