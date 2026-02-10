import type { GameEvent } from "@/store/event/type";
import "./index.scss";
import { useEventStore } from "@/store/event/store";
import { GameToast } from "../toast";
import { useState } from "react";

export const GameDialog = ({
  currentEvent,
  onChooseAfter,
}: {
  currentEvent: GameEvent | null;
  onChooseAfter: () => void;
}) => {
  const { resetCurrentEvent } = useEventStore();
  const [toast, setToast] = useState();

  if (!currentEvent) return null;

  const onClick = () => {
    resetCurrentEvent();
    // onChooseAfter();
  };
  return (
    <>
      <div className="pixel-dialog">
        <div className="title">
          <div className="text">{currentEvent.title}</div>
        </div>
        <section className="desc">
          {currentEvent.options?.map((item) => {
            return (
              <section className="buttonWrapper">
                <div
                  className="button"
                  key={item.title}
                  onClick={onClick}
                ></div>
                <div className="text">{item.title}</div>
              </section>
            );
          })}
        </section>
      </div>
      {toast && <GameToast content={toast} />}
    </>
  );
};
