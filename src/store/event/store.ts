import { create } from "zustand";
import { EVENT_PRIORITY, type EventType, type GameEvent } from "./type";
import { Route, ROUTES } from "./config";
import { useEnvironmenStore } from "@/store/environment/store";

interface EventStore {
  currentEvent: GameEvent | null;
  routeId: Route | null;
  eventPriority: Partial<Record<EventType, number>>;
  doneEventKeys: string[];
  setRouteId: (routeId: Route) => void;
  reset: () => void;
  setCurrentEventByCompute: () => void;
}

export const useEventStore = create<EventStore>((set, get) => ({
  // 初始无事件
  currentEvent: null,
  // WIP 测试方便
  routeId: Route.Ice,
  // 遇到事件的优先级，优先级越大越容易遇到此类事件
  eventPriority: EVENT_PRIORITY,
  // 已经做过的eventKeys
  doneEventKeys: [],
  // 路线选择页选择路线id
  setRouteId: (routeId: Route) => {
    set((state) => ({
      ...state,
      routeId,
    }));
  },
  // 设置当前事件
  reset: () => {
    set((state) => ({
      ...state,
      currentEvent: null,
      eventPriority: EVENT_PRIORITY,
      doneEventKeys: [],
    }));
  },
  // 计算设置当前事件
  setCurrentEventByCompute: () => {
    set((state) => {
      // 前置需要的数据
      const distance = useEnvironmenStore.getState().distance;
      const { routeId, eventPriority, doneEventKeys } = get();
      const currentRoute = ROUTES.find((item) => item.key === routeId);
      // WIP 先看有无状态低导致的必发事件

      // WIP 再看有无后置的必发事件

      // 再看distance check导致的必发事件
      const originMain = currentRoute!.mainEvents.filter(
        (item) => !doneEventKeys.includes(item.key),
      )?.[0];
      if (
        originMain &&
        typeof originMain.distance === "number" &&
        originMain.distance > distance
      ) {
        return {
          ...state,
          currentEvent: originMain,
        };
      }

      // 根据优先级和事件库随机出一个事件
      // 找出没有做过的事件
      const originOtherEvents = currentRoute!.otherEvents.filter(
        (item) => !doneEventKeys.includes(item.key),
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

      if(!eventTypeKey){
        // 理论上不会发生
        console.warn("已经没有剩余事件了")
        return state
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
        currentEvent: events![eventRandom] || null,
      };
    });
  },
}));
