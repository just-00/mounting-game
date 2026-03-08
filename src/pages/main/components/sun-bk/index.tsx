import { useState } from 'react';
import './index.scss';

export const SunBk = () => {
  const [particles] = useState(() => {
    const count = 50; 
    return Array.from({ length: count }).map(() => ({
      id: Math.random(),
      left: Math.random() * 100,    
      top: Math.random() * 100,           
      size: 4 + Math.random() * 8,         
      duration: 15 + Math.random() * 20,  
      delay: Math.random() * 10,           
      opacity: 0.3 + Math.random() * 0.5,   
      rotate: Math.random() * 360,          
    }));
  });

  return (
    <section className="pollenBk">
      {particles.map((p) => (
        <div
          key={p.id}
          className="pollen-particle"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animation: `pollenFloat ${p.duration}s ease-in-out ${p.delay}s infinite`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        />
      ))}
    </section>
  );
};