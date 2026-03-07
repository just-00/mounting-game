import { useState } from 'react';
import './index.scss';

export const RainBk = () => {
  const [raindrops] = useState(() => {
    const count = 80;
    return Array.from({ length: count }).map(() => ({
      id: Math.random(),
      left: Math.random() * 100,
      duration: 0.8 + Math.random() * 1.4,
      delay: Math.random() * 2,
      height: 15 + Math.random() * 20,
      opacity: 0.3 + Math.random() * 0.5,
      rotate: -5 + Math.random() * 15,
    }));
  });

  return (
    <section className="rainBk">
      {raindrops.map((drop) => (
        <div
          key={drop.id}
          className="rain-drop"
          style={{
            left: `${drop.left}%`,
            height: drop.height,
            opacity: drop.opacity,
            transform: `rotate(${drop.rotate}deg)`,
            animation: `rainfall ${drop.duration}s linear ${drop.delay}s infinite`,
          }}
        />
      ))}
    </section>
  );
};