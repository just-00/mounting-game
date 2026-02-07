import { create } from "zustand";
import { DEFAULT_DISTANCE, Direction, START_TIME, Time, Weather } from "./type";
import type { Dayjs } from "dayjs";

interface EnvironmentStore {
  weather: Weather;
  time: Time;
  timestamp: Dayjs;
  distance: number | null;
  direction: Direction;
  setWeather: (weather: Weather) => void;
  setNewRandomWeather: () => void;
  setDistance: (d: number) => void;
  setDirection: (direction: Direction) => void
  setTimestamp: (timestamp: Dayjs) => void;
}

const getRandomWeather = () => {
  const ran = Math.random();
  if (ran < 0.8) {
    return Weather.Sun;
  } else if (ran < 0.95) {
    return Weather.Rain;
  } else {
    return Weather.Snow;
  }
};

export const useEnvironmenStore = create<EnvironmentStore>((set) => ({
  weather: getRandomWeather(),
  time: Time.Day,
  distance: DEFAULT_DISTANCE,
  direction: Direction.Up,
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
  setDirection: (direction: Direction ) => {
    set((state) => ({
      ...state,
      direction,
    }));
  },
  setTimestamp: (timestamp: Dayjs) => {
    set((state) => ({
      ...state,
      timestamp,
    }));
  },
}));
