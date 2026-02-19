import "./index.scss";
import { Bird } from "@/components/bird/bird";
import { GameDialog } from "./components/dialog";
import { Outlet } from "react-router-dom";
import { MainPannel } from "@/components/pannelItem";

const Main = () => {
  return (
    <section className="mainPage">
      <GameDialog />

      <section className="pannel">
        <MainPannel />
      </section>
      <Bird isFlying />
      {/* 展示背包管理 */}
      <Outlet />
    </section>
  );
};

export default Main;
