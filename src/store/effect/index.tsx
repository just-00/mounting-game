import { mul } from "@/utils/number";
import { useEnvironmenStore } from "../environment/store";
import type { Weather } from "../environment/type";
import { useEquipmentStore } from "../equipment/store";
import type { Equipment } from "../equipment/type";
import type { Option } from "../event/type";
import { useStatusStore } from "../status/store";
import { EQUIPMENTS } from "../equipment/config";

export type SelectedEquipmentKeys =
  | "warm"
  | "san"
  | "useTime"
  | "weather"
  | "equipment";

type EquipmentValueType =
  | number
  | Weather
  | {
      [key: string]: number;
    };

type ToastTextMap = {
  useTime: number;
  warm: number;
  san: number;
  weather: Weather;
  equipment: {
    [key: string]: number;
  };
};

// toast中各项对应的计算函数
export const ToastText: {
  [K in SelectedEquipmentKeys]: (val: ToastTextMap[K]) => string;
} = {
  useTime: (val: number) => `使用了${mul(val, 60)}分钟`,
  weather: (val: Weather) => `天气变成${val}了`,
  warm: (val: number) => `体温${val > 0 ? "升高" : "降低"}了${val}°`,
  san: (val: number) => `精神值${val > 0 ? "升高" : "降低"}了${val}`,
  equipment: (val: { [key: string]: number }) => {
    return Object.entries(val)
      .map(([key, value]) => {
        return `${EQUIPMENTS.find((item) => item.key === key)?.name}${value > 0 ? "增加" : "减少"}了${value}个`;
      })
      .join("<br/>");
  },
};

// 获取装备使用的toast文案
export const getToast = (eq: Option & Equipment) => {
  const keys = Object.keys(ToastText) as SelectedEquipmentKeys[];
  return keys
    .map((item) => {
      // 找到eq中对应的项目
      const value = eq[item];
      if (value === undefined) return "";
      // 产出toast
      const text = (ToastText[item] as (val: EquipmentValueType) => string)(
        value,
      );
      return text;
    })
    .filter((item) => !!item)
    .join("<br/>");
};

// 使用装备、点击选项时，计算效果和产出toast
export const useGameEffect = () => {
  const { warm, san, setSan, setWarm } = useStatusStore();
  const { timestamp, setTimestamp, setWeather } = useEnvironmenStore();
  const { setEquipmentsCount } = useEquipmentStore();

  const computeEffect = (obj: Option & Equipment) => {
    // 通过选项 获得或减少装备
    if (
      obj.equipment &&
      (obj.equipment as {
        [key: string]: number;
      })
    ) {
      Object.entries(obj.equipment).forEach(([key, value]) => {
        setEquipmentsCount(key, value);
      });
    }

    // 通过选项或装备 增加或减少精神值
    if (obj.san) {
      setSan(san + obj.san);
    }

    // 通过选项或装备，升高或降低体温
    if (obj.warm) {
      setWarm(warm + obj.warm);
    }

    // 通过选项或装备，消耗使用时间
    if (obj.useTime) {
      setTimestamp(timestamp.add(obj.useTime, "minutes"));
    }

    // 通过选项或装备，改变天气
    if (obj.weather) {
      setWeather(obj.weather);
    }

    // 返回toast供给
    const toast = getToast(obj);
    return toast;
  };

  return { computeEffect };
};
