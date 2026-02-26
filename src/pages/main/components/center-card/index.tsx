import type { ReactNode } from "react";
import "./index.scss";

export const CenterCard = ({
  content,
  closable,
  onClose,
}: {
  content: string | ReactNode;
  closable?: boolean;
  onClose?: () => void;
}) => {
  return (
    <div className="pixelToast">
      {content}
      {closable && (
        <div className="close-btn" onClick={onClose}>
          ×
        </div>
      )}
    </div>
  );
};
