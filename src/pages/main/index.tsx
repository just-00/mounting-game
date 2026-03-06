import "./index.scss";
import { Bird } from "@/components/bird/bird";
import { GameDialog } from "./components/dialog";
import { Outlet, useLocation } from "react-router-dom";
import { MainPannel } from "@/components/pannelItem";
import { Stove } from "@/components/stove";
import { useSettingStore } from "@/store/setting";
import { useEffect, useState } from "react";
import { useAchievementStore } from "@/store/achievement/store";
import { AchievementToast } from "@/components/achievement-toast";
import { useEnvironmenStore } from "@/store/environment/store";
import { MAIN_PROLOAD } from "@/const/ResourceUrl";

const Main = () => {
  const isStove = useSettingStore().isStove;
  const [newAchieved, setNewAchieved] = useState<boolean>(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const { weather, time } = useEnvironmenStore();

  // 根据天气+时间出背景
  const bk = MAIN_PROLOAD[`${weather}_${time}_BK` as "Sun_Day_BK"];
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
  return (
    <section
      className="mainPage"
      style={{
        background: `url(${bk}) right bottom / 100% 100% no-repeat`,
      }}
    >
      <GameDialog />

      <section className="pannel">
        <MainPannel />
      </section>
      <Bird isFlying />
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
