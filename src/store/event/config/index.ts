import type { GameEvent } from "../type";
import { MAIN_ICE_EVENTS, OTHER_ICE_EVENTS } from "./snow";

export enum Route {
  Ice = "Ice",
  Sea = "Sea",
}

export const ROUTES: {
  title: string;
  key: Route;
  mainEvents: GameEvent[];
  otherEvents: GameEvent[];
  distance: number;
  averageDistancePerHour: number;
  afterEventDoHour: number;
}[] = [
  {
    title: "冰山",
    key: Route.Ice,
    mainEvents: MAIN_ICE_EVENTS,
    otherEvents: OTHER_ICE_EVENTS,
    distance: 18,
    // 平均每个小时走多少距离（后续需要乘以速度系数）
    averageDistancePerHour: 2.5,
    // 事件后走多少时间
    afterEventDoHour: 30 
  },
];
