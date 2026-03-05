import "./index.scss";
import { Star } from "@react-vant/icons";

export const AchievementToast = ({
  type,
}: {
  type: "stove" | "bag" | "main";
}) => {
  let top: number = 0
  if(type === 'stove'){
    top = 60
  }else if(type === 'bag'){
    top = 68
  }else if(type === 'main'){
    top = 88
  }
  return (
    <div className="achievementToast" style={{
      top
    }}>
      <Star />
      <span className="text">获得了新成就!!!</span>
    </div>
  );
};
