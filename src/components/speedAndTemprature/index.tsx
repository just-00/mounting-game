import { Speed } from "@/store/status/type";
import "./index.scss";

const iconMap = {
  [Speed.slow]: { icon: "&#xe63f;", tip: "慢速" },
  [Speed.normal]: { icon: "&#xe606;", tip: "常速" },
  [Speed.fast]: { icon: "&#xe627;", tip: "快速" },
};

interface Props {
  speed: Speed;
  needTip?: boolean;
}

export const TimeCom = () => {
  return <div className="speedTime">12:24</div>
}

export const SpeedCom = ({ speed, needTip }: Props) => {
  return (
    <section className="speedIconWrapper">
      <div
        className="icon iconfont"
        dangerouslySetInnerHTML={{ __html: iconMap[speed].icon }}
      ></div>
      {needTip && <div className="tip">{iconMap[speed].tip}</div>}
    </section>
  );
};


export const SpeedTempraturePannel = ({ speed, needTip }: Props) => {
  return (
    <section className="speedPannel">
      <TimeCom/>
      <SpeedCom speed={speed} needTip={needTip} />
    </section>
  );
};
