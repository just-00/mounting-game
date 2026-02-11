import { MainPannel } from "@/components/pannelItem";
import "./index.scss";
import { useEventStore } from "@/store/event/store";
import { Bird } from "@/components/bird/bird";
import { GameDialog } from "./components/dialog";

const Main = () => {
  const { currentEvent } = useEventStore();

  return (
    <section className="mainPage">
      <div className="snow-overlay"></div>
      <GameDialog
        currentEvent={currentEvent}
      />

      <section className="pannel">
        <MainPannel />
      </section>
      <Bird isFlying />
    </section>
  );
};

export default Main;
