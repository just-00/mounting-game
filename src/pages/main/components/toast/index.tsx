import { type ReactNode } from "react";
import "./index.scss";
export const GameToast = ({
  content,
  position,
  width,
}: {
  content: ReactNode | string;
  position: "top" | "center";
  width: number;
}) => {
  return (
    <div
      className="gameToast"
      style={{
        top: position === "top" ? "100px" : "calc((100vh - 100px) / 2)",
        width: `${width}px`,
      }}
    >
      <span className="gameToastText">{content}</span>
    </div>
  );
};
