import { create } from "zustand";
import {
  getRandomWeather,
  getTimeByTimestamp,
  START_HOUR,
  START_TIME,
  Time,
  Weather,
  WEATHER_DAY_CONFIG,
} from "./type";
import type { Dayjs } from "dayjs";
import { subscribeWithSelector } from "zustand/middleware";
import { useStatusStore } from "../status/store";

interface EnvironmentStore {
  weather: Weather;
  hourWeather: number;
  time: Time;
  timestamp: Dayjs;
  distance: number;
  // 每小时预定可以爬多少distance
  averageDistancePerHour: number;
  setWeather: (weather: Weather) => void;
  // 执行天气改变时的副作用
  setWeatherEffect: (weather: Weather) => void;
  setDistance: (d: number) => void;
  setTimestamp: (timestamp: Dayjs) => void;
  setAverageDistancePerHour: (averageDistancePerHour: number) => void;
  resetEnvironmentStore: () => void;
}

const INIT_STORE = {
  weather: getRandomWeather(),
  // 随机生成天气的当前小时数
  // 目前逻辑：最开始是8，每过两小时生成一次天气，并更新为10
  hourWeather: START_HOUR,
  // 无初始距离，在选取路线后初始
  // WIP 测试方便
  distance: 0,
  // WIP 测试方便
  averageDistancePerHour: 2.5,
  time: Time.Day,
  timestamp: START_TIME,
};

export const useEnvironmenStore = create<EnvironmentStore>()(
  subscribeWithSelector((set, get) => ({
    ...INIT_STORE,
    resetEnvironmentStore: () => {
      set(() => ({
        ...INIT_STORE,
      }));
    },
    setWeather: (weather: Weather) => {
      get().setWeatherEffect(weather);
      set((state) => ({
        ...state,
        weather,
      }));
    },
    setWeatherEffect: (weather: Weather) => {
      const { warm, setWarm, san, setSan } = useStatusStore.getState();
      const time = get().time;
      const preWeather = get().weather;
      // 根据配置看增减多少
      const config = WEATHER_DAY_CONFIG[weather]?.[preWeather]?.[time];
      if (config) {
        const { sanChange, warmChange } = config;
        setSan(san + sanChange);
        setWarm(warm + warmChange);
      }
    },
    setDistance: (distance: number) => {
      set((state) => ({
        ...state,
        distance,
      }));
    },
    setTimestamp: (timestamp: Dayjs) => {
      const hour = timestamp.hour();
      let weather = get().weather;
      let hourWeather = get().hourWeather;
      // 如果距离上次更新天气已经过去2小时，则更新
      if (hour >= hourWeather + 2) {
        hourWeather += 2;
        weather = getRandomWeather(weather);
        get().setWeatherEffect(weather);
      }
      set((state) => ({
        ...state,
        weather,
        hourWeather,
        // 根据timestamp计算当前的time（白天 / 黄昏 / 夜晚...）
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
  })),
);
