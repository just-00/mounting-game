import { create } from "zustand";
import { getRandomWeather, getTimeByTimestamp, START_TIME, Time, Weather } from "./type";
import type { Dayjs } from "dayjs";

interface EnvironmentStore {
  weather: Weather;
  time: Time;
  timestamp: Dayjs;
  distance: number;
  // 每小时预定可以爬多少distance
  averageDistancePerHour: number;
  setWeather: (weather: Weather) => void;
  setNewRandomWeather: () => void;
  setDistance: (d: number) => void;
  setTimestamp: (timestamp: Dayjs) => void;
  setAverageDistancePerHour: (averageDistancePerHour: number) => void;
}

export const useEnvironmenStore = create<EnvironmentStore>((set) => ({
  weather: getRandomWeather(),
  // 无初始距离，在选取路线后初始
  // WIP 测试方便
  distance: 0,
  // WIP 测试方便
  averageDistancePerHour: 2.5,
  time: Time.Day,
  timestamp: START_TIME,
  setWeather: (weather: Weather) => {
    set((state) => ({
      ...state,
      weather,
    }));
  },
  setNewRandomWeather: () => {
    set((state) => ({
      ...state,
      weather: getRandomWeather(),
    }));
  },
  setDistance: (distance: number) => {
    set((state) => ({
      ...state,
      distance,
    }));
  },
  setTimestamp: (timestamp: Dayjs) => {
    set((state) => ({
      ...state,
      // 根据timestamp计算当前的time（白天 / 黄昏 / 夜晚..）
      time: getTimeByTimestamp(timestamp),
      timestamp,
    }));
  },
  setAverageDistancePerHour: (averageDistancePerHour: number) => {
    set((state) => ({
      ...state,
      averageDistancePerHour,
    }));
  },
}));
