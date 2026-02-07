import { useEffect, useState } from "react";
import "./index.scss";

export const MoutingAnimation = () => {
  const [isWarning, setIsWarning] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setIsWarning(true);
    }, 2000);
  }, []);

  return (
    <div className="pixel-toast">
      <div className="title">{!isWarning ? "爬山中...": <span>&nbsp;</span>}</div>
      <div className="desc">
        {isWarning && (
          <img src="https://raw.githubusercontent.com/just-00/game-image-cdn/main/warning.png" width={36} className="icon"/>
        )}
        <img
          src={isWarning? "https://raw.githubusercontent.com/just-00/game-image-cdn/main/下载.png": "https://raw.githubusercontent.com/just-00/game-image-cdn/main/little-man-1%20(6).gif"}
          width={64}
        />
      </div>
    </div>
  );
};
