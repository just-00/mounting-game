import { useEffect, useRef } from "react";
import { useEnvironmenStore } from "../environment/store";
import { START_HOUR } from "../environment/type";
import { useStatusStore } from "../status/store";
import { getHungerType, getWarmType, Hunger, Warm } from "../status/type";

// 在游戏中对游戏时间进行定期巡航，来做一些状态的加减
export const useRegularCircultion = () => {
  const preHour = useRef<number>(START_HOUR);

  useEffect(() => {
    const subscribe = useEnvironmenStore.subscribe(
      (state) => ({
        timestamp: state.timestamp,
      }),
      ({ timestamp }) => {
        const hour = timestamp.hour();
        if (hour > preHour.current) {
          preHour.current = hour;
          const {
            hunger,
            warm: originWarm,
            setWarm,
            san: originSan,
            setSan,
            injuried,
          } = useStatusStore.getState();
          const hungerType = getHungerType(hunger);
          let san = originSan;
          let warm = originWarm;

          // 根据受伤，对warm值和san值进行调整
          if (injuried) {
            warm -= 20;
            san -= 20
          }
          const warmType = getWarmType(warm);

          // 根据饥饿值，对san值进行调整
          if (hungerType === Hunger.Starved) {
            san -= 8;
          } else if (hungerType === Hunger.LowSuar) {
            san -= 15;
          } else if (hungerType === Hunger.Full) {
            san += 5;
          }
          // 根据体温值，对san值进行调整
          if (warmType === Warm.Low) {
            san -= 15;
          } else if (warmType === Warm.Hypothermia) {
            san -= 30;
          } else if (warmType === Warm.Normal) {
            san += 2;
          }

          setSan(san);
          setWarm(warm)
        }
      },
    );
    return () => {
      subscribe();
    };
  }, []);
};
