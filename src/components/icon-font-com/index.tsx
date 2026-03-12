import type { CSSProperties } from "react";

export const IconFontCom = ({
  code,
  className,
  style,
}: {
  code: string;
  className?: string;
  style?: CSSProperties;
}) => {
  return (
    <div
      className={`fontIcon ${className}`}
      style={style}
      dangerouslySetInnerHTML={{ __html: code }}
    ></div>
  );
};
