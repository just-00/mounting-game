import { EventType, type GameEvent } from "../type";

export enum IceEventKey {
  MainIce_RestPavilion_3 = "main_ice_rest_pavilion_3",
  MainIce_Icefall_5_5 = "main_ice_icefall_5_5",
  MainIce_RestPavilion_8 = "main_ice_rest_pavilion_8",
  MainIce_IceLake_9 = "main_ice_ice_lake_9",
  MainIce_RestPavilion_15 = "main_ice_rest_pavilion_15",
  MainIce_Downhill_18 = "main_ice_downhill_18",
  OtherIce_IceHole = "other_ice_hole",
  OtherIce_Bear = "other_ice_bear",
  OtherIce_Rockfall = "other_ice_rockfall",
  OtherIce_WildMushroom = "other_ice_wild_mushroom",
  OtherIce_SharpStick = "other_ice_sharp_stick",
}

export const MAIN_ICE_EVENTS: GameEvent[] = [
  {
    key: IceEventKey.MainIce_RestPavilion_3,
    title: "路遇休息亭",
    eventType: EventType.Main,
    distance: 3,
  },
  {
    key: IceEventKey.MainIce_Icefall_5_5,
    title: "附近有个冰瀑，要去看看吗？",
    eventType: EventType.Main,
    distance: 5.5,
  },
  {
    key: IceEventKey.MainIce_RestPavilion_8,
    title: "休息亭",
    eventType: EventType.Main,
    distance: 8,
  },
  {
    key: IceEventKey.MainIce_IceLake_9,
    title: "登顶看到冰湖",
    eventType: EventType.Main,
    distance: 9,
  },
  {
    key: IceEventKey.MainIce_RestPavilion_15,
    title: "休息亭",
    eventType: EventType.Main,
    distance: 15,
  },
  {
    key: IceEventKey.MainIce_Downhill_18,
    title: "下山到底",
    eventType: EventType.Main,
    distance: 18,
  },
];

export const OTHER_ICE_EVENTS: GameEvent[] = [
  {
    key: IceEventKey.OtherIce_Bear,
    title: "有温泉",
    eventType: EventType.Explore,
    options: [
      {
        title: "泡一下",
        warm: 20,
        useTime: 1
      },
      {
        title: "不泡",
      },
    ],
  },
   {
    key: IceEventKey.OtherIce_IceHole,
    title: "有冰洞",
    eventType: EventType.Explore,
    options: [
      {
        title: "掉下去了",
        warm: -50,
        useTime: 0.5
      },
      {
        title: "没掉",
      },
    ],
  },
  // {
  //   key: IceEventKey.OtherIce_Bear,
  //   title: "碰到熊了",
  //   eventType: EventType.Beast,
  //   options: [
  //     {
  //       title: "打",
  //     },
  //     {
  //       title: "不打",
  //     },
  //   ],
  // },
  // {
  //   key: IceEventKey.OtherIce_Rockfall,
  //   title: "落石了",
  //   eventType: EventType.Danger,
  //   options: [
  //     {
  //       title: "拿",
  //     },
  //     {
  //       title: "不拿",
  //     },
  //   ],
  // },
  // {
  //   key: IceEventKey.OtherIce_WildMushroom,
  //   title: "野生蘑菇",
  //   eventType: EventType.Item,
  //   options: [
  //     {
  //       title: "拿",
  //       equipment: {
  //         [EquipmentKey.Mushroom]: 2,
  //       },
  //     },
  //     {
  //       title: "不拿",
  //     },
  //   ],
  // },
  // {
  //   key: IceEventKey.OtherIce_SharpStick,
  //   title: "路边有一根削得尖尖的棍子",
  //   eventType: EventType.Item,
  //   options: [
  //     {
  //       title: "拿",
  //       equipment: {
  //         [EquipmentKey.Spear]: 1,
  //       },
  //     },
  //     {
  //       title: "不拿",
  //     },
  //   ],
  // },
];
