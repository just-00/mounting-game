import { EquipmentKey } from "@/store/equipment/type";
import { EventType, type GameEvent } from "../type";
import { MAIN_PROLOAD } from "@/const/ResourceUrl";

// 支线相关
export enum OtherEventKey {
  // 野兽相关
  // 熊
  Bear_1 = "ice_enc_bear_1",
  Bear_2 = "ice_enc_bear_2",
  // 小狗 喂摸3次后得到XX

  // 探索相关
  // 温泉
  HotSpring_1 = "ice_enc_hot_spring_1",
  HotSpring_2 = "ice_enc_hot_spring_2",

  // 人相关
  // 叔叔 送食物 => 失温急救
  Uncle = "Uncle_1",

  // 物品相关
  // 蘑菇
  Mushroom = "Mushroom",
  // 尖尖的棍子
  OtherIce_Stick = "OtherIce_Stick",
}

export enum OtherOptionKey {
  Bear_1_1 = "Bear_1_1",
  Bear_1_2 = "Bear_1_2",
  Bear_2_1 = "Bear_2_1",
  Bear_2_2 = "Bear_2_2",
  Bear_2_3 = "Bear_2_3",
  HotSpring_1_1 = "HotSpring_1_1",
  HotSpring_1_2 = "HotSpring_1_2",
  HotSpring_2_1 = "HotSpring_2_1",
  HotSpring_2_2 = "HotSpring_2_2",
  Mushroom_1 = "Mushroom_1",
  Mushroom_2 = "Mushroom_2",
  OtherIce_Stick_1 = "OtherIce_Stick_1",
  OtherIce_Stick_2 = "OtherIce_Stick_2",
}

export const OTHER_ICE_EVENTS: GameEvent[] = [
  // 野兽类相关
  // 熊
  // 发现熊留下的爪印和啃剩的野果
  {
    key: OtherEventKey.Bear_1,
    title: "前方模模糊糊的有一个人，在朝你招手",
    eventType: EventType.Beast,
    options: [
      {
        key: OtherOptionKey.Bear_1_1,
        title: "走过去",
        mustTriggerAfterKey: OtherEventKey.Bear_2,
      },
      {
        key: OtherOptionKey.Bear_1_2,
        title: "不过去",
      },
    ],
  },
  {
    key: OtherEventKey.Bear_2,
    title: "原来是一只熊",
    eventType: EventType.Beast,
    preOptionKeys: [OtherOptionKey.Bear_1_2],
    isForcedTriggerAfterKey: true,
    options: [
      {
        key: OtherOptionKey.Bear_2_1,
        title: "战斗！！！",
      },
      {
        key: OtherOptionKey.Bear_2_2,
        title: "装死",
      },
      {
        key: OtherOptionKey.Bear_2_3,
        title: "面朝着它后退",
      },
    ],
  },

  // 探索相关
  // 温泉
  {
    key: OtherEventKey.HotSpring_1,
    title: "远处传来一阵臭味",
    eventType: EventType.Explore,
    options: [
      {
        key: OtherOptionKey.HotSpring_1_1,
        mustTriggerAfterKey: OtherEventKey.HotSpring_2,
        title: "走过去看看",
      },
      {
        key: OtherOptionKey.HotSpring_1_2,
        title: "不过去",
      },
    ],
  },
  {
    key: OtherEventKey.HotSpring_2,
    title: "原来是硫磺泉",
    eventType: EventType.Explore,
    preOptionKeys: [OtherOptionKey.HotSpring_1_1],
    isForcedTriggerAfterKey: true,
    options: [
      {
        key: OtherOptionKey.HotSpring_2_1,
        title: "美美泡一下",
        useTime: 1,
        warm: 30,
      },
      {
        key: OtherOptionKey.HotSpring_2_2,
        title: "不泡",
      },
    ],
  },

  // 碰到人相关
  // 路过人赠与
  {
    key: OtherEventKey.HotSpring_1,
    title: "碰到一个小女孩，送你一个苹果",
    eventType: EventType.Human,
    options: [
      {
        key: OtherOptionKey.HotSpring_1_1,
        title: "收下",
      },
      {
        key: OtherOptionKey.HotSpring_1_2,
        title: "不收",
      },
    ],
  },

  // 物品相关
  // 蘑菇
  {
    key: OtherEventKey.Mushroom,
    title: "路边有几丛蘑菇",
    eventType: EventType.Human,
    options: [
      {
        key: OtherOptionKey.Mushroom_1,
        title: "采",
        equipment: {
          [EquipmentKey.Mushroom]: 3,
        },
      },
      {
        key: OtherOptionKey.Mushroom_2,
        title: "不采",
      },
    ],
  },
  // 棍子
  {
    key: OtherEventKey.OtherIce_Stick,
    title: "路边有一根削得尖尖的棍子",
    eventType: EventType.Item,
    options: [
      {
        title: "拿",
        key: OtherOptionKey.OtherIce_Stick_1,
        equipment: {
          [EquipmentKey.Spear]: 1,
        },
      },
      {
        title: "不拿",
        key: OtherOptionKey.OtherIce_Stick_2,
      },
    ],
  },

  // 危险类
];

// 主线相关
export enum MainEventKey {
  IceMain_RestStop_3 = "ice_main_rest_stop_3",
  IceMain_Icefall_5_5 = "ice_main_icefall_5_5",
  IceMain_RestStop_8 = "ice_main_rest_stop_8",
  IceMain_IceLake_9 = "ice_main_ice_lake_9",
  IceMain_RestStop_15 = "ice_main_rest_stop_15",
  IceMain_Downhill_18 = "ice_main_downhill_18",
}

export enum MainOptionKey {
  IceMain_RestStop_3_1 = "IceMain_RestStop_3_1",
  IceMain_RestStop_3_2 = "IceMain_RestStop_3_2",
  IceMain_Icefall_5_5_1 = 'IceMain_Icefall_5_5_1',
  IceMain_Icefall_5_5_2 = 'IceMain_Icefall_5_5_2',
}

export const MAIN_ICE_EVENTS: GameEvent[] = [
  {
    key: MainEventKey.IceMain_RestStop_3,
    title: "路遇休息亭",
    eventType: EventType.Main,
    distance: 3,
    options: [
      {
        title: "去休息一下",
        key: MainOptionKey.IceMain_RestStop_3_1,
        useTime: 0.5,
      },
      {
        title: "不休息",
        key: MainOptionKey.IceMain_RestStop_3_2,
      },
    ],
  },
  {
    key: MainEventKey.IceMain_Icefall_5_5,
    title: "附近有个冰瀑，要去看看吗？",
    eventType: EventType.Main,
    distance: 5.5,
    options: [
      {
        title: "去看看",
        key: MainOptionKey.IceMain_Icefall_5_5_1,
        useTime: 0.5,
        pics: [MAIN_PROLOAD.ICE_FALL]
      },
      {
        title: "不去看",
        key: MainOptionKey.IceMain_Icefall_5_5_2,
      },
    ],
  },
  {
    key: MainEventKey.IceMain_RestStop_8,
    title: "休息亭",
    eventType: EventType.Main,
    distance: 8,
  },
  {
    key: MainEventKey.IceMain_IceLake_9,
    title: "登顶看到冰湖",
    eventType: EventType.Main,
    distance: 9,
  },
  {
    key: MainEventKey.IceMain_RestStop_15,
    title: "休息亭",
    eventType: EventType.Main,
    distance: 15,
  },
  {
    key: MainEventKey.IceMain_Downhill_18,
    title: "下山到底",
    eventType: EventType.Main,
    distance: 18,
  },
];
