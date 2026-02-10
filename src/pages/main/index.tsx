import { MainPannel } from "@/components/pannelItem";
import "./index.scss";
import { useEventStore } from "@/store/event/store";
import { Bird } from "@/components/bird/bird";
import { useState } from "react";
import { GameDialog } from "./components/dialog";
import { MoutingAnimation } from "./components/moutingAnimation";

const Main = () => {
  const { currentEvent, setCurrentEventByCompute } = useEventStore();
  const [isMounting, setIsMounting] = useState(true);

  return (
    <section className="mainPage">
      <div className="snow-overlay"></div>
      {currentEvent && (
        <GameDialog
          currentEvent={currentEvent}
          onChooseAfter={() => {
            setIsMounting(true);
          }}
        />
      )}
      {isMounting && (
        <MoutingAnimation
          showWarningTime={2000}
          closeTime={3500}
          onClose={() => {
            setCurrentEventByCompute();
            setIsMounting(false);
          }}
        />
      )}

      <section className="pannel">
        <MainPannel />
      </section>
      <Bird isFlying />
    </section>
  );
};

export default Main;
