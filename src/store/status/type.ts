import { EQUIPMENT_MAX_SIZE, EQUIPMENT_MAX_WEIGHT } from "../equipment/config";

export enum Speed {
  Fast = "Fast",
  Normal = "Normal",
  Slow = "Slow",
}

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

export enum San {
  // 癫狂
  Fracture = "Fracture",
  // 不稳定
  Unstable = "Unstable",
  Normal = "Normal",
}

export enum Temperature {
  // 失温
  Hypothermia = "Hypothermia",
  Low = "Low",
  Normal = "Normal",
}
