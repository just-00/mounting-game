import { ACHIEVEMENT_PRELOAD } from "@/const/ResourceUrl";

export enum AchievementType {
  // 主线类成就
  MAIN = "MAIN",
  // 战斗类成就
  FIGHT = "FIGHT",
  // 菜谱类成就
  RECIEPT = "RECIEPT",
  // 朋友类成就
  FRIENDS = "FRIENDS",
  // 探索类成就
  EXPLORE = "EXPLORE",
  // 收集类
  COLLECT = "COLLECT",
  // 生存类
  SURVIVAL = "SURVIVAL",
  // 环境类
  ENVIRONMENT = "ENVIRONMENT",
}

export type AchievementTypeMapItem = {
  title: string;
  pic: string;
  colors: string[];
};
export const AchievementTypeMap: {
  [key in AchievementType]: AchievementTypeMapItem;
} = {
  [AchievementType.MAIN]: {
    title: "主线",
    pic: ACHIEVEMENT_PRELOAD.MAIN,
    colors: ["#FF7A1A", "#FF9933", "#FFB84D", "#FFD766"],
  },
  [AchievementType.RECIEPT]: {
    title: "菜谱",
    pic: ACHIEVEMENT_PRELOAD.RECIEPT,
    colors: ["#FF4D4D", "#FF6666", "#FF8080", "#FF9999"],
  },
  [AchievementType.FIGHT]: {
    title: "战斗",
    pic: ACHIEVEMENT_PRELOAD.FIGHT,
    colors: ["#8B4513", "#A0522D", "#B66949", "#CC8065"],
  },

  [AchievementType.FRIENDS]: {
    title: "友谊",
    pic: ACHIEVEMENT_PRELOAD.FRIENDS,
    colors: ["#3366FF", "#4D80FF", "#6699FF", "#80B3FF"],
  },
  [AchievementType.EXPLORE]: {
    title: "探索",
    pic: ACHIEVEMENT_PRELOAD.EXPLORE,
    colors: ["#33BFFF", "#4DCCFF", "#66D9FF", "#80E6FF"],
  },
  [AchievementType.COLLECT]: {
    title: "收集",
    pic: ACHIEVEMENT_PRELOAD.COLLECT,
    colors: ["#BF66FF", "#CC80FF", "#D999FF", "#E6B3FF"],
  },
  [AchievementType.SURVIVAL]: {
    title: "生存",
    pic: ACHIEVEMENT_PRELOAD.SURVIVAL,
    colors: ["#FF4D94", "#FF66A8", "#FF80BC", "#FF99D0"],
  },
  [AchievementType.ENVIRONMENT]: {
    title: "环境",
    pic: ACHIEVEMENT_PRELOAD.ENVIRONMENT,
    colors: ["#5BBF33", "#7ACC4D", "#99D966", "#B8E680"],
  },
};
// ["#404040", "#666666", "#888888", "#AAAAAA"]

export enum AchievementKey {
  // 主线
  // 冰瀑
  ICE_FALL = "ICE_FALL",
  ICE_LAKE = "ICE_LAKE",
  COMPLETE = "COMPLETE",

  // 战斗
  // 打败熊
  BEAT_BEAR = "BEAT_BEAR",
  // 无伤打败熊
  BEAT_BEAR_NO_DAMAGE = "BEAT_BEAR_NO_DAMAGE",
  // 被熊伤
  BEAR_DAMAGE = "BEAR_DAMAGE",
  // 被熊打败
  BEAR_KO = "BEAR_KO",
  // 打败雪狐
  BEAT_FOX = "BEAT_FOX",

  // 无武器战斗
  BARE_HANDS = "BARE_HANDS",

  // 菜谱
  // 第一道菜
  FIRST_RECIEPT = "FIRST_RECIEPT",
  // 早餐锅
  BREAKFAST = "BREAKFAST",
  // 有毒的菜品
  POISON_DISH = "POISON_DISH",
  // 吃了湿腻焦糊
  EWW = "EWW",

  // 朋友
  // 和小狗做朋友
  FRIENDS_DOG = "FRIENDS_DOG",

  // 探索
  // 泡温泉
  SPRING_POT = "SPRING_POT",

  // 收集
  // 有毒蘑菇
  POISON_MUSHROOM = "POISON_MUSHROOM",

  // 生存类
  // 雪夜
  SNOW_NIGHT = "SNOW_NIGHT",

  // 环境
  LITTERING = "LITTERING",
  PROTECTER = "PROTECTER",
}

export interface Achievement {
  title: string;
  key: AchievementKey;
  desc: string;
  type: AchievementType;
  isDone?: boolean;
}
export const ACHIEVEMENTS: Achievement[] = [
  // 主线类
  {
    title: "哇！冰瀑！",
    key: AchievementKey.ICE_FALL,
    desc: "邂逅冰瀑的绝美瞬间",
    type: AchievementType.MAIN,
  },
  {
    title: "山顶绝景",
    key: AchievementKey.ICE_LAKE,
    desc: "登顶看到冰湖",
    type: AchievementType.MAIN,
  },
  {
    title: "圆满完成",
    key: AchievementKey.COMPLETE,
    desc: "顺利完成一次爬山",
    type: AchievementType.MAIN,
  },
  // 战斗类
  {
    title: "熊口制胜",
    key: AchievementKey.BEAT_BEAR,
    desc: "拿下森林熊的首胜",
    type: AchievementType.FIGHT,
  },
  {
    title: "无伤驯熊",
    key: AchievementKey.BEAT_BEAR_NO_DAMAGE,
    desc: "零损伤拿捏森林熊",
    type: AchievementType.FIGHT,
  },
  {
    title: "熊爪留痕",
    key: AchievementKey.BEAR_DAMAGE,
    desc: "与熊缠斗挂了彩",
    type: AchievementType.FIGHT,
  },
  {
    title: "折戟熊口",
    key: AchievementKey.BEAR_KO,
    desc: "栽在灰熊的熊掌下",
    type: AchievementType.FIGHT,
  },
  {
    title: "徒手制兽",
    key: AchievementKey.BARE_HANDS,
    desc: "空拳打赢野兽的狠人",
    type: AchievementType.FIGHT,
  },
  // 菜谱类
  {
    title: "山野厨神",
    key: AchievementKey.FIRST_RECIEPT,
    desc: "完成第一道菜谱",
    type: AchievementType.RECIEPT,
  },
  {
    title: "太丰盛了",
    key: AchievementKey.BREAKFAST,
    desc: "做出了早餐锅",
    type: AchievementType.RECIEPT,
  },
  {
    title: "不能吃吧...？",
    key: AchievementKey.POISON_DISH,
    desc: "做出了有毒的料理",
    type: AchievementType.RECIEPT,
  },
  {
    title: "呕",
    key: AchievementKey.EWW,
    desc: "吃了湿腻焦糊",
    type: AchievementType.RECIEPT,
  },
  // 朋友类
  {
    title: "汪！",
    key: AchievementKey.FRIENDS_DOG,
    desc: "和小狗贴贴",
    type: AchievementType.FRIENDS,
  },
  // 探索类
  {
    title: "泡得暖暖的",
    key: AchievementKey.SPRING_POT,
    desc: "泡进热乎乎的温泉里",
    type: AchievementType.EXPLORE,
  },
  // 收集类
  {
    title: "要不尝尝？",
    key: AchievementKey.POISON_MUSHROOM,
    desc: "采到颜色不对劲的蘑菇",
    type: AchievementType.COLLECT,
  },
  // 生存类
  {
    title: "雪夜独行",
    key: AchievementKey.SNOW_NIGHT,
    desc: "如果在冬夜，一个旅人",
    type: AchievementType.SURVIVAL,
  },
  // 环境类
  {
    title: "这是不好的",
    key: AchievementKey.LITTERING,
    desc: "在路上乱扔垃圾",
    type: AchievementType.ENVIRONMENT,
  },
  {
    title: "环境卫士",
    key: AchievementKey.PROTECTER,
    desc: "途中没有使用任何塑料制品",
    type: AchievementType.ENVIRONMENT,
  },
];

export type TypeAchievementItem = {
  value: Achievement[];
  doneCount: number;
};

export const getTypedAchievements: (achievements: AchievementKey[]) => {
  [key in AchievementType]: TypeAchievementItem;
} = (achievements) => {
  return ACHIEVEMENTS.reduce(
    (total, current) => {
      if (!total[current.type]) {
        total[current.type] = {
          value: [],
          doneCount: 0,
        };
      }
      const isDone = achievements.includes(current.key);
      total[current.type].value.push({
        ...current,
        isDone,
      });
      if (isDone) {
        total[current.type].doneCount++;
      }
      return total;
    },
    {} as {
      [key in AchievementType]: {
        value: Achievement[];
        doneCount: number;
      };
    },
  );
};
