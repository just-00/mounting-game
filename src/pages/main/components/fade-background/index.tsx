import { useEffect, useState } from "react";

export const FadeBackground = ({ bk }: { bk: string }) => {
  const [activeBg, setActiveBg] = useState(bk);
  const [nextBg, setNextBg] = useState(bk);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (bk === activeBg) return;
    queueMicrotask(() => {
      setNextBg(bk);
      setFade(true);
    });
  }, [bk, activeBg]);

  const handleTransitionEnd = () => {
    setActiveBg(nextBg);
    setFade(false);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none"
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `url(${activeBg}) right bottom / 100% 100% no-repeat`,
          opacity: fade ? 0 : 1,
          transition: "opacity 0.5s ease",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `url(${nextBg}) right bottom / 100% 100% no-repeat`,
          opacity: fade ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
        onTransitionEnd={handleTransitionEnd}
      />
    </div>
  );
};
