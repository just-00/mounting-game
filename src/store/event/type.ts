export enum EventType {
  Warning = "WARNING",
  Dialog = "DIALOG",
}

export interface Option {
  oid: number;
  title: string;
}

export interface Event {
  id: number;
  eventType: EventType;
  title: string;
  options?: Option[];
  // 需要满足触发的前置事件id
  preEventIds?: number[];
}
