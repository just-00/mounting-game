import { useEffect, useRef, useState } from "react";
import "./index.scss";
import { BIRD_PRELOAD } from "@/const/ResourceUrl";
import { IconFontCom } from "../icon-font-com";

const COLOR_ONE_CLICK = "red";
const COLOR_DOUBLE_CLICK = "gold";

type Props = {
  isFlying?: boolean;
  // 鸟翻转
  isFlip?: boolean;
  // 鸟的初始位置
  initPosition?: {
    left?: number | string;
    right?: number | string;
    top?: number | string;
    bottom?: number | string;
  };
  // 鸟向上飞的几率：0-1
  // 只有在isFlying: true时有用
  upPercent?: number;
};

export const Bird = ({
  isFlying,
  isFlip,
  initPosition,
  upPercent = 0.2,
}: Props) => {
  const BIRD = "BLUE_BIRD";
  // 随机生成一个颜色，每次鸟色都不一样！
  const [hueRotate, setHueRotate] = useState(() => Math.random() * 360);
  // 稍微随机一点鸟的大小
  const [width, setWidth] = useState(() => Math.random() * 10 + 40);
  const [frame, setFrame] = useState<number>(1);
  const frameRef = useRef<number>(1);
  const [position, setPosition] = useState<{
    left: number;
    top: number;
  }>({
    left: 0,
    top: 0,
  });
  // 朝一个方向连续飞30下
  const times = useRef<number>(30);
  const isDown = useRef<boolean>(true);
  const [showLike, setShowLike] = useState<boolean>(false);
  const [color, setColor] = useState<string>(COLOR_ONE_CLICK);
  const time = useRef<number>(null);

  useEffect(() => {
    if (!isFlying) return;
    const inter = setInterval(() => {
      // 如果已经超出帧了，回到第一张
      if (frameRef.current === 7) {
        frameRef.current = 1;
      } else {
        frameRef.current++;
      }
      setFrame(frameRef.current);
    }, 240);
    return () => clearInterval(inter);
  }, []);

  // 点击鸟出现的动画效果
  const likeme = () => {
    time.current = setTimeout(() => {
      clearTimeout(time.current as number);
      setShowLike(false);
      setColor(COLOR_ONE_CLICK);
    }, 2000);
    if (showLike) {
      setColor(COLOR_DOUBLE_CLICK);
    }
    setShowLike(true);
  };
  useEffect(() => {
    if (!isFlying) return;
    const inter = setInterval(() => {
      if (times.current < 0) {
        isDown.current = Math.random() > upPercent;
        times.current = Math.random() * 10 + 20;
      }
      let left = position.left;
      let top = position.top;
      // 飞出屏幕了就从头开始飞
      if (position.left > 480) {
        left = -1 * Math.random() * 80 - 120;
        top = Math.random() * 100;
        setHueRotate(() => Math.random() * 360);
        setWidth(() => Math.random() * 10 + 40);
      }
      times.current = times.current - 1;
      const param: number = 0.5;
      setPosition({
        left: left + 0.5,
        top:
          top <= 0 ? top + param : top + (isDown.current ? param : -1 * param),
      });
    }, 10);
    return () => {
      clearInterval(inter);
    };
  }, [position, isFlying]);

  return (
    <div
      className="pixelBirdWrapper"
      style={{
        top: initPosition?.top,
        bottom: initPosition?.bottom,
        left: initPosition?.left,
        right: initPosition?.right,
        // 翻转
        transform: isFlip ? "scaleX(-1)" : "none",
      }}
    >
      <div
        className="pixelBird"
        onClick={likeme}
        style={{
          left: position.left,
          top: position.top,
        }}
      >
        {/* 鸟身体 */}
        <img
          className="body"
          style={{
            // 通过随机色相翻转
            filter: `hue-rotate(${hueRotate}deg) saturate(1.2) contrast(1.2)`,
            width,
            height: width,
          }}
          // 根据帧数决定显示哪张，如果isFlying:false只显示第一帧
          src={BIRD_PRELOAD?.[`${BIRD}_${frame}` as keyof typeof BIRD_PRELOAD]}
        />
        {/* 点击显示爱心 */}
        {showLike && (
          <IconFontCom
            className="like"
            code="&#xed19;"
            style={{
              color,
            }}
          />
        )}
      </div>
    </div>
  );
};
