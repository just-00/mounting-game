import { useEffect, useRef, useState } from "react";
import "./index.scss";
import { ROUTE_SELECT_PRELOAD } from "@/const/ResourceUrl";

export const BEAR = ({ width }: { width: number }) => {
  const [position, setPosition] = useState<{
    left: number;
    top: number;
  }>({
    left: 0,
    top: 0,
  });
  const times = useRef<number>(30);
  const isDown = useRef<boolean>(true);

  useEffect(() => {
    const inter = setInterval(() => {
      if (times.current < 0) {
        isDown.current = Math.random() > 0.2;
        times.current = Math.random() * 10 + 20;
      }
      let left = position.left;
      let top = position.top;
      if (position.left > 420) {
        left = -40;
        top = Math.random() * 100;
      }
      times.current = times.current - 1;
      const param: number = 0.5;
      setPosition({
        left: left + 0.5,
        top:
          top <= 0 ? top + param : top + (isDown.current ? param : -1 * param),
      });
    }, 20);
    return () => {
      clearInterval(inter);
    };
  }, [position]);
  return (
    <div className="pixel-bear">
      <img
        className="body"
        src={ROUTE_SELECT_PRELOAD.BEAR}
        style={{
          width,
          height: width,
        }}
      />
    </div>
  );
};
