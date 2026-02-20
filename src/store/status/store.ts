import { create } from "zustand";
import {
  Hunger,
  HungerValue,
  Poison,
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
  // 受伤
  injuried: boolean;
  // 中毒
  poison: Poison[];
  setSpeed: (speed: Speed) => void;
  setWarm: (warm: number) => void;
  setSan: (san: number) => void;
  setHunger: (hunger: number) => void;
  setInjuried: (injuried: boolean) => void;
  addPoison: (poison: Poison) => void;
  setPoison: (poison: Poison[]) => void;
  resetStatusStore: () => void
}

const INIT_STORE = {
  speed: Speed.Normal,
  san: SanValue[San.Normal],
  warm: WarmValue[Warm.Normal],
  hunger: HungerValue[Hunger.Full],
  injuried: false,
  poison: [],
};

export const useStatusStore = create<StatusStore>((set) => ({
  ...INIT_STORE,
  resetStatusStore: () => {
    set({
      ...INIT_STORE,
    });
  },
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
  addPoison: (poison: Poison) => {
    set((state) => ({
      ...state,
      poison: state.poison.concat(poison),
    }));
  },
  setPoison: (poison: Poison[]) => {
    set((state) => ({
      ...state,
      poison,
    }));
  },
}));
