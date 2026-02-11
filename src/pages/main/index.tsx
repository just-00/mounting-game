import { MainPannel } from "@/components/pannelItem";
import "./index.scss";
import { Bird } from "@/components/bird/bird";
import { GameDialog } from "./components/dialog";

const Main = () => {
  return (
    <section className="mainPage">
      <div className="snow-overlay"></div>
      <GameDialog />

      <section className="pannel">
        <MainPannel />
      </section>
      <Bird isFlying />
    </section>
  );
};

export default Main;
