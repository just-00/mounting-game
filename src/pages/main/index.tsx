import { SpeedTempraturePannel } from "@/components/pannelItem";
import { Dialog } from "./components/dialog";
import "./index.scss";
import { Speed } from "@/store/status/type";
import { Weather } from "@/store/environment/type";

const Main = () => {
  return (
    <section className="mainPage">
      <div className="snow-overlay"></div>
      <Dialog />
      <section className="pannel">
        <SpeedTempraturePannel
          speed={Speed.fast}
          weather={Weather.rain}
          needTip
        />
      </section>
    </section>
  );
};

export default Main;
