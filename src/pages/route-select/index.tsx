import { useNavigate } from "react-router-dom";
import "./index.scss";
import { BEAR } from "@/components/bear";
import { Bird } from "@/components/bird/bird";

export const RouteSelect = () => {
  const navigate = useNavigate();

  const toPage = () => {
    navigate("/select-equipment");
  };

  return (
    <div onClick={toPage} className="routeSelectPage">
      <section className="buttonWrapper">
        <div className="title">去哪条路线呢</div>
        <div className="button">冰山</div>
        <div className="button">海边悬崖</div>
      </section>
      <div className="bearWrapper">
        <BEAR width={200}/>
      </div>
      <div className="birdWrapper">
        <Bird />
      </div>
    </div>
  );
};
