import "./index.scss";
import { Bird } from "@/components/bird/bird";
import { GameDialog } from "./components/dialog";
import { Outlet } from "react-router-dom";
import { MainPannel } from "@/components/pannelItem";
import { Stove } from "@/components/stove";
import { useSettingStore } from "@/store/setting";

const Main = () => {
  const isStove = useSettingStore().isStove;
  return (
    <section className="mainPage">
      <GameDialog />

      <section className="pannel">
        <MainPannel />
      </section>
      <Bird isFlying />
      {isStove && <Stove />}

      {/* 展示背包管理 */}
      <Outlet />
    </section>
  );
};

export default Main;
