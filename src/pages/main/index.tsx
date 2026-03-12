import "./index.scss";
import { Bird } from "@/components/bird/bird";
import { GameDialog } from "./components/dialog";
import { Outlet, useLocation } from "react-router-dom";
import { MainPannel } from "@/components/pannel-item";
import { Stove } from "@/components/stove";
import { useSettingStore } from "@/store/setting";
import { useEffect, useState } from "react";
import { useAchievementStore } from "@/store/achievement/store";
import { AchievementToast } from "@/components/achievement-toast";
import { useEnvironmenStore } from "@/store/environment/store";
import { MAIN_PROLOAD } from "@/const/ResourceUrl";
import { useSpeedSubscribe } from "@/store/storeRelations/speed";
import { useRegularCircultion } from "@/store/storeRelations/regularCirculation";
import { SnowBk } from "./components/snow-bk";
import { Weather } from "@/store/environment/type";
import { RainBk } from "./components/rain-bk";
import { SunBk } from "./components/sun-bk";
import { FadeBackground } from "./components/fade-background";

const Main = () => {
  const isStove = useSettingStore().isStove;
  const [newAchieved, setNewAchieved] = useState<boolean>(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const { weather, time } = useEnvironmenStore();

  // 监听速度的改变
  useSpeedSubscribe();
  // 定期巡航对san值进行加减
  useRegularCircultion();

  // 根据天气+时间出背景
  const bk = MAIN_PROLOAD[`${weather}_${time}_BK` as keyof typeof MAIN_PROLOAD];
  // 监听是否有新成就提示
  useEffect(() => {
    const subscribe = useAchievementStore.subscribe(
      (state) => ({
        newAchieved: state.newAchieved,
      }),
      ({ newAchieved: originNewAchieved }) => {
        setNewAchieved(originNewAchieved);
      },
    );
    return () => {
      subscribe();
    };
  }, []);

  const isSun = weather === Weather.Sun;
  const isSnow = weather === Weather.Snow;
  const isRain = weather === Weather.Rain;
  return (
    <section className="mainPage">
      <FadeBackground bk={bk} />
      <div
        className="shade"
        style={{
          opacity: isSnow ? 1 : 0,
        }}
      />

      {isSun && <SunBk />}
      {isSnow && <SnowBk />}
      {isRain && <RainBk />}

      {isSun && (
        <Bird
          isFlying
          upPercent={0.8}
          initPosition={{
            top: 150,
          }}
        />
      )}

      <GameDialog />

      <section className="pannel">
        <MainPannel />
      </section>
      {isStove && <Stove />}

      {/* 展示背包管理 */}
      <Outlet />

      {/* 新成就提醒 */}
      {newAchieved && (
        <AchievementToast
          type={
            isStove
              ? "stove"
              : currentPath === "/main/bag-manage"
                ? "bag"
                : "main"
          }
        />
      )}
    </section>
  );
};

export default Main;
