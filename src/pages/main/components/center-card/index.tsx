import type { ReactNode } from "react";
import "./index.scss";

export const CenterCard = ({ content }: { content: string | ReactNode }) => {
  return <div className="pixelToast">{content}</div>;
};
