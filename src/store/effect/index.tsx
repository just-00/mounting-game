import { useEnvironmenStore } from "../environment/store";
import type { Weather } from "../environment/type";
import { useEquipmentStore } from "../equipment/store";
import type { Equipment } from "../equipment/type";
import type { Option } from "../event/type";
import { useStatusStore } from "../status/store";
import { EQUIPMENTS } from "../equipment/config";
import { Poison, San, SanValue, Speed, Warm, WarmValue } from "../status/type";
import type { AchievementKey } from "../achievement/type";
import { useAchievementStore } from "../achievement/store";
import { useEventStore } from "../event/store";

export type SelectedEquipmentKeys =
  | "warm"
  | "san"
  | "useTime"
  | "weather"
  | "equipments"
  | "injuried"
  | "hunger"
  | "poison"
  | "achievements";

type EquipmentValueType =
  | number
  | Weather
  | boolean
  | Poison
  | AchievementKey[]
  | {
      [key: string]: number;
    };

type ToastTextMap = {
  useTime: number;
  warm: number;
  san: number;
  weather: Weather;
  equipments: {
    [key: string]: number;
  };
  injuried: boolean;
  hunger: number;
  poison: Poison;
  usedEndKey: string;
  achievements: AchievementKey[];
};

export type Effect = Partial<ToastTextMap>;

// toast中各项对应的计算函数
export const ToastText: {
  [K in SelectedEquipmentKeys]?: (val: ToastTextMap[K]) => string;
} = {
  useTime: (val: number) => `使用了${val}分钟`,
  weather: (val: Weather) => `天气变成${val}了`,
  warm: (val: number) => `体温${val > 0 ? "升高" : "降低"}了${val}°`,
  san: (val: number) => `精神值${val > 0 ? "升高" : "降低"}了${val}`,
  equipments: (val: { [key: string]: number }) => {
    return Object.entries(val)
      .map(([key, value]) => {
        return `${EQUIPMENTS.find((item) => item.key === key)?.name}${value > 0 ? "增加" : "减少"}了${Math.abs(value)}个`;
      })
      .join("<br/>");
  },
  injuried: (injuried: boolean) => (injuried ? `你受伤了` : ""),
  hunger: (val: number) => `饥饿度提升了${val}`,
  poison: () =>
    `你中毒了<br/>你的精神值降低了<br/>你的体温降低了<br/>你的速度降低了`,
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
  const {
    resetStatusStore,
    warm,
    san,
    setSan,
    setWarm,
    setInjuried,
    setPoison,
    addPoison,
    setSpeed,
  } = useStatusStore();
  const { timestamp, setTimestamp, setWeather, resetEnvironmentStore } =
    useEnvironmenStore();
  const { equipments, setEquipmentsCount, resetEquipmentStore } =
    useEquipmentStore();
  const { resetEventStore } = useEventStore();
  const { achieved, addAchieved } = useAchievementStore();

  const resetAll = () => {
    resetEnvironmentStore();
    resetEquipmentStore();
    resetEventStore();
    resetStatusStore();
  };

  const computeEffect = (
    obj: Option & Equipment,
  ): {
    toast?: string;
    endKey?: string;
    endTitle?: string;
    newAchived: boolean;
  } => {
    let result;
    // 选项有result项，进行计算
    if (obj.result) {
      result = obj.result(equipments);
    }

    // 如果没有动态计算结果的话，使用传入值
    const effect = result?.effect || obj;

    let newAchived: boolean = false;

    // 增加成就
    const achievements = result?.achievements || obj.achievements;
    achievements?.forEach((item) => {
      if (!achieved.includes(item)) {
        newAchived = true;
        addAchieved(item);
      }
    });

    // 通过选项 获得或减少装备
    if (
      effect.equipments &&
      (effect.equipments as {
        [key: string]: number;
      })
    ) {
      Object.entries(effect.equipments).forEach(([key, value]) => {
        const current = equipments.find((item) => item.key === key);
        setEquipmentsCount(key, (current?.count || 0) + value);
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

    if (effect.poison) {
      if (effect.poison === Poison.Clear) {
        setPoison([]);
      } else {
        addPoison(effect.poison);
        setSpeed(Speed.Slow);
        setSan(SanValue[San.Fracture]);
        setWarm(WarmValue[Warm.Hypothermia]);
      }
    }

    // 如果有result，优先返回result
    if (result) {
      if (result.endKey) {
        return {
          endKey: result.endKey,
          toast: result.toast,
          newAchived,
          endTitle: result.endTitle,
        };
      }
      return { toast: result.toast, newAchived };
    }

    // 返回toast供给
    const toast = getToast(effect);
    return { toast, newAchived };
  };

  return { computeEffect, resetAll };
};
