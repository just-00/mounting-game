import type { Event } from "@/store/event/config";
import "./index.scss";

export const Dialog = ({
    title
}: Event) => {
  return (
    <div className="pixel-dialog">
      <div className="title">碰到一只熊</div>
      <section className="buttonWrapper">
        <div className="button">揍他</div>
        <div className="button">摸他</div>
      </section>
    </div>
  );
};
