import { useNavigate } from "react-router-dom";
import "./index.scss";
import {
  AchievementType,
  AchievementTypeMap,
  getTypedAchievements,
} from "@/store/achievement/type";

const Achievement = () => {
  const navigate = useNavigate();
  const returnPage = () => {
    navigate(-1);
  };
  return (
    <section className="achievementPage">
      <section className="headerWrapper">
        <div onClick={returnPage}>返回</div>
        <div>成就</div>
        <div
          style={{
            visibility: "hidden",
          }}
        >
          占位
        </div>
      </section>
      <section>
        {Object.entries(getTypedAchievements()).map(([key, value]) => {
          return (
            <section>
              <div>{AchievementTypeMap[key as AchievementType].title}</div>
              {value.length}
            </section>
          );
        })}
      </section>
    </section>
  );
};

export default Achievement;
