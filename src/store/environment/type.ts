import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

export enum Weather {
  Sun = "Sun",
  Rain = "Rain",
  Snow = "Snow",
}

// 随机生成天气
export const getRandomWeather = (weather?: Weather) => {
  const ran = Math.random();
  if (!weather || weather === Weather.Sun) {
    if (ran < 0.8) {
      return Weather.Sun;
    } else if (ran < 0.95) {
      return Weather.Rain;
    } else {
      return Weather.Snow;
    }
  }
  if (weather === Weather.Rain) {
    if (ran < 0.5) {
      return Weather.Sun;
    } else if (ran < 0.8) {
      return Weather.Rain;
    } else {
      return Weather.Snow;
    }
  }

  if (weather === Weather.Snow) {
    if (ran < 0.3) {
      return Weather.Sun;
    } else if (ran < 0.5) {
      return Weather.Rain;
    } else {
      return Weather.Snow;
    }
  }
  return Weather.Sun
};

export enum Time {
  Day = "Day",
  Dusk = "Dusk",
  Night = "Night",
}

// 随机生成天气
export const getTimeByTimestamp = (timestamp: Dayjs) => {
  const hour = timestamp.hour();
  if (hour < 16) {
    return Time.Day;
  } else if (hour < 19) {
    return Time.Dusk;
  } else {
    return Time.Night;
  }
};

export const START_TIME = dayjs("1995-07-12 08:00");
// 开始的小时
export const START_HOUR = START_TIME.hour()

export const END_TIME = dayjs("1995-07-12 24:00");

export const DEFAULT_DISTANCE = 18;
