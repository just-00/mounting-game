import type { GameEvent } from "../type";
import { MAIN_ICE_EVENTS, OTHER_ICE_EVENTS } from "./snow";
import { GameRoute } from "./type";

export const ROUTES: {
  title: string;
  key: GameRoute;
  mainEvents: GameEvent[];
  otherEvents: GameEvent[];
  distance: number;
  averageDistancePerHour: number;
  afterEventDoHour: number;
}[] = [
  {
    title: "冰山",
    key: GameRoute.Ice,
    mainEvents: MAIN_ICE_EVENTS,
    otherEvents: OTHER_ICE_EVENTS,
    distance: 18,
    // 平均每个小时走多少距离（后续需要乘以速度系数）
    averageDistancePerHour: 2.5,
    // 事件后走多少时间
    afterEventDoHour: 30 
  },
];
