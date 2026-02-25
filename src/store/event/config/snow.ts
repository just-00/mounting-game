import {
  EquipmentKey,
  EquipmentType,
  type Equipment,
} from "@/store/equipment/type";
import { EventType, type GameEvent } from "../type";
import { MAIN_PROLOAD, SELECT_EQUIPMENT_PRELOAD } from "@/const/ResourceUrl";
import { getToast } from "@/store/effect";
import { add } from "@/utils/number";
import {
  SnowMainEventKey,
  SnowMainOptionKey,
  SnowOtherEventKey,
  SnowOtherOptionKey,
} from "./type";
import { AchievementKey } from "@/store/achievement/type";

export const OTHER_ICE_EVENTS: GameEvent[] = [
  // 野兽类相关
  // 熊
  {
    key: SnowOtherEventKey.Bear_1,
    title: "前方模模糊糊的有一个人，在朝你招手",
    eventType: EventType.Beast,
    options: [
      {
        key: SnowOtherOptionKey.Bear_1_1,
        title: "过去看看",
        mustTriggerAfterKey: SnowOtherEventKey.Bear_2,
      },
      {
        key: SnowOtherOptionKey.Bear_1_2,
        title: "不过去",
      },
    ],
  },
  {
    key: SnowOtherEventKey.Bear_2,
    title: "原来是一只熊",
    eventType: EventType.Beast,
    preOptionKeys: [SnowOtherOptionKey.Bear_1_2],
    isForcedTriggerAfterKey: true,
    options: [
      {
        key: SnowOtherOptionKey.Bear_2_1,
        title: "战斗！！！",
        result: (equipments: Equipment[]) => {
          // 返回toast供给展示，并且结算战斗结果
          return getBeastFightResult("熊", equipments);
        },
      },
      {
        key: SnowOtherOptionKey.Bear_2_2,
        title: "装死",
        result: () => ({
          endKey: SnowMainEventKey.IceMain_Common_BadEnd,
          endTitle: "熊不信，你死了",
          achievements: [AchievementKey.BEAR_KO],
        }),
      },
      {
        key: SnowOtherOptionKey.Bear_2_3,
        title: "向它投掷食物",
        result: (equipments: Equipment[]) => {
          const foods = equipments.filter(
            (item) => item.type === EquipmentType.Food && item.count,
          );
          if (!foods.length) {
            return {
              achievements: [AchievementKey.BEAR_KO],
              endKey: SnowMainEventKey.IceMain_Common_BadEnd,
              endTitle: "身上没有食物<br/>你死了",
            };
          }
          const ran = Math.floor(Math.random() * foods.length);
          const effect = {
            equipments: {
              [foods[ran].key]: -1,
            },
          };
          return {
            ...effect,
            toast: `${getToast(effect)}<br/>熊被吸引了注意力，你逃跑成功了！`,
          };
        },
      },
    ],
  },
  // 引路雪狐
  {
    key: SnowOtherEventKey.FOX_1,
    title: "窜出了一只雪狐",
    eventType: EventType.Beast,
    options: [
      {
        key: SnowOtherOptionKey.FOX_1_2,
        title: "给它肉排",
        isShow: (equipments: Equipment[]) =>
          !!equipments.find((item) => item.key === EquipmentKey.BeastSteak)
            ?.count,
        result: () => ({
          equipments: {
            [EquipmentKey.BeastSteak]: -1,
          },
        }),
      },
      {
        key: SnowOtherOptionKey.FOX_1_3,
        title: "给它压缩饼干",
        isShow: (equipments: Equipment[]) =>
          !!equipments.find(
            (item) => item.key === EquipmentKey.CompressedBiscuit,
          )?.count,
        result: () => ({
          equipments: {
            [EquipmentKey.CompressedBiscuit]: -1,
          },
        }),
      },
       {
        key: SnowOtherOptionKey.FOX_1_3,
        title: "踹它一脚",
        result: () => ({
          endKey: SnowMainEventKey.IceMain_Common_BadEnd,
          endTitle: '你被逮捕了'
        }),
      },
      {
        key: SnowOtherOptionKey.FOX_1_4,
        title: "不理他",
      },
    ],
  },
  // 探索相关
  // 温泉
  {
    key: SnowOtherEventKey.HotSpring_1,
    title: "远处传来一阵臭味",
    eventType: EventType.Explore,
    options: [
      {
        key: SnowOtherOptionKey.HotSpring_1_1,
        mustTriggerAfterKey: SnowOtherEventKey.HotSpring_2,
        title: "走过去看看",
      },
      {
        key: SnowOtherOptionKey.HotSpring_1_2,
        title: "不过去",
      },
    ],
  },
  {
    key: SnowOtherEventKey.HotSpring_2,
    title: "原来是硫磺泉",
    eventType: EventType.Explore,
    preOptionKeys: [SnowOtherOptionKey.HotSpring_1_1],
    isForcedTriggerAfterKey: true,
    options: [
      {
        key: SnowOtherOptionKey.HotSpring_2_1,
        title: "美美泡一下",
        result: () => ({
          useTime: 60,
          warm: 30,
          san: 5,
        }),
      },
      {
        key: SnowOtherOptionKey.HotSpring_2_2,
        title: "不泡",
      },
    ],
  },

  // 碰到人相关
  // 小女孩

  // 蘑菇相关
  // 鸡油菌
  {
    key: SnowOtherEventKey.MushroomJiYou,
    title: "路边有几丛蘑菇",
    eventType: EventType.Mushroom,
    eventPic: SELECT_EQUIPMENT_PRELOAD.MUSHROOM_JIYOU,
    options: [
      {
        key: SnowOtherOptionKey.MushroomJiYou_1,
        title: "采",
        result: () => ({
          equipments: {
            [EquipmentKey.MushroomJiYou]: 3,
          },
        }),
      },
      {
        key: SnowOtherOptionKey.MushroomJiYou_2,
        title: "不采",
      },
    ],
  },
  // 香菇
  {
    key: SnowOtherEventKey.MushroomXiangGu,
    title: "路边有几丛蘑菇",
    eventType: EventType.Mushroom,
    eventPic: SELECT_EQUIPMENT_PRELOAD.MUSHROOM_XIANGGU,
    options: [
      {
        key: SnowOtherOptionKey.MushroomXiangGu_1,
        title: "采",
        result: () => ({
          equipments: {
            [EquipmentKey.MushroomXiangGu]: 3,
          },
        }),
      },
      {
        key: SnowOtherOptionKey.MushroomXiangGu_2,
        title: "不采",
      },
    ],
  },
  // 鹅膏菌
  {
    key: SnowOtherEventKey.MushroomEGao,
    title: "路边有几丛蘑菇",
    eventType: EventType.Mushroom,
    eventPic: SELECT_EQUIPMENT_PRELOAD.MUSHROOM_EGAO,
    options: [
      {
        key: SnowOtherOptionKey.MushroomEGao_1,
        title: "采",
        result: () => ({
          equipments: {
            [EquipmentKey.MushroomEGao]: 3,
          },
        }),
      },
      {
        key: SnowOtherOptionKey.MushroomEGao_2,
        title: "不采",
      },
    ],
  },
  // 毒蝇菌
  {
    key: SnowOtherEventKey.MushroomDuYing,
    title: "路边有几丛蘑菇",
    eventType: EventType.Mushroom,
    eventPic: SELECT_EQUIPMENT_PRELOAD.MUSHROOM_DUYING,
    options: [
      {
        key: SnowOtherOptionKey.MushroomDuYing_1,
        title: "采",
        result: () => ({
          equipments: {
            [EquipmentKey.MushroomDuYing]: 3,
          },
        }),
      },
      {
        key: SnowOtherOptionKey.MushroomDuYing_2,
        title: "不采",
      },
    ],
  },
  // 见手青
  {
    key: SnowOtherEventKey.MushroomJianShouQing,
    title: "路边有几丛蘑菇",
    eventType: EventType.Mushroom,
    eventPic: SELECT_EQUIPMENT_PRELOAD.MUSHROOM_JIANSHOUQING,
    options: [
      {
        key: SnowOtherOptionKey.MushroomJianShouQing_1,
        title: "采",
        result: () => ({
          equipments: {
            [EquipmentKey.Mushroom_JianShouQing]: 3,
          },
        }),
      },
      {
        key: SnowOtherOptionKey.MushroomJianShouQing_2,
        title: "不采",
      },
    ],
  },
  // 棍子
  {
    key: SnowOtherEventKey.OtherIce_Stick,
    title: "路边有一根削得尖尖的棍子",
    eventType: EventType.Item,
    options: [
      {
        title: "拿",
        key: SnowOtherOptionKey.OtherIce_Stick_1,
        result: () => ({
          equipments: {
            [EquipmentKey.Spear]: 1,
          },
        }),
      },
      {
        title: "不拿",
        key: SnowOtherOptionKey.OtherIce_Stick_2,
      },
    ],
  },

  // 危险类

  // 假敌人事件 对应Poison中的DuYing
];

export const MAIN_ICE_EVENTS: GameEvent[] = [
  {
    key: SnowMainEventKey.IceMain_RestStop_3,
    title: "路遇休息亭",
    eventType: EventType.Main,
    distance: 0,
    options: [
      {
        title: "休息一下",
        key: SnowMainOptionKey.IceMain_RestStop_3_1,
        result: () => ({
          useTime: 30,
        }),
      },
      {
        title: "使用汽炉",
        key: SnowMainOptionKey.IceMain_RestStop_3_1,
        isShow: (equipments: Equipment[]) =>
          !!equipments.find((item) => item.key === EquipmentKey.GasStove)
            ?.count,
      },
      {
        title: "不休息",
        key: SnowMainOptionKey.IceMain_RestStop_3_2,
      },
    ],
  },
  {
    key: SnowMainEventKey.IceMain_Icefall_5_5,
    title: "附近有个冰瀑，要去看看吗？",
    eventType: EventType.Main,
    distance: 5.5,
    options: [
      {
        title: "去看看",
        key: SnowMainOptionKey.IceMain_Icefall_5_5_1,
        result: () => ({
          useTime: 0.5,
          optionPics: [MAIN_PROLOAD.ICE_FALL],
        }),
      },
      {
        title: "不去看",
        key: SnowMainOptionKey.IceMain_Icefall_5_5_2,
      },
    ],
  },
  {
    key: SnowMainEventKey.IceMain_RestStop_8,
    title: "休息亭",
    eventType: EventType.Main,
    distance: 8,
  },
  {
    key: SnowMainEventKey.IceMain_IceLake_9,
    title: "登顶看到冰湖",
    eventType: EventType.Main,
    distance: 9,
  },
  {
    key: SnowMainEventKey.IceMain_RestStop_15,
    title: "休息亭",
    eventType: EventType.Main,
    distance: 15,
  },
  {
    key: SnowMainEventKey.IceMain_Downhill_18,
    title: "下山到底",
    eventType: EventType.Main,
    distance: 18,
  },

  // 坏结局
  // 你死了
  {
    key: SnowMainEventKey.IceMain_Common_BadEnd,
    title: "你死了",
    eventType: EventType.Main,
    isEnd: true,
    eventPic: MAIN_PROLOAD.BAD_END,
  },
];

const getBeastFightResult = (animal: string, equipments: Equipment[]) => {
  // 默认40%几率打中
  const DEFAULT_SIDE = 0.4;
  // 有登山杖60%
  const HIKING_SIDE = 0.6;
  // 有长矛80%
  const SPEAR_SIDE = 0.8;
  // 搏斗次数
  const MAX = 4;

  // 默认情况
  let side = DEFAULT_SIDE;
  let weapon;
  // 如果有长矛的情况下
  const hasSpear = equipments.find((item) => item.key === EquipmentKey.Spear);
  if (hasSpear?.count) {
    side = HIKING_SIDE;
    weapon = hasSpear?.name;
  }
  // 如果有登山杖的情况下
  const hasHikingPole = equipments.find(
    (item) => item.key === EquipmentKey.HikingPole,
  );
  if (hasHikingPole?.count) {
    side = SPEAR_SIDE;
    weapon = hasHikingPole?.name;
  }

  const youBeat = `你${weapon ? "击中" : "打中"}了${animal}`;
  const itBeat = `${animal}打中了你`;
  let beatStr = "";
  let beHitted = 0;

  for (let i = 0; i < MAX; i++) {
    const ran = Math.random();
    if (ran < side) {
      beatStr += youBeat;
    } else {
      beHitted++;
      beatStr += itBeat;
    }
    if (i !== MAX - 1) {
      beatStr += "<br/>";
    }
  }
  // 拼凑toast
  const toast = `你${weapon ? `拿起${weapon}` : "赤手空拳"},和${animal}进行搏斗<br/>${beatStr}`;

  const achievements: AchievementKey[] = [];
  if (!weapon) {
    achievements.push(AchievementKey.BARE_HANDS);
  }

  // 如果被打中的次数多，则死亡
  if (beHitted > MAX / 2) {
    achievements.push(AchievementKey.BEAR_KO);
    return {
      toast,
      endKey: SnowMainEventKey.IceMain_Common_BadEnd,
      achievements,
    };
  }

  const effect = {
    injuried: beHitted > 0,
    equipments: {
      [EquipmentKey.BeastSteak]: add(Math.floor(Math.random() * 3), 2),
    },
  };
  // 效果影响事件
  let effectToast = "";
  const computeToast = getToast(effect);
  if (computeToast) {
    effectToast += `<br/>${computeToast}`;
  }

  achievements.push(AchievementKey.BEAT_BEAR);
  if (beHitted === 0) {
    achievements.push(AchievementKey.BEAT_BEAR_NO_DAMAGE);
  } else {
    achievements.push(AchievementKey.BEAR_DAMAGE);
  }
  return {
    toast: `${toast}${effectToast}`,
    effect,
    achievements,
  };
};
