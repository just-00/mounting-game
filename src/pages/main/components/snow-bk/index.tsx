import { useState } from "react";
import "./index.scss";

const Snow = ({ style }: { style: React.CSSProperties }) => (
  <div
    className="fontIcon snow"
    style={style}
    dangerouslySetInnerHTML={{ __html: "&#xe608;" }}
  />
);

export const SnowBk = () => {
  // 一次性生成大批雪花数据
  const [snowflakes] = useState(() => {
    // 雪花数量暂定40
    const count = 40;
    return Array.from({ length: count }).map(() => ({
      id: Math.random(),
      left: Math.random() * 100 - 1,
      duration: 5 + Math.random() * 10,
      delay: Math.random() * 10,
      size: 12 + Math.random() * 20,
      opacity: 0.4 + Math.random() * 0.6,
    }));
  });

  return (
    <section className="snowBk">
      {snowflakes.map((flake) => (
        <Snow
          key={flake.id}
          style={{
            left: `${flake.left}%`,
            fontSize: flake.size,
            opacity: flake.opacity,
            animation: `snowfall ${flake.duration}s linear ${flake.delay}s infinite`,
          }}
        />
      ))}
    </section>
  );
};
