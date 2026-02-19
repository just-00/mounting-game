import { Bird } from "@/components/bird/bird";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import usePreloadImages from "@/hooks/usePreloadImg";
import { ALL_RESOURCE } from "@/const/ResourceUrl";
import { preloadOtherRoutes } from "@/routes";

export const Home = () => {
  const navigate = useNavigate();

  const gotoStart = () => {
    navigate("/route-select");
  };

  const gotoAchievement = () => {
    navigate("/achievement");
  };

  const { preloadImages } = usePreloadImages();

  useEffect(() => {
    preloadImages(ALL_RESOURCE);
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
        <a className="start" href="" onClick={gotoStart}>
          开始
        </a>
        <div className="achivement-wrapper">
          <a className="achivement" href="" onClick={gotoAchievement}>
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
