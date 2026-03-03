import type { ReactNode } from "react";
import "./index.scss";
import { STOVE_PRELOAD } from "@/const/ResourceUrl";

export const CenterCard = ({
  content,
  closable,
  onClose,
  mask,
  imgSrc,
  needPlate,
}: {
  content: string | ReactNode;
  closable?: boolean;
  onClose?: () => void;
  mask?: boolean;
  imgSrc?: string;
  needPlate?: boolean;
}) => {
  return (
    <section className="centerCard">
      {mask && <div className="toastBk" />}
      <div className="pixelToast">
        <section className="imgWrapper">
          {needPlate && (
            <img className="plate" height="160px" src={STOVE_PRELOAD.PLATE} />
          )}
          <img height="130px" src={imgSrc} className="img" />
        </section>

        {content}
        {closable && (
          <div className="close-btn" onClick={onClose}>
            ×
          </div>
        )}
      </div>
    </section>
  );
};
