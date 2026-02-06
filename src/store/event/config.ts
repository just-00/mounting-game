import { EventType } from "./type";

export const EVENTS: Event[] = [
  {
    eventType: EventType.Warning,
    title: "天气不错",
  },
  {
    eventType: EventType.Dialog,
    title: "天气很差",
  },
].map((item, index) => ({
  ...item,
  id: index,
}));
