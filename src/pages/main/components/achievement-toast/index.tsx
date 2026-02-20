import "./index.scss";
import { Star } from "@react-vant/icons";
export const AchievementToast = () => {
  return (
    <div
      className="achievementToast"
    >
      <Star/><span className="text">获得了新成就！</span>
    </div>
  );
};
