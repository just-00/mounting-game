import type { ReactNode } from "react";
import "./index.scss";
import { STOVE_PRELOAD } from "@/const/ResourceUrl";
import classNames from "classnames";

export const CenterCard = ({
  content,
  closable,
  onClose,
  imgConfig,
}: {
  content: string | ReactNode;
  closable?: boolean;
  onClose?: () => void;
  imgConfig: {
    src?: string;
    needPlate?: boolean;
    needBorder?: boolean;
    mask?: boolean;
  };
}) => {
  const { mask, src, needPlate, needBorder } = imgConfig;
  return (
    <section className="centerCard">
      {mask && <div className="toastBk" />}
      <div className="pixelToast">
        {needPlate && (
          <div className="plateWrapper">
            <img className="plate" height="160px" src={STOVE_PRELOAD.PLATE} />
          </div>
        )}
        <div
          className={classNames({
            imgWrapper: true,
            imgBorderWrapper: needBorder && !!src,
          })}
        >
          <img src={src} className="img" />
        </div>

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
