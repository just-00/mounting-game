import { create } from "zustand";
import {
  Hunger,
  HungerValue,
  San,
  SanValue,
  Speed,
  Warm,
  WarmValue,
} from "./type";

interface StatusStore {
  // 速度
  // 通过监听totalsize、totalWeight算速度
  speed: Speed;
  // 精神值
  san: number;
  // 体温
  warm: number;
  // 饥饿值
  hunger: number;
  // 手上
  injuried: boolean;
  setSpeed: (speed: Speed) => void;
  setWarm: (warm: number) => void;
  setSan: (san: number) => void;
  setHunger: (hunger: number) => void;
  setInjuried: (injuried: boolean) => void;
}

export const useStatusStore = create<StatusStore>((set) => ({
  speed: Speed.Normal,
  san: SanValue[San.Normal],
  warm: WarmValue[Warm.Normal],
  hunger: HungerValue[Hunger.Full],
  injuried: false,
  setSpeed: (speed: Speed) => {
    set((state) => ({
      ...state,
      speed,
    }));
  },
  setWarm: (warm: number) => {
    set((state) => ({
      ...state,
      warm,
    }));
  },
  setSan: (san: number) => {
    set((state) => ({
      ...state,
      san,
    }));
  },
  setHunger: (hunger: number) => {
    set((state) => ({
      ...state,
      hunger,
    }));
  },
  setInjuried: (injuried: boolean) => {
    set((state) => ({
      ...state,
      injuried,
      speed: injuried ? Speed.Slow : state.speed,
    }));
  },
}));
