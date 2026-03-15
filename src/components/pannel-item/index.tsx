import {
  getHungerType,
  getSanType,
  getWarmType,
  Hunger,
  San,
  Speed,
  Warm,
} from "@/store/status/type";
import "./index.scss";
import { Weather } from "@/store/environment/type";
import { useStatusStore } from "@/store/status/store";
import { useEnvironmenStore } from "@/store/environment/store";
import dayjs from "dayjs";
import { useEventStore } from "@/store/event/store";
import { ROUTES } from "@/store/event/config";
import { div, sub } from "@/utils/number";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AUDIO_PRELOAD, PANNEL_ITEM_PRELOAD } from "@/const/ResourceUrl";
import { IconFontCom } from "../icon-font-com";
import { AudioPlay } from "../audio-play";
import { useSettingStore } from "@/store/setting";

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
  [`Weather${[Weather.Sun]}`]: {
    icon: "&#xe610;",
    tip: "晴天",
    color: "#E69F22",
  },
  [`Weather${[Weather.Rain]}`]: {
    icon: "&#xe611;",
    tip: "下雨",
    color: "#4A90E2",
  },
  [`Weather${[Weather.Snow]}`]: {
    icon: "&#xe643;",
    tip: "下雪",
    color: "#4A90E2",
  },
  [`San${[San.Normal]}`]: { icon: "&#xe7ba;", tip: "愉快", color: "#16A085" },
  [`San${[San.Unstable]}`]: { icon: "&#xe7ba;", tip: "错乱", color: "#FFCC80" },
  [`San${[San.Fracture]}`]: { icon: "&#xe7ba;", tip: "疯狂", color: "#E53935" },
  [`Poison`]: {
    icon: "&#xe7ba;",
    tip: "中毒",
    color: "#E53935",
  },

  [`Warm${[Warm.Hypothermia]}`]: {
    icon: "&#xe642;",
    tip: "失温",
    color: "#34B59C",
  },
  [`Warm${[Warm.Low]}`]: {
    icon: "&#xe642;",
    tip: "低温",
    color: "#4ABAA8",
  },
  [`Warm${[Warm.Normal]}`]: {
    icon: "&#xe642;",
    tip: "舒适",
    color: "#E6C018",
  },
};

export const BagCom = ({ width = 40 }: { width?: number }) => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
  const onClick = () => {
    setIsClicked(true);
    navigate("/main/bag-manage");
  };
  const style: React.CSSProperties = {
    width,
    height: width,
  };
  if (isClicked) {
    style.animation = "none";
  }
  return (
    <img
      style={style}
      className="bagWrapper"
      onClick={onClick}
      src={PANNEL_ITEM_PRELOAD.BAG}
    />
  );
};

export const TimeCom = () => {
  const timestamp = useEnvironmenStore((state) => state.timestamp);
  return <div className="speedTime">{dayjs(timestamp).format("HH:mm")}</div>;
};

export const DistanceCom = () => {
  const distance = useEnvironmenStore((state) => state.distance);
  const routeId = useEventStore((state) => state.routeId);
  const currentRoute = ROUTES.find((item) => item.key === routeId);
  const HALF = div(currentRoute!.distance, 2);
  const isDown = distance > HALF;
  const remaining = isDown
    ? sub(currentRoute!.distance, distance)
    : sub(HALF, distance);

  return (
    <div className="speedTime">
      距{isDown ? "底" : "顶"}
      {remaining}km
    </div>
  );
};

export const WeatherCom = () => {
  const weather = useEnvironmenStore((state) => state.weather);
  const map = iconMap[`Weather${weather}`];
  return (
    <section
      className="speedIconWrapper"
      style={{
        color: map.color,
      }}
    >
      <IconFontCom code={map.icon} />
      {<div className="tip">{map.tip}</div>}
    </section>
  );
};

export const SpeedCom = () => {
  const speed = useStatusStore((state) => state.speed);
  const map = iconMap[`Speed${speed}`];
  return (
    <section
      className="speedIconWrapper"
      style={{
        color: map.color,
      }}
    >
      <IconFontCom code={map.icon} />
      {<div className="tip">{map.tip}</div>}
    </section>
  );
};

export const SanCom = () => {
  const san = useStatusStore((state) => state.san);
  const map = iconMap[`San${getSanType(san)}`];
  return (
    <section
      className="speedIconWrapper"
      style={{
        color: map.color,
      }}
    >
      <IconFontCom code={map.icon} />

      {<div className="tip">{map.tip}</div>}
    </section>
  );
};

export const PoisonCom = () => {
  const poison = useStatusStore((state) => state.poison);
  const poisonLen = poison.length;
  if (!poisonLen) return null;
  const map = iconMap[`Poison`];
  return (
    <section
      className="speedIconWrapper"
      style={{
        color: map.color,
      }}
    >
      <IconFontCom code={map.icon} />

      {<div className="tip">{map.tip}</div>}
    </section>
  );
};

export const WarmCom = () => {
  const warm = useStatusStore((state) => state.warm);
  const map = iconMap[`Warm${getWarmType(warm)}`];
  return (
    <section
      className="speedIconWrapper"
      style={{
        color: map.color,
      }}
    >
      <IconFontCom code={map.icon} />
      {<div className="tip">{map.tip}</div>}
    </section>
  );
};

export const InjuriedCom = () => {
  const injuried = useStatusStore((state) => state.injuried);
  if (!injuried) return null;
  return (
    <section className="speedIconWrapper">
      <img
        src={PANNEL_ITEM_PRELOAD.INJURIED}
        width={30}
        style={{
          filter: "saturate(0.8)",
        }}
      />
      <div
        className="tip"
        style={{
          color: "#E49E00",
        }}
      >
        受伤
      </div>
    </section>
  );
};

export const HungerCom = () => {
  const hunger = useStatusStore((state) => state.hunger);
  const hungerType = getHungerType(hunger);
  if (hungerType === Hunger.Full) {
    return null;
  }
  return (
    <section className="speedIconWrapper">
      <img
        src={PANNEL_ITEM_PRELOAD.HUNGER}
        width={30}
        style={{
          filter: "saturate(0.8)",
        }}
      />
      <div
        className="tip"
        style={{
          color: hungerType === Hunger.LowSuar ? "#E53935" : "#E49E00",
        }}
      >
        {hungerType === Hunger.LowSuar ? "低血糖" : "饥饿"}
      </div>
    </section>
  );
};

export const EyeCom = () => {
  const [see, setSee] = useState<boolean>(useSettingStore().see);
  const setSeeOrigin = useSettingStore().setSee;

  useEffect(() => {
    const unsubscribe = useSettingStore.subscribe(
      (data) => ({
        see: data.see,
      }),
      ({ see: seeSubscribe }) => {
        setSee(seeSubscribe);
      },
    );
    return () => {
      unsubscribe();
    };
  });

  const handleSee = () => {
    setSeeOrigin(!see);
  };

  return (
    <section onClick={handleSee} className="centerWrapper">
      <IconFontCom
        code={see ? "&#xe6d1;" : "&#xe6cf;"}
        style={{
          color: "#616161",
        }}
      />
    </section>
  );
};

export const MainPannel = () => {
  const { currentEvent } = useEventStore();
  const { weather } = useEnvironmenStore();
  const audioBk = AUDIO_PRELOAD[weather];
  return (
    <>
      <section className="pannelRow">
        <section className="mainPannel">
          <section className="leftWrapper">
            <section className="rightWeatherWrapper">
              <WeatherCom />
            </section>
            <section className="timeAndDistance">
              <TimeCom />
              <DistanceCom />
            </section>
          </section>
          <section className="rightWrapper">
            {!currentEvent?.isEnd && (
              <>
                <InjuriedCom />
                <HungerCom />
                <SpeedCom />
                <SanCom />
                <PoisonCom />
                <WarmCom />
              </>
            )}
          </section>
        </section>
      </section>
      <section className="bagRow">
        <BagCom />
        <section className="rightWrapper">
          <EyeCom />
          <AudioPlay src={audioBk} />
        </section>
      </section>
    </>
  );
};
