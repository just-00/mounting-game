import {
  SpeedTempraturePannel,
} from "@/components/speedAndTemprature";
import { Dialog } from "./components/dialog";
import "./index.scss";
import { Speed } from "@/store/status/type";

const Main = () => {
  return (
    <section className="mainPage">
      <div className="snow-overlay"></div>
      <Dialog />
      <section className="pannel">
        <SpeedTempraturePannel speed={Speed.fast} needTip />
      </section>
    </section>
  );
};

export default Main;
