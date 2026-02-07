import { create } from "zustand";
import { San, Speed, Temperature } from "./type";

 interface StatusStore {
  // 速度
  speed: Speed;
  // 精神值
  san: San;
  // 身体温度状态
  temperature: Temperature;
}

export const useStatusStore = create<StatusStore>((set) => ({
    speed: Speed.Normal,
    san: San.Fracture,
    temperature: Temperature.Normal,
    setSpeed: (speed: Speed) => {
        set((state) => ({
            ...state,
            speed
        }))
    }
}))