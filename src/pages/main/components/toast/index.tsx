import type { ReactNode } from "react";
import "./index.scss";
export const GameToast = ({ content }: { content: ReactNode | string }) => {
  return (
    <div className="toast">
      <span className="toast-text">{content}</span>
    </div>
  );
};
