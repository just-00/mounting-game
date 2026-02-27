import { useEnvironmenStore } from "../environment/store";
import type { Weather } from "../environment/type";
import { useEquipmentStore } from "../equipment/store";
import type { Equipment, EquipmentKey } from "../equipment/type";
import type { Option } from "../event/type";
import { useStatusStore } from "../status/store";
import { EQUIPMENTS } from "../equipment/config";
import { Poison, San, SanValue, Speed, Warm, WarmValue } from "../status/type";
import type { AchievementKey } from "../achievement/type";
import { useAchievementStore } from "../achievement/store";
import { useEventStore } from "../event/store";
import { useSettingStore } from "../setting";

export type SelectedEquipmentKeys =
  | "warm"
  | "san"
  | "useTime"
  | "weather"
  | "equipments"
  | "injuried"
  | "hunger"
  | "poison"
  | "achievements"
  | "toast";

type EquipmentValueType =
  | number
  | Weather
  | boolean
  | Poison
  | string
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
  endKey: string;
  endTitle: string;
  achievements: AchievementKey[];
  toast: string;
  optionPics: string[];
};

export type Effect = Partial<ToastTextMap>;

export type Action = {
  stove?: boolean;
};

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
        return `${EQUIPMENTS[key as EquipmentKey].name}${value > 0 ? "增加" : "减少"}了${Math.abs(value)}个`;
      })
      .join("<br/>");
  },
  injuried: (injuried: boolean) => (injuried ? `你受伤了` : ""),
  hunger: (val: number) => `饥饿度提升了${val}`,
  poison: () =>
    `你中毒了<br/>你的精神值降低了<br/>你的体温降低了<br/>你的速度降低了`,
  toast: undefined,
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
  const { setIsStove } = useSettingStore();

  const resetAll = () => {
    resetEnvironmentStore();
    resetEquipmentStore();
    resetEventStore();
    resetStatusStore();
  };
  type Result = Effect & {
    newAchived?: boolean;
  };
  const computeEffect = (
    obj:
      | Option
      | Equipment
      | {
          effect?: Effect;
          action?: Action;
        },
  ): Result => {
    let effect: Effect | undefined = undefined;
    let action: Action | undefined = undefined;
    // 选项有result项，进行计算（Option的情况下）
    // 给行为赋值
    if ("action" in obj && obj.action) {
      action = obj.action;
    }
    if ("result" in obj && obj.result) {
      const result = obj.result(equipments);
      effect = result.effect;
      if (result.action) {
        action = result.action;
      }
    }

    // 选项有effect项（Equipment的情况下）
    else if ("effect" in obj) {
      effect = obj.effect as Effect;
    }

    if (action) {
      if (action.stove) {
        // 使用炉子
        setIsStove(action.stove);
      }
    }

    // 如果没有副作用，直接返回
    if (!effect) {
      return {};
    }

    // 是否有新增成就
    let newAchived: boolean = false;
    // 增加成就
    effect.achievements?.forEach((item) => {
      if (!achieved.includes(item)) {
        newAchived = true;
        addAchieved(item);
      }
    });

    // 通过选项 获得或减少装备
    if (effect.equipments) {
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

    // 如果动态计算出了toast，使用动态计算的
    const toast = effect.toast ?? getToast(effect);
    return { ...effect, toast, newAchived };
  };

  return { computeEffect, resetAll };
};
