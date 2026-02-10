import { useNavigate } from "react-router-dom";
import "./index.scss";
import { BEAR } from "@/components/bear";
import { Bird } from "@/components/bird/bird";
import usePreloadImages from "@/hooks/usePreloadImg";
import { useEffect } from "react";
import { SELECT_EQUIPMENT_PRELOAD } from "@/const/ResourceUrl";
import { Route, ROUTES } from "@/store/event/config";
import { useEventStore } from "@/store/event/store";
import { useEnvironmenStore } from "@/store/environment/store";

const RouteSelect = () => {
  const navigate = useNavigate();
  const { preloadImages } = usePreloadImages();
  const { setRouteId } = useEventStore();
  const { setDistance, setAverageDistancePerHour } = useEnvironmenStore();

  useEffect(() => {
    preloadImages(Object.values(SELECT_EQUIPMENT_PRELOAD));
  }, []);

  const toPage = (routeId: Route) => {
    navigate("/select-equipment");
    // 设置当前路线
    setRouteId(routeId);
    const currentRoute = ROUTES.find((item) => item.key === routeId);
    // 设置 初始走了0km 以及 基准值的每小时走多少距离
    setDistance(0);
    setAverageDistancePerHour(currentRoute!.averageDistancePerHour);
  };

  return (
    <div className="routeSelectPage">
      <section className="buttonWrapper">
        <div className="title">去哪条路线呢</div>
        {ROUTES.map((item) => (
          <div
            className="button"
            key={item.key}
            onClick={() => toPage(item.key)}
          >
            {item.title}
          </div>
        ))}
      </section>
      <div className="bearWrapper">
        <BEAR width={200} />
      </div>
      <div className="birdWrapper">
        <Bird />
      </div>
    </div>
  );
};

export default RouteSelect;
