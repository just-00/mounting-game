import { useEffect, useRef, useState } from "react";
import "./index.scss";
import { add, sub } from "./../../utils/number";
const VOLUMN = 1;

export const AudioPlay = ({ src, loop }: { src?: string; loop?: boolean }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  // 用来存储上一次的src
  const srcRef = useRef<string | undefined>(undefined);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const isPlayingRef = useRef<boolean>(false);

  // 渐进式加载
  const fadeIn = () => {
    if (!audioRef.current) return;
    audioRef.current.play();
    audioRef.current.volume = 0;
    // 慢慢将音量加大
    const raf = () => {
      // 如果暂停了就不加大了
      if (!isPlayingRef.current) {
        return;
      }
      if (!audioRef.current) {
        return;
      }
      const value = add(audioRef.current.volume, 0.01);
      if (value > VOLUMN) {
        return;
      }
      audioRef.current.volume = value;
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  };

  // 渐进式退出
  const fadeOut = () => {
    if (!audioRef.current) return;
    // 慢慢将音量加大
    const raf = () => {
      // 如果播放了了就不变小了
      if (isPlayingRef.current) {
        return;
      }
      if (!audioRef.current) {
        return;
      }
      const value = sub(audioRef.current.volume, 0.01);
      if (value < 0) {
        audioRef.current.pause();
        return;
      }
      audioRef.current.volume = value;
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  };

  useEffect(() => {
    queueMicrotask(() => {
      if (!audioRef.current) return;
      // 如果本来就是暂停的，换一下src就行
      if (!isPlayingRef.current) {
        audioRef.current.src = src ?? "";
      } else {
        // 如果资源换了，分两种情况，原来没有资源或者原来就有资源
        // 如果原来没有资源：就直接渐进式加载
        if (src) {
          // 如果原来就有资源：渐进式退出 后 渐进式加载
          if (srcRef.current) {
            fadeOut();
          }
          audioRef.current.src = src;
          fadeIn();
        } else {
          audioRef.current.src = src ?? "";
          // 如果外界把资源关掉了，就直接渐进式退出
          fadeOut();
        }
      }
    });
    srcRef.current = src;
  }, [src]);

  const togglePlay = async () => {
    const current = !isPlaying;
    setIsPlaying(current);
    isPlayingRef.current = current;
    // 如果没有资源，按了也没用
    if (!src) {
      return;
    }

    if (isPlayingRef.current) {
      fadeIn();
    } else {
      fadeOut();
    }
  };

  if (!src) return;

  return (
    <section className="audioWrapper">
      <audio loop={loop} ref={audioRef} />
      <div onClick={togglePlay}>{isPlaying ? "暂停" : "播放"}</div>
    </section>
  );
};
