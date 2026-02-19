export enum AchievementType {
  // 菜谱类成就
  Reciept = "Reciept",
  // 战斗类成就
  Fight = "Fight",
  // 主线类成就
  Main = "Main",
  // 食物类成就
  Food = "Food",
}

export const AchievementTypeMap: {
  [key in AchievementType]: {
    title: string;
    pic: string;
  };
} = {
  [AchievementType.Reciept]: {
    title: "菜谱",
    pic: "",
  },
  [AchievementType.Fight]: {
    title: "战斗",
    pic: "",
  },
  [AchievementType.Main]: {
    title: "主线",
    pic: "",
  },
  [AchievementType.Food]: {
    title: "食物",
    pic: "",
  },
};

export enum AchievementKey {
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
}

export interface Achievement {
  title: string;
  key: AchievementKey;
  desc: string;
  type: AchievementType;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: "击败灰熊",
    key: AchievementKey.BEAT_BEAR,
    desc: "成功击败森林中的灰熊",
    type: AchievementType.Fight,
  },
  {
    title: "无伤制熊",
    key: AchievementKey.BEAT_BEAR_NO_DAMAGE,
    desc: "在未受到任何伤害的情况下击败灰熊",
    type: AchievementType.Fight,
  },
  {
    title: "熊爪之痕",
    key: AchievementKey.BEAR_DAMAGE,
    desc: "在与灰熊的战斗中受到了伤害",
    type: AchievementType.Fight,
  },
  {
    title: "折戟熊口",
    key: AchievementKey.BEAR_KO,
    desc: "在与灰熊的战斗中被击败",
    type: AchievementType.Fight,
  },
  {
    title: "赤手空拳",
    key: AchievementKey.BARE_HANDS,
    desc: "未使用任何武器完成与野兽的战斗",
    type: AchievementType.Fight,
  },
];

export const getTypedAchievements: () => {
  [key in AchievementType]: Achievement[];
} = () => {
  return ACHIEVEMENTS.reduce((total, current) => {
    if (!total[current.type]) {
      total[current.type] = [];
    }
    total[current.type].push(current);
    return total;
  }, {} as { [key in AchievementType]: Achievement[] });
};