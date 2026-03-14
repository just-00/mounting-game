import {
  EquipmentKey,
  EquipmentType,
  type Equipment,
} from "@/store/equipment/type";
import { EventPicType, EventType, type GameEvent } from "../type";
import {
  MAIN_PROLOAD,
  PIXEL_PRELOAD,
  SELECT_EQUIPMENT_PRELOAD,
} from "@/const/ResourceUrl";
import { getToast, type Effect } from "@/store/effect";
import { add } from "@/utils/number";
import {
  SnowMainEventKey,
  SnowMainOptionKey,
  SnowOtherEventKey,
  SnowOtherOptionKey,
  SnowStatusEventKey,
  SnowStatusOptionKey,
} from "./type";
import { AchievementKey } from "@/store/achievement/type";
import { getHungerType, Hunger, Speed } from "@/store/status/type";
import { EQUIPMENTS } from "@/store/equipment/config";
import { Weather } from "@/store/environment/type";

export const OTHER_ICE_EVENTS: GameEvent[] = [
  // 野兽相关
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
        result: ({ equipments }) => {
          // 返回toast供给展示，并且结算战斗结果
          return getBeastFightResult(BeastFightAnimal.Bear, equipments);
        },
      },
      {
        key: SnowOtherOptionKey.Bear_2_2,
        title: "装死",
        result: () => ({
          effect: {
            endKey: SnowMainEventKey.IceMain_Common_BadEnd,
            endTitle: "熊不信，你死了",
            achievements: [AchievementKey.BEAR_KO],
          },
        }),
      },
      {
        key: SnowOtherOptionKey.Bear_2_3,
        title: "向它投掷食物",
        result: ({ equipments }) => {
          const foods = equipments.filter(
            (item) => item.type === EquipmentType.Food && item.count,
          );
          if (!foods.length) {
            return {
              effect: {
                achievements: [AchievementKey.BEAR_KO],
                endKey: SnowMainEventKey.IceMain_Common_BadEnd,
                endTitle: "身上没有食物<br/>你死了",
              },
            };
          }
          const ran = Math.floor(Math.random() * foods.length);
          const effect = {
            equipments: {
              [foods[ran].key]: -1,
            },
          };
          return {
            effect: {
              ...effect,
              toast: `${getToast(effect)}<br/>熊被吸引了注意力，你逃跑成功了！`,
            },
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
        isShow: ({ equipments }) =>
          !!equipments.find((item) => item.key === EquipmentKey.BeastSteak)
            ?.count,
        result: () => {
          const effect: Effect = {
            equipments: {
              [EquipmentKey.Herbs]: 1,
            },
          };
          const toast = `雪狐吃掉了肉排，叼了草给你<br/>${getToast(effect)}`;
          effect.equipments![EquipmentKey.BeastSteak] = -1;
          return {
            effect: {
              ...effect,
              toast,
            },
          };
        },
      },
      {
        key: SnowOtherOptionKey.FOX_1_3,
        title: "给它压缩饼干",
        isShow: ({ equipments }) =>
          !!equipments.find(
            (item) => item.key === EquipmentKey.CompressedBiscuit,
          )?.count,
        result: () => {
          return {
            effect: {
              toast: `雪狐嗅了嗅，走开了`,
              equipments: {
                [EquipmentKey.CompressedBiscuit]: -1,
              },
            },
          };
        },
      },
      {
        key: SnowOtherOptionKey.FOX_1_3,
        title: "和它战斗",
        result: ({ equipments }) => {
          return getBeastFightResult(BeastFightAnimal.Fox, equipments);
        },
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
          effect: {
            useTime: 60,
            warm: 30,
            san: 5,
            optionPics: {
              type: "top",
              urls: MAIN_PROLOAD.SPRING_POT,
            },
            achievements: [AchievementKey.SPRING_POT],
          },
        }),
      },
      {
        key: SnowOtherOptionKey.HotSpring_2_2,
        title: "不泡",
      },
    ],
  },

  // 邂逅相关
  // 小狗
  // {
  //   key: SnowOtherEventKey.DOG,
  //   title: "有一只小狗跟上了你",
  //   eventType: EventType.Encounter,
  //   eventPic: PIXEL_PRELOAD.PIXEL_DOG,
  //   eventPicType: EventPicType.TopSmall,
  //   options: [
  //     {
  //       key: SnowOtherOptionKey.MushroomJiYou_1,
  //       title: "摸摸它",
  //       result: () => ({
  //         effect: {},
  //       }),
  //     },
  //     {
  //       key: SnowOtherOptionKey.MushroomJiYou_2,
  //       title: "给它吃东西",
  //     },
  //     {
  //       key: SnowOtherOptionKey.MushroomJiYou_2,
  //       title: "无视",
  //     },
  //   ],
  // },

  // 小女孩

  // 蘑菇相关
  // 鸡油菌
  {
    key: SnowOtherEventKey.MushroomJiYou,
    title: "路边有几丛蘑菇",
    eventType: EventType.Mushroom,
    eventPic: SELECT_EQUIPMENT_PRELOAD.MUSHROOM_JIYOU,
    eventPicType: EventPicType.TopSmall,
    options: [
      {
        key: SnowOtherOptionKey.MushroomJiYou_1,
        title: "采",
        result: () => ({
          effect: {
            equipments: {
              [EquipmentKey.MushroomJiYou]: 3,
            },
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
    eventPicType: EventPicType.TopSmall,
    options: [
      {
        key: SnowOtherOptionKey.MushroomXiangGu_1,
        title: "采",
        result: () => ({
          effect: {
            equipments: {
              [EquipmentKey.MushroomXiangGu]: 3,
            },
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
    eventPicType: EventPicType.TopSmall,
    options: [
      {
        key: SnowOtherOptionKey.MushroomEGao_1,
        title: "采",
        result: () => ({
          effect: {
            equipments: {
              [EquipmentKey.MushroomEGao]: 3,
            },
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
    eventPicType: EventPicType.TopSmall,
    options: [
      {
        key: SnowOtherOptionKey.MushroomDuYing_1,
        title: "采",
        result: () => ({
          effect: {
            equipments: {
              [EquipmentKey.MushroomDuYing]: 3,
            },
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
    eventPicType: EventPicType.TopSmall,
    options: [
      {
        key: SnowOtherOptionKey.MushroomJianShouQing_1,
        title: "采",
        result: () => ({
          effect: {
            equipments: {
              [EquipmentKey.MushroomJianShouQing]: 3,
            },
          },
        }),
      },
      {
        key: SnowOtherOptionKey.MushroomJianShouQing_2,
        title: "不采",
      },
    ],
  },

  // 物品类
  // 棍子
  {
    key: SnowOtherEventKey.Stick,
    title: "路边有一根削得尖尖的棍子",
    eventType: EventType.Item,
    options: [
      {
        title: "拿",
        key: SnowOtherOptionKey.Stick_1,
        result: () => ({
          effect: {
            equipments: {
              [EquipmentKey.Spear]: 1,
            },
          },
        }),
      },
      {
        title: "不拿",
        key: SnowOtherOptionKey.Stick_2,
      },
    ],
  },

  // 危险类
  // 山体滑坡
  {
    key: SnowOtherEventKey.LandSlide,
    title: "下雨导致山体滑坡！",
    isShow: ({ weather }) => {
      // 只有下雨的时候会出现
      if (weather === Weather.Rain) {
        return true;
      }
      return false;
    },
    eventType: EventType.Danger,
    options: [
      {
        title: "逃跑",
        key: SnowOtherOptionKey.LandSlide_1,
        result: ({ speed }) => {
          const badEnd = {
            effect: {
              endKey: SnowMainEventKey.IceMain_Common_BadEnd,
              endTitle: "跑得太慢了",
            },
          };
          if (speed === Speed.Slow) {
            return badEnd;
          }
          if (speed === Speed.Normal) {
            const ran = Math.random();
            if (ran > 0.5) {
              return badEnd;
            }
          }
          return {
            effect: {
              toast: "锻炼身体是有用的<br/>你幸运的躲过了山体滑坡",
            },
          };
        },
      },
      {
        title: "背包挡住乱石",
        key: SnowOtherOptionKey.LandSlide_2,
        result: ({ equipments }) => {
          const effect: Effect = {
            equipments: {},
          };
          const count = Math.random() > 0.5 ? 3 : 2;
          equipments = equipments.filter((item) => !!item.count);
          const len = equipments.length;
          let toast = `你侥幸躲过了山体滑坡`;

          if (!len) {
            return {
              effect: {
                toast,
              },
            };
            // 如果装备很少的话，只丢一样
          } else if (len <= count) {
            const ran = Math.floor(Math.random() * len);
            effect.equipments![equipments[ran].key] = -1;
          } else {
            // 正常的话就打乱然后丢
            const shuffled = [...equipments];
            for (let i = shuffled.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            shuffled.slice(0, count).forEach((item) => {
              effect.equipments![item.key] = -1;
            });
          }
          toast += "<br/>";
          toast += Object.entries(effect.equipments!)
            .map(([key]) => {
              return `${EQUIPMENTS[key as EquipmentKey].name}丢失了`;
            })
            .join("<br/>");
          return {
            effect: {
              ...effect,
              toast,
            },
          };
        },
      },
      {
        title: "不动",
        key: SnowOtherOptionKey.LandSlide_3,
        result: () => ({
          effect: {
            endKey: SnowMainEventKey.IceMain_Common_BadEnd,
          },
        }),
      },
    ],
  },
  // 冰路
  {
    key: SnowOtherEventKey.IceRoad,
    title: "前方的路被冰覆盖了",
    eventType: EventType.Encounter,
    options: [
      {
        title: "使用冰爪",
        key: SnowOtherOptionKey.IceRoad_1,
        isShow: ({ equipments }) => {
          return !!equipments.find((item) => item.key === EquipmentKey.Crampons)
            ?.count;
        },
        result: () => ({
          effect: {
            toast: "你使用了冰爪，安全的走过了结冰区域",
          },
        }),
      },
      {
        title: "直接上去",
        key: SnowOtherOptionKey.IceRoad_2,
        result: ({ equipments }) => {
          const hasHikingPole = !!equipments.find(
            (item) => item.key === EquipmentKey.HikingPole,
          )?.count;
          const ran = Math.random();
          // 如果有登山杖，40%概率摔倒，没有的话，60%概率摔倒
          const isFall = ran > (hasHikingPole ? 0.6 : 0.4);
          const effect: Effect = {};
          if (isFall) {
            effect.injuried = true;
            effect.san = -10;
          }
          return {
            effect: {
              ...effect,
              toast: `${hasHikingPole ? "你使用了登山杖<br/>" : ""}${isFall ? `${hasHikingPole ? "但你还是摔倒了" : "你摔倒了"}<br/>` : "很幸运，你没有摔倒"}${getToast(effect)}`,
            },
          };
        },
      },
      {
        title: "另找路上去",
        key: SnowOtherOptionKey.IceRoad_3,
        result: () => {
          return {
            effect: {
              distance: -(Math.floor(Math.random() * 2) + 2),
            },
          };
        },
      },
    ],
  },

  // 假敌人事件 对应Poison中的DuYing
];

// 状态类相关事件（第一优先级）
export const STATUS_ICE_EVENTS: GameEvent[] = [
  {
    key: SnowStatusEventKey.Hunger_Before,
    title: "你感觉非常非常的饿",
    isShow: ({ hunger, doneEventKeys }) => {
      if (doneEventKeys.includes(SnowStatusEventKey.Hunger_Before)) {
        return false;
      }
      if (getHungerType(hunger) === Hunger.LowSuar) {
        return true;
      }
      return false;
    },
    options: [
      {
        key: SnowStatusOptionKey.Hunger_Before_1,
        title: "打开背包",
        result: () => ({
          action: {
            bag: true,
          },
        }),
      },
      {
        key: SnowStatusOptionKey.Hunger_Before_1,
        title: "随便吃点什么",
        result: ({ equipments }) => causualEating(equipments),
      },
      {
        key: SnowStatusOptionKey.Hunger_Before_2,
        title: "不管",
      },
    ],
    eventType: EventType.STATUS,
  },
  {
    key: SnowStatusEventKey.Hunger,
    title: "你晕倒了",
    eventPic: PIXEL_PRELOAD.PIXEL_DIZZY,
    eventPicType: EventPicType.DialogSmall,
    isShow: ({ hunger, doneEventKeys }) => {
      if (!doneEventKeys.includes(SnowStatusEventKey.Hunger_Before)) {
        return false;
      }
      if (getHungerType(hunger) === Hunger.LowSuar) {
        return true;
      }
      return false;
    },
    effect: {
      dizzy: true,
      useTime: 120,
      hunger: 50,
      toast: "你晕过去了2个小时<br/>你从背包里翻出了一些饼干屑缓解了饥饿",
    },
    eventType: EventType.STATUS,
  },
];

export const MAIN_ICE_EVENTS: GameEvent[] = [
  {
    key: SnowMainEventKey.IceMain_RestStop_3,
    title: "路遇休息亭",
    eventType: EventType.Main,
    distance: 4,
    options: [
      {
        title: "休息一下",
        key: SnowMainOptionKey.IceMain_RestStop_3_1,
        result: () => ({
          effect: {
            useTime: 30,
          },
        }),
      },
      {
        title: "使用炉子",
        key: SnowMainOptionKey.IceMain_RestStop_3_2,
        result: () => ({
          action: {
            stove: true,
          },
        }),
      },
      {
        title: "不休息",
        key: SnowMainOptionKey.IceMain_RestStop_3_3,
      },
    ],
  },
  {
    key: SnowMainEventKey.IceMain_Icefall_5_5,
    title: "附近有个冰瀑，要去看看吗？",
    eventType: EventType.Main,
    distance: 6.5,
    options: [
      {
        title: "去看看",
        key: SnowMainOptionKey.IceMain_Icefall_5_5_1,
        result: () => ({
          effect: {
            useTime: 30,
            optionPics: {
              type: "full",
              urls: [MAIN_PROLOAD.ICE_FALL],
            },
          },
        }),
      },
      {
        title: "不去看",
        key: SnowMainOptionKey.IceMain_Icefall_5_5_2,
      },
    ],
  },
  {
    key: SnowMainEventKey.IceMain_IceLake_9,
    title: "登顶看到冰湖",
    eventType: EventType.Main,
    distance: 10,
    eventPic: MAIN_PROLOAD.ICE_LAKE,
    eventPicType: EventPicType.FullLarge,
  },
  {
    key: SnowMainEventKey.IceMain_RestStop_15,
    title: "休息亭",
    eventType: EventType.Main,
    distance: 14,
    options: [
      {
        title: "休息一下",
        key: SnowMainOptionKey.IceMain_RestStop_3_1,
        result: () => ({
          effect: {
            useTime: 30,
          },
        }),
      },
      {
        title: "使用炉子",
        key: SnowMainOptionKey.IceMain_RestStop_3_2,
        result: () => ({
          action: {
            stove: true,
          },
        }),
      },
      {
        title: "不休息",
        key: SnowMainOptionKey.IceMain_RestStop_3_3,
      },
    ],
  },
  {
    key: SnowMainEventKey.IceMain_Common_GoodEnd,
    title: "顺利下山",
    distance: 20,
    eventType: EventType.Main,
    isEnd: true,
    eventPic: PIXEL_PRELOAD.PIXEL_HAPPY,
    eventPicType: EventPicType.DialogSmall,
    effect: {
      achievements: [AchievementKey.COMPLETE],
    },
  },
  // 坏结局
  // 你死了
  {
    key: SnowMainEventKey.IceMain_Common_BadEnd,
    title: "你死了",
    eventType: EventType.Main,
    isEnd: true,
    eventPic: PIXEL_PRELOAD.PIXEL_DEAD,
    eventPicType: EventPicType.DialogSmall,
  },
  // 你被逮捕了
  {
    key: SnowMainEventKey.IceMain_Arrest_BadEnd,
    title: "你被逮捕了",
    eventType: EventType.Main,
    isEnd: true,
    eventPic: PIXEL_PRELOAD.PIXEL_ARREST,
    eventPicType: EventPicType.DialogSmall,
  },
];

const causualEating = (equipments: Equipment[]) => {
  const canEatList = equipments.filter(
    (item) =>
      (item.type === EquipmentType.Food || item.type === EquipmentType.DISH) &&
      !!item.count,
  );
  if (canEatList.length === 0) {
    return {
      effect: {
        toast: "没有能吃的东西",
      },
    };
  }
  // 随机出吃哪个东西
  const len = canEatList.length;
  const ran = Math.floor(Math.random() * (len - 1));
  const currentEquipment = canEatList[ran];

  const effect: Effect = {
    equipments: {
      [currentEquipment.key]: -1,
    },
  };

  // 计算出物品减少的toast
  let toast = getToast(effect);
  // 如果物品本身有副作用，计算出副作用拼接
  const equipEffect = EQUIPMENTS[currentEquipment.key].effect;
  if (equipEffect) {
    toast += "<br/>" + getToast(equipEffect);
  }
  return {
    effect: {
      ...effect,
      toast,
    },
  };
};

enum BeastFightAnimal {
  Bear,
  Fox,
}

const BeastFightAnimalMap: {
  [key in BeastFightAnimal]: {
    default: number;
    text: string;
    achievement?: {
      success?: AchievementKey;
      fail?: AchievementKey;
      successNoDamage?: AchievementKey;
      damage?: AchievementKey;
    };
  };
} = {
  [BeastFightAnimal.Bear]: {
    default: 0.4,
    text: "熊",
    achievement: {
      success: AchievementKey.BEAT_BEAR,
      successNoDamage: AchievementKey.BEAT_BEAR_NO_DAMAGE,
      fail: AchievementKey.BEAR_KO,
      damage: AchievementKey.BEAR_DAMAGE,
    },
  },
  [BeastFightAnimal.Fox]: {
    default: 0.6,
    text: "雪狐",
    achievement: {
      success: AchievementKey.BEAT_FOX,
    },
  },
};

const getBeastFightResult = (
  animal: BeastFightAnimal,
  equipments: Equipment[],
) => {
  // 搏斗次数
  const MAX = 4;
  const current = BeastFightAnimalMap[animal];

  // 默认情况
  let side = current.default;
  let weapon;
  // 如果有登山杖的情况下
  const hasHikingPole = equipments.find(
    (item) => item.key === EquipmentKey.HikingPole,
  );
  if (hasHikingPole?.count) {
    // 有登山杖，默认的1.5倍击中几率
    side = 1.5 * side;
    weapon = hasHikingPole?.name;
  }
  // 如果有长矛的情况下
  const hasSpear = equipments.find((item) => item.key === EquipmentKey.Spear);
  if (hasSpear?.count) {
    // 有长矛，默认的1.8倍击中几率
    side = 1.8 * side;
    weapon = hasSpear?.name;
  }
  const youBeat = `你${weapon ? "击中" : "打中"}了${current.text}`;
  const itBeat = `${current.text}打中了你`;
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
  // 生成toast
  const toast = `你${weapon ? `拿起${weapon}` : "赤手空拳"},和${current.text}进行搏斗<br/>${beatStr}`;

  const achievements: AchievementKey[] = [];
  const achi = BeastFightAnimalMap[animal].achievement;
  if (!weapon) {
    achievements.push(AchievementKey.BARE_HANDS);
  }

  // 如果被打中的次数多，则死亡
  if (beHitted > MAX / 2) {
    if (achi?.fail) {
      achievements.push(achi.fail);
    }
    return {
      effect: {
        toast,
        endKey: SnowMainEventKey.IceMain_Common_BadEnd,
        achievements,
      },
    };
  }

  const effect: Effect = {
    equipments: {
      [EquipmentKey.BeastSteak]: add(Math.floor(Math.random() * 3), 2),
    },
  };
  if (beHitted > 0) {
    effect.injuried = true;
  }
  // 效果影响事件
  let effectToast = "";
  const computeToast = getToast(effect);
  if (computeToast) {
    effectToast += `<br/>${computeToast}`;
  }

  if (achi?.success) {
    achievements.push(achi.success);
  }
  if (beHitted === 0) {
    if (achi?.successNoDamage) {
      achievements.push(achi.successNoDamage);
    }
  } else {
    if (achi?.damage) {
      achievements.push(achi.damage);
    }
  }
  return {
    effect: {
      toast: `${toast}${effectToast}`,
      ...effect,
      achievements,
    },
  };
};
