import type { GameEvent } from "@/store/event/type";
import "./index.scss";

export const GameDialog = ({
  currentEvent,
}: {
  currentEvent: GameEvent | null;
}) => {
  if (!currentEvent) return null;
  return (
    <div className="pixel-dialog">
      <div className="title">{currentEvent.title}</div>
      <section className="buttonWrapper">
        {currentEvent.options?.map((item) => {
          return (
            <div className="button" key={item.title}>
              {item.title}
            </div>
          );
        })}
      </section>
    </div>
  );
};
