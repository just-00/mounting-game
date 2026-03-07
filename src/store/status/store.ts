import { create } from "zustand";
import {
  getSpeed,
  Hunger,
  HungerValue,
  Poison,
  San,
  SanValue,
  Speed,
  Warm,
  WarmValue,
} from "./type";
import { subscribeWithSelector } from "zustand/middleware";
import { useEquipmentStore } from "../equipment/store";

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
  // 晕倒
  dizzy: boolean;
  setSpeed: (speed: Speed) => void;
  setWarm: (warm: number) => void;
  setSan: (san: number) => void;
  setHunger: (hunger: number) => void;
  setInjuried: (injuried: boolean) => void;
  addPoison: (poison: Poison) => void;
  setPoison: (poison: Poison[]) => void;
  resetStatusStore: () => void;
}

const INIT_STORE = {
  speed: Speed.Normal,
  san: SanValue[San.Normal],
  warm: WarmValue[Warm.Normal],
  hunger: HungerValue[Hunger.Full],
  injuried: false,
  poison: [],
  dizzy: false,
};

export const useStatusStore = create<StatusStore>()(
  subscribeWithSelector((set, get) => ({
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
      // 到顶点就固定
      if (warm > WarmValue[Warm.Normal]) {
        warm = WarmValue[Warm.Normal];
      } else if (warm < WarmValue[Warm.Hypothermia]) {
        warm = WarmValue[Warm.Hypothermia];
      }
      set((state) => ({
        ...state,
        warm,
      }));
    },
    setSan: (san: number) => {
      // 到顶点就固定
      if (san > SanValue[San.Normal]) {
        san = SanValue[San.Normal];
      } else if (san < SanValue[San.Fracture]) {
        san = SanValue[San.Fracture];
      }
      set((state) => ({
        ...state,
        san,
      }));
    },
    setHunger: (hunger: number) => {
      const { totalSize, totalWeight } = useEquipmentStore.getState();

      // 根据饥饿值，算出速度
      const speed = getSpeed({
        totalSize,
        totalWeight,
        injuried: get().injuried,
        hunger,
      });
      set((state) => ({
        ...state,
        hunger,
        speed,
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
  })),
);
