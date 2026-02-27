import type { ReactNode } from "react";
import "./index.scss";

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
            <img
              className="plate"
              height="180px"
              src="https://raw.githubusercontent.com/just-00/game-image-cdn/main/b9d6cbf4533b4a2a9bc04b).png"
            />
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
