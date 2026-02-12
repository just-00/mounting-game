import { EQUIPMENT_MAX_SIZE, EQUIPMENT_MAX_WEIGHT } from "../equipment/config";

// 速度
export enum Speed {
  Fast = "Fast",
  Normal = "Normal",
  Slow = "Slow",
}

// 每种Speed对应的速度
export const SpeedValue = {
  [Speed.Fast]: 1.2,
  [Speed.Normal]: 1,
  [Speed.Slow]: 0.8,
};

// 计算速度类型
export const getSpeed = ({
  totalSize,
  totalWeight,
}: {
  totalSize: number;
  totalWeight: number;
}) => {
  if (totalSize > EQUIPMENT_MAX_SIZE || totalWeight > EQUIPMENT_MAX_WEIGHT) {
    return Speed.Slow;
  }
  if (
    totalSize < EQUIPMENT_MAX_SIZE / 2 ||
    totalWeight < EQUIPMENT_MAX_WEIGHT / 2
  ) {
    return Speed.Fast;
  }
  return Speed.Normal;
};

// 精神值
export enum San {
  // 癫狂
  Fracture = "Fracture",
  // 不稳定
  Unstable = "Unstable",
  Normal = "Normal",
}

// 每种精神值对应的数值
export const SanValue = {
  [San.Normal]: 0,
  [San.Unstable]: 10,
  [San.Fracture]: 20,
};

// 计算精神类型
export const getSan = (san: number) => {
  if (san < SanValue[San.Unstable]) {
    return San.Normal;
  }
  if (san < SanValue[San.Fracture]) {
    return San.Unstable;
  }
  return San.Fracture;
};

// 体温
export enum Warm {
  // 失温
  Hypothermia = "Hypothermia",
  Low = "Low",
  Normal = "Normal",
}

// 每种体温对应的数值
export const WarmValue = {
  [Warm.Normal]: 30,
  [Warm.Low]: 20,
  [Warm.Hypothermia]: 10,
};

// 计算体温类型
export const getWarm = (warm: number) => {
  if (warm < WarmValue[Warm.Hypothermia]) {
    return Warm.Hypothermia;
  }
  if (warm < WarmValue[Warm.Low]) {
    return Warm.Low;
  }
  return Warm.Normal;
};

// 饥饿
// 体温
export enum Hunger {
  // 饱腹
  Full = "Full",
  // 饥饿
  Starved = "Starved",
}

// 每种饥饿对应的数值
export const HungerValue = {
  [Hunger.Full]: 100,
  [Hunger.Starved]: 50,
};

// 计算饥饿类型
export const getHunger = (hunger: number) => {
  if (hunger > HungerValue[Hunger.Starved]) {
    return Hunger.Full;
  }
  return Hunger.Starved;
};
