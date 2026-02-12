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
  | "equipment"
  | "injuried";

type EquipmentValueType =
  | number
  | Weather
  | boolean
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
  injuried: boolean;
};

export type Effect = {
  useTime?: number;
  warm?: number;
  san?: number;
  weather?: Weather;
  equipment?: {
    [key: string]: number;
  };
  injuried?: boolean;
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
  injuried: (injuried: boolean) => (injuried ? `你受伤了` : ""),
};

// 获取装备使用的toast文案
export const getToast = (eq: Effect) => {
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
  const { warm, san, setSan, setWarm, setInjuried } = useStatusStore();
  const { timestamp, setTimestamp, setWeather } = useEnvironmenStore();
  const { equipments, setEquipmentsCount } = useEquipmentStore();

  const computeEffect = (
    obj: Option & Equipment,
  ): {
    toast?: string;
    endKey?: string;
  } => {
    let result;
    // 选项有result项，进行计算
    if (obj.result) {
      result = obj.result(equipments);
    }

    const effect = result?.effect || obj;

    // 通过选项 获得或减少装备
    if (
      effect.equipment &&
      (effect.equipment as {
        [key: string]: number;
      })
    ) {
      Object.entries(effect.equipment).forEach(([key, value]) => {
        setEquipmentsCount(key, value);
      });
    }

    // 通过选项或装备 增加或减少精神值
    if (effect.san) {
      setSan(san + effect.san);
    }

    // 通过选项或装备，升高或降低体温
    if (effect.warm) {
      setWarm(warm + effect.warm);
    }

    // 通过选项或装备，消耗使用时间
    if (effect.useTime) {
      setTimestamp(timestamp.add(effect.useTime, "minutes"));
    }

    // 通过选项或装备，改变天气
    if (effect.weather) {
      setWeather(effect.weather);
    }

    if (effect.injuried) {
      setInjuried(true);
    }

    // 如果有result，优先返回result
    if (result) {
      if (result.endKey) {
        return { endKey: result.endKey, toast: result.toast };
      }
      return { toast: result.toast };
    }

    // 返回toast供给
    const toast = getToast(effect);
    return { toast };
  };

  return { computeEffect };
};
