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
  return Weather.Sun;
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
export const START_HOUR = START_TIME.hour();

export const END_TIME = dayjs("1995-07-12 24:00");

export const DEFAULT_DISTANCE = 18;

interface WeatherEffect {
  sanChange: number;
  warmChange: number;
}

// 结构
// 按当前天气 -> 之前天气 -> 时间段 -> 影响
type WeatherEffectConfig = {
  [current in Weather]?: {
    [prev in Weather]?: {
      [time in Time]?: WeatherEffect;
    };
  };
};
export const WEATHER_DAY_CONFIG: WeatherEffectConfig = {
  [Weather.Rain]: {
    [Weather.Sun]: {
      // 晴转雨
      [Time.Day]: { sanChange: -10, warmChange: -10 },
      [Time.Dusk]: { sanChange: -15, warmChange: -15 },
      [Time.Night]: { sanChange: -20, warmChange: -20 },
    },
    [Weather.Rain]: {
      // 持续雨
      [Time.Day]: { sanChange: -5, warmChange: -10 },
      [Time.Dusk]: { sanChange: -10, warmChange: -15 },
      [Time.Night]: { sanChange: -15, warmChange: -20 },
    },
    [Weather.Snow]: {
      // 雪转雨
      [Time.Day]: { sanChange: -8, warmChange: -12 },
      [Time.Dusk]: { sanChange: -12, warmChange: -17 },
      [Time.Night]: { sanChange: -18, warmChange: -22 },
    },
  },
  [Weather.Sun]: {
    [Weather.Sun]: {
      // 持续晴
      [Time.Day]: { sanChange: 5, warmChange: 10 },
      [Time.Dusk]: { sanChange: 2, warmChange: 5 },
      [Time.Night]: { sanChange: 0, warmChange: 0 },
    },
    [Weather.Rain]: {
      // 雨转晴
      [Time.Day]: { sanChange: 15, warmChange: 10 },
      [Time.Dusk]: { sanChange: 10, warmChange: 5 },
      [Time.Night]: { sanChange: 5, warmChange: 0 },
    },
    [Weather.Snow]: {
      // 雪转晴
      [Time.Day]: { sanChange: 20, warmChange: 15 }, // 雪后初晴，开心
      [Time.Dusk]: { sanChange: 15, warmChange: 10 },
      [Time.Night]: { sanChange: 10, warmChange: 5 },
    },
  },
  [Weather.Snow]: {
    [Weather.Sun]: {
      // 晴转雪
      [Time.Day]: { sanChange: 8, warmChange: -15 }, // 初雪高兴，但冷
      [Time.Dusk]: { sanChange: 5, warmChange: -20 },
      [Time.Night]: { sanChange: 2, warmChange: -25 },
    },
    [Weather.Rain]: {
      // 雨转雪
      [Time.Day]: { sanChange: 5, warmChange: -15 }, // 雨变雪，稍兴奋但更冷
      [Time.Dusk]: { sanChange: 3, warmChange: -20 },
      [Time.Night]: { sanChange: 0, warmChange: -25 },
    },
    [Weather.Snow]: {
      // 持续雪
      [Time.Day]: { sanChange: -5, warmChange: -15 }, // 持续下雪，不再高兴
      [Time.Dusk]: { sanChange: -10, warmChange: -20 },
      [Time.Night]: { sanChange: -15, warmChange: -25 },
    },
  },
};
