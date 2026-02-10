import { create } from "zustand";
import { San, Speed, Temperature } from "./type";

interface StatusStore {
  // 速度
  // 通过监听totalsize、totalWeight算速度
  speed: Speed;
  // 精神值
  san: San;
  // 体温
  temperature: Temperature;
  setSpeed: (speed: Speed) => void;
}

export const useStatusStore = create<StatusStore>((set) => ({
  speed: Speed.Normal,
  san: San.Fracture,
  temperature: Temperature.Normal,
  setSpeed: (speed: Speed) => {
    set((state) => ({
      ...state,
      speed,
    }));
  },
}));
