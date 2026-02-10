import { useEffect, useRef, useState } from "react";
import "./index.scss";
import { useEnvironmenStore } from "@/store/environment/store";
import { add, div, mul } from "@/utils/number";

// 在动画期间会走多长时间（h）
// 30分钟
const ANIMATION_RUN_TIME = 0.5;

export const MoutingAnimation = ({
  onClose,
  showWarningTime,
  closeTime,
}: {
  onClose: () => void;
  showWarningTime: number;
  closeTime: number;
}) => {
  const [isWarning, setIsWarning] = useState<boolean>(false);
  const {
    distance,
    setDistance,
    averageDistancePerHour,
    timestamp,
    setTimestamp,
  } = useEnvironmenStore();
  const distanceRef = useRef(distance);
  const timestampRef = useRef(timestamp);

  useEffect(() => {
    // 小人头上出现感叹号，表示有事件
    setTimeout(() => {
      setIsWarning(true);
    }, showWarningTime);
    // 关闭动画，计算下一个事件
    setTimeout(() => {
      onClose();
    }, closeTime);
  }, []);

  useEffect(() => {
    distanceRef.current = distance;
    timestampRef.current = timestamp;
  }, [distance, timestamp]);

  useEffect(() => {
    const intervalTime = 200;
    // setInterval一共触发几次
    const times = div(showWarningTime, intervalTime);

    // 在动画期间走的公里数
    let totalDistance = 0;
    // 每一次inter走的公里数
    const interDistance = div(
      mul(averageDistancePerHour, ANIMATION_RUN_TIME),
      times,
    );
    // 每一次inter消耗的时间（s）/ intervalTime
    const interTimestamp = div(mul(mul(ANIMATION_RUN_TIME, 60), 60), times);

    const inter = setInterval(() => {
      // 到顶了结束这次interval
      if (totalDistance > mul(ANIMATION_RUN_TIME, averageDistancePerHour)) {
        totalDistance = 0;
        clearInterval(inter);
        return;
      }
      setDistance(add(distanceRef.current, interDistance));
      setTimestamp(timestampRef.current.add(interTimestamp, "seconds"));
      totalDistance = add(interDistance, totalDistance);
    }, intervalTime);
    return () => {
      clearInterval(inter);
    };
  }, []);

  return (
    <div className="pixel-toast">
      <div className="title">
        {!isWarning ? "爬山中..." : <span>&nbsp;</span>}
      </div>
      <div className="desc">
        {isWarning && (
          <img
            src="https://raw.githubusercontent.com/just-00/game-image-cdn/main/warning.png"
            width={36}
            className="icon"
          />
        )}
        <img
          src={
            isWarning
              ? "https://raw.githubusercontent.com/just-00/game-image-cdn/main/下载.png"
              : "https://raw.githubusercontent.com/just-00/game-image-cdn/main/little-man-1%20(6).gif"
          }
          width={64}
        />
      </div>
    </div>
  );
};
