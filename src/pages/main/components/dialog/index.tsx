import type { GameEvent, Option } from "@/store/event/type";
import "./index.scss";
import { useEffect, useState } from "react";
import { CenterCard } from "../center-card";
import { MoutingAnimationCom } from "../center-card/mouting-animation";
import { useEventStore } from "@/store/event/store";
import { useGameEffect } from "@/store/effect";
import type { Equipment } from "@/store/equipment/type";

// mounting的动画展示多久
const MOUNTING_ANIMATION_SHOW_WARNING_TIME = 2000;
// mounting的动画多少时间后展示感叹号
const MOUNTING_ANIMATION_CLOSE_TIME = 3000;
// 点击选项后的toast展示多久
const TOAST_SHOW_TIME = 2500;

// 逻辑

// 游戏主页
//  初始看mounting动画
//  mounting动画结束后，计算当前事件（由于mounting动画会减少distance增加timestamp）
//  出现事件后
//   选项点击后 计算toast，展示toast
//   选项点击后 toast结束后，展示mounting动画

export const GameDialog = ({
  currentEvent,
}: {
  currentEvent: GameEvent | null;
}) => {
  const [toast, setToast] = useState<string | undefined>();
  const [mouting, setMounting] = useState<boolean>();
  const { setCurrentEventByCompute } = useEventStore();
  const { computeEffect } = useGameEffect();

  useEffect(() => {
    // 展示动画变为不展示时，不进行逻辑计算
    if (!mouting) {
      return;
    }
    // 展示动画变为展示时，计算当前事件
    setCurrentEventByCompute();
  }, [mouting]);

  useEffect(() => {
    // toast变为空时，展示mounting动画
    if (!toast) {
      queueMicrotask(() => {
        setMounting(true);
      });
      return;
    }
    // 一定时间后，toast变为空
    setTimeout(() => {
      setToast(undefined)
    }, TOAST_SHOW_TIME);
  }, [toast]);

  const onClick = (option: Option) => {
    const toast = computeEffect(option as Option & Equipment);
    setToast(toast);
  };

  // 出现card的时机：mounting动画 和 点击选项后的toast
  const isShowCenterCard = mouting || toast;

  return (
    <>
      {!isShowCenterCard && currentEvent && (
        <div className="pixel-dialog">
          <div className="title">
            <div className="text">{currentEvent.title}</div>
          </div>
          <section className="desc">
            {currentEvent.options?.map((item) => {
              return (
                <section className="buttonWrapper" key={item.key}>
                  <div
                    className="button"
                    key={item.title}
                    onClick={() => onClick(item)}
                  ></div>
                  <div className="text">{item.title}</div>
                </section>
              );
            })}
          </section>
        </div>
      )}

      {isShowCenterCard && (
        <CenterCard
          content={
            mouting ? (
              <MoutingAnimationCom
                showWarningTime={MOUNTING_ANIMATION_SHOW_WARNING_TIME}
                closeTime={MOUNTING_ANIMATION_CLOSE_TIME}
                onClose={() => {
                  setMounting(false);
                }}
              />
            ) : toast ? (
              <div
                className="dialogToastText"
                dangerouslySetInnerHTML={{ __html: toast }}
              ></div>
            ) : null
          }
        />
      )}
    </>
  );
};
