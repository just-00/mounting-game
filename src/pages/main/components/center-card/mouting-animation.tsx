import { useEffect, useRef, useState } from "react";
import "./index.scss";
import { useEnvironmenStore } from "@/store/environment/store";
import { add, div, mul } from "@/utils/number";
import { useStatusStore } from "@/store/status/store";

// 在动画期间会走多长时间（h）
// 设定0.5小时
const ANIMATION_RUN_TIME = 0.5;

export const MoutingAnimationCom = ({
  onClose,
  showWarningTime,
  closeTime,
}: {
  onClose: () => void;
  showWarningTime: number;
  closeTime: number;
}) => {
  // 出现感叹号
  const [isWarning, setIsWarning] = useState<boolean>(false);
  const { hunger, setHunger } = useStatusStore();

  const {
    distance,
    setDistance,
    averageDistancePerHour,
    timestamp,
    setTimestamp,
  } = useEnvironmenStore();
  const distanceRef = useRef(distance);
  const timestampRef = useRef(timestamp);
  const hasClose = useRef<boolean>(false);

  useEffect(() => {
    if (hasClose.current) return;
    hasClose.current = true;
    // 小人头上出现感叹号，表示有事件
    setTimeout(() => {
      setHunger(hunger - 15)
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
      // 爬的距离增加
      setDistance(add(distanceRef.current, interDistance));
      // 消耗时间增多
      setTimestamp(timestampRef.current.add(interTimestamp, "seconds"));
      totalDistance = add(interDistance, totalDistance);
    }, intervalTime);
    return () => {
      clearInterval(inter);
    };
  }, []);

  return (
    <section className="mountingAnimationWrapper">
      <div className="title">
        {!isWarning ? "爬山中..." : <span>&nbsp;</span>}
      </div>
      <div className="desc">
        {isWarning && (
          <div
            className="fontIcon warningFont"
            dangerouslySetInnerHTML={{ __html: "&#xe640;" }}
          ></div>
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
    </section>
  );
};
