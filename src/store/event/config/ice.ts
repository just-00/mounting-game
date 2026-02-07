import { EventType, type GameEvent } from "../type";

export const MAIN_ICE_EVENTS: GameEvent[] = [
  {
    title: "休息亭",
    eventType: EventType.Main,
  },
  {
    title: "登到一半",
    eventType: EventType.Main,
  },
  {
    title: "附近有个冰瀑，要去看看吗？",
    eventType: EventType.Main,
  },
  {
    title: "休息亭",
    eventType: EventType.Main,
  },
  {
    title: "登顶看到冰湖",
    eventType: EventType.Main,
  },
  {
    title: "下山到底",
    eventType: EventType.Main,
  },
];

export const OTHER_ICE_EVENTS: GameEvent[] = [
  {
    title: "碰到熊了",
    eventType: EventType.Beast,
    options: [
      {
        title: "拿",
      },
      {
        title: "不拿",
      },
    ],
  },
  {
    title: "落石了",
    eventType: EventType.Danger,
    options: [
      {
        title: "拿",
      },
      {
        title: "不拿",
      },
    ],
  },
  {
    title: "野生蘑菇",
    eventType: EventType.Item,
    options: [
      {
        title: "拿",
      },
      {
        title: "不拿",
      },
    ],
  },
  {
    title: "路边有一根削得尖尖的棍子",
    eventType: EventType.Item,
    options: [
      {
        title: "拿",
      },
      {
        title: "不拿",
      },
    ],
  },
];
