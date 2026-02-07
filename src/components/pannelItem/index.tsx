import { San, Speed, Temperature } from "@/store/status/type";
import "./index.scss";
import { DEFAULT_DISTANCE, Direction, Weather } from "@/store/environment/type";
import { useStatusStore } from "@/store/status/store";
import { useEnvironmenStore } from "@/store/environment/store";
import dayjs from "dayjs";
import { div } from "@/utils/number";

const iconMap: {
  [key: string]: {
    icon: string;
    tip: string;
    color: string;
  };
} = {
  [`Speed${[Speed.Slow]}`]: { icon: "&#xe63f;", tip: "慢速", color: "#6E8597" },
  [`Speed${[Speed.Normal]}`]: {
    icon: "&#xe606;",
    tip: "常速",
    color: "#7BA05B",
  },
  [`Speed${[Speed.Fast]}`]: { icon: "&#xe627;", tip: "快速", color: "#E67E22" },
  [`Weather${[Weather.Sun]}`]: { icon: "&#xe610;", tip: "晴天", color: "#E69F22" },
  [`Weather${[Weather.Rain]}`]: { icon: "&#xe60e;", tip: "下雨", color: "#4A90E2" },
  [`Weather${[Weather.Snow]}`]: { icon: "&#xe643;", tip: "下雪", color: "#4A90E2" },
  [`San${[San.Normal]}`]: { icon: "&#xe7ba;", tip: "神常", color: "#16A085" },
  [`San${[San.Unstable]}`]: { icon: "&#xe7ba;", tip: "神迷", color: "#FFCC80" },
  [`San${[San.Fracture]}`]: { icon: "&#xe7ba;", tip: "神乱", color: "#E53935" },
  [`Temprature${[Temperature.Hypothermia]}`]: { icon: "&#xe51f;", tip: "失温", color: "#F4D03F" },
  [`Temprature${[Temperature.Low]}`]: { icon: "&#xe51f;", tip: "低温", color: "#76D7C4" },
  [`Temprature${[Temperature.Normal]}`]: { icon: "&#xe51f;", tip: "常温", color: "#48C9B0" },
};

export const TimeCom = () => {
  const timestamp = useEnvironmenStore((state) => state.timestamp);
  return <div className="speedTime">{dayjs(timestamp).format("HH:mm")}</div>;
};

export const DistanceCom = () => {
  const distance = useEnvironmenStore((state) => state.distance);
  const direction = useEnvironmenStore((state) => state.direction);
  return (
    <div className="speedTime">
      距{direction === Direction.Down ? "底" : "顶"}
      {div(distance || DEFAULT_DISTANCE, 2)}km
    </div>
  );
};


export const WeatherCom = () => {
  const weather = useEnvironmenStore((state) => state.weather);
  const map = iconMap[`Weather${weather}`]
  return (
    <section
      className="speedIconWrapper"
      style={{
        color: map.color,
      }}
    >
      <div
        className="icon iconfont"
        dangerouslySetInnerHTML={{ __html: map.icon }}
      ></div>
      {<div className="tip">{map.tip}</div>}
    </section>
  );
};

export const SpeedCom = () => {
  const speed = useStatusStore((state) => state.speed);
  const map = iconMap[`Speed${speed}`]
  return (
    <section
      className="speedIconWrapper"
      style={{
        color: map.color,
      }}
    >
      <div
        className="icon iconfont"
        dangerouslySetInnerHTML={{ __html: map.icon }}
      ></div>
      {<div className="tip">{map.tip}</div>}
    </section>
  );
};

export const SanCom = () => {
  const san = useStatusStore((state) => state.san);
  const map = iconMap[`San${san}`]
  return (
    <section
      className="speedIconWrapper"
      style={{
        color: map.color,
      }}
    >
      <div
        className="icon iconfont"
        dangerouslySetInnerHTML={{ __html: map.icon }}
      ></div>
      {<div className="tip">{map.tip}</div>}
    </section>
  );
};

export const TempratureCom = () => {
  const temperature = useStatusStore((state) => state.temperature);
  const map = iconMap[`Temprature${temperature}`]
  return (
    <section
      className="speedIconWrapper"
      style={{
        color: map.color,
      }}
    >
      <div
        className="icon iconfont"
        dangerouslySetInnerHTML={{ __html: map.icon }}
      ></div>
      {<div className="tip">{map.tip}</div>}
    </section>
  );
};

export const TiredCom = () => {
  const temperature = useStatusStore((state) => state.temperature);
  const map = iconMap[`Temprature${temperature}`]
  return (
    <section
      className="speedIconWrapper"
      style={{
        color: map.color,
      }}
    >
      <div
        className="icon iconfont"
        dangerouslySetInnerHTML={{ __html: map.icon }}
      ></div>
      {<div className="tip">{map.tip}</div>}
    </section>
  );
};

export const MainPannel = () => {
  return (
    <section className="mainPannel">
      <section className="leftWrapper">
        <TimeCom />
        <DistanceCom />
        <WeatherCom />
      </section>
      <section className="rightWrapper">
        <SanCom />
        <SpeedCom />
        <TempratureCom />
      </section>
    </section>
  );
};
