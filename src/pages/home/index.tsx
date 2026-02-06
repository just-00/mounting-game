import { Bird } from "@/components/bird/bird";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import usePreloadImages from "@/hooks/usePreloadImg";
import { ROUTE_SELECT_PRELOAD } from "@/const/ResourceUrl";
import { preloadOtherRoutes } from "@/routes";

export const HomePage = () => {
  const navigate = useNavigate();

  const goto = () => {
    navigate("/route-select");
  };

  const { preloadImages } = usePreloadImages();

  useEffect(() => {
    preloadImages(Object.values(ROUTE_SELECT_PRELOAD));
  }, []);

  useEffect(() => {
    const idleCallback = requestIdleCallback(() => {
      preloadOtherRoutes();
    });
    return () => cancelIdleCallback(idleCallback);
  }, []);

  return (
    <div className="homePage">
      <div className="bk">
        <div className="title">爬山吧</div>
        <a className="start" href="" onClick={goto}>
          开始
        </a>
        <div className="achivement-wrapper">
          <a className="achivement" href="" onClick={goto}>
            成就
          </a>
        </div>

        <div className="birdWrapper">
          <Bird isFlying={true} />
        </div>
      </div>
    </div>
  );
};
