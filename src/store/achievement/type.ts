export enum AchievementType {
  // 主线类成就
  Main = "Main",
  // 战斗类成就
  Fight = "Fight",
  // 菜谱类成就
  Reciept = "Reciept",
  // 朋友类成就
  FRIENDS = "FRIENDS",
  // 探索类成就
  EXPLORE = "EXPLORE",
  // 收集类
  COLLECT = "COLLECT",
  // 生存类
  SURVIVAL = "SURVIVAL",
}

export type AchievementTypeMapItem = {
  title: string;
  pic: string;
  colors: string[];
};
export const AchievementTypeMap: {
  [key in AchievementType]: AchievementTypeMapItem;
} = {
  [AchievementType.Main]: {
    title: "主线",
    pic: "https://raw.githubusercontent.com/just-00/game-image-cdn/main/c9780ed3d83049958dacde4412d97da1.jpeg~tplv-a9rns2rl98-image_raw_b.png",
    colors: ["#FF7A1A", "#FF9933", "#FFB84D", "#FFD766"],
  },
  [AchievementType.Reciept]: {
    title: "菜谱",
    pic: "https://raw.githubusercontent.com/just-00/game-image-cdn/main/59d3a41fadbb4e9c929dc03273c20d7d.jpeg~tplv-a9rns2rl98-image_raw_b.png",
    colors: ["#FF4D4D", "#FF6666", "#FF8080", "#FF9999"],
  },
  [AchievementType.Fight]: {
    title: "战斗",
    pic: "https://raw.githubusercontent.com/just-00/game-image-cdn/main/43105e17180947cb887aebda94c85a00.jpeg~tplv-a9rns2rl98-image_raw_b.png",
    colors: ["#5BBF33", "#7ACC4D", "#99D966", "#B8E680"],
  },

  [AchievementType.FRIENDS]: {
    title: "友谊",
    pic: "https://raw.githubusercontent.com/just-00/game-image-cdn/main/44af210669884bb89e5e57db153aacc2.jpeg~tplv-a9rns2rl98-image_raw_b.png",
    colors: ["#3366FF", "#4D80FF", "#6699FF", "#80B3FF"],
  },
  [AchievementType.EXPLORE]: {
    title: "探索",
    pic: "https://raw.githubusercontent.com/just-00/game-image-cdn/main/e0927317ab7c4561866690fbc22b143b.jpeg~tplv-a9rns2rl98-image_raw_b.png",
    colors: ["#33BFFF", "#4DCCFF", "#66D9FF", "#80E6FF"],
  },
  [AchievementType.COLLECT]: {
    title: "收集",
    pic: "https://raw.githubusercontent.com/just-00/game-image-cdn/main/58d1b7ef63ab4e97af80aead69d42d0f.jpeg~tplv-a9rns2rl98-image_raw_b.png",
    colors: ["#BF66FF", "#CC80FF", "#D999FF", "#E6B3FF"],
  },
  [AchievementType.SURVIVAL]: {
    title: "生存",
    pic: "https://raw.githubusercontent.com/just-00/game-image-cdn/main/76ed75a052fa40bcbbc646856109a8c6.jpeg%7Etplv-a9rns2rl98-image_raw_b.png",
    colors: ["#FF4D94", "#FF66A8", "#FF80BC", "#FF99D0"],
  },
};
// ["#404040", "#666666", "#888888", "#AAAAAA"]
// ["#8B4513", "#A0522D", "#B66949", "#CC8065"]

export enum AchievementKey {
  // 菜谱
  // 第一道菜
  FIRST_RECIEPT = "FIRST_RECIEPT",

  // 战斗
  // 打败熊
  BEAT_BEAR = "BEAT_BEAR",
  // 无伤打败熊
  BEAT_BEAR_NO_DAMAGE = "BEAT_BEAR_NO_DAMAGE",
  // 被熊伤
  BEAR_DAMAGE = "BEAR_DAMAGE",
  // 被熊打败
  BEAR_KO = "BEAR_KO",
  // 无武器战斗
  BARE_HANDS = "BARE_HANDS",

  // 主线
  // 冰瀑
  ICE_FALL = "ICE_FALL",

  // 友谊
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
}

export interface Achievement {
  title: string;
  key: AchievementKey;
  desc: string;
  type: AchievementType;
  isDone?: boolean;
}
export const ACHIEVEMENTS: Achievement[] = [
  {
    title: "哇！冰瀑！",
    key: AchievementKey.ICE_FALL,
    desc: "邂逅冰瀑的绝美瞬间",
    type: AchievementType.Main,
  },
  {
    title: "熊口制胜",
    key: AchievementKey.BEAT_BEAR,
    desc: "拿下森林熊的首胜",
    type: AchievementType.Fight,
  },
  {
    title: "无伤驯熊",
    key: AchievementKey.BEAT_BEAR_NO_DAMAGE,
    desc: "零损伤拿捏森林熊",
    type: AchievementType.Fight,
  },
  {
    title: "熊爪留痕",
    key: AchievementKey.BEAR_DAMAGE,
    desc: "与熊缠斗挂了彩",
    type: AchievementType.Fight,
  },
  {
    title: "折戟熊口",
    key: AchievementKey.BEAR_KO,
    desc: "栽在灰熊的熊掌下",
    type: AchievementType.Fight,
  },
  {
    title: "徒手制兽",
    key: AchievementKey.BARE_HANDS,
    desc: "空拳打赢野兽的狠人",
    type: AchievementType.Fight,
  },
  {
    title: "山野厨神",
    key: AchievementKey.FIRST_RECIEPT,
    desc: "完成第一道菜谱",
    type: AchievementType.Reciept,
  },
  {
    title: "汪！",
    key: AchievementKey.FRIENDS_DOG,
    desc: "和小狗贴贴",
    type: AchievementType.FRIENDS,
  },
  {
    title: "泡得暖暖的",
    key: AchievementKey.SPRING_POT,
    desc: "泡进热乎乎的温泉里",
    type: AchievementType.EXPLORE,
  },
  {
    title: "要不尝尝？",
    key: AchievementKey.POISON_MUSHROOM,
    desc: "采到颜色不对劲的蘑菇",
    type: AchievementType.COLLECT,
  },
  {
    title: "雪夜独行",
    key: AchievementKey.SNOW_NIGHT,
    desc: "如果在冬夜，一个旅人",
    type: AchievementType.SURVIVAL,
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
