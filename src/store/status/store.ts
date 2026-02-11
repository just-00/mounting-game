import { create } from "zustand";
import { San, SanValue, Speed, Warm, WarmValue } from "./type";

interface StatusStore {
  // 速度
  // 通过监听totalsize、totalWeight算速度
  speed: Speed;
  // 精神值
  san: number;
  // 体温
  warm: number;
  setSpeed: (speed: Speed) => void;
  setWarm: (warm: number) => void;
  setSan: (warm: number) => void
}

export const useStatusStore = create<StatusStore>((set) => ({
  speed: Speed.Normal,
  san: SanValue[San.Normal],
  warm: WarmValue[Warm.Normal],
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
}));
