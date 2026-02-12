import type { Option } from "@/store/event/type";
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

export const GameDialog = () => {
  const [toast, setToast] = useState<string | undefined>();
  const [pic, setPic] = useState<string>();
  const [mouting, setMounting] = useState<boolean>();
  const { currentEvent, setCurrentEventByCompute, setCurrentEventByKey } =
    useEventStore();
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
      setToast(undefined);
    }, TOAST_SHOW_TIME);
  }, [toast, ]);

  const onClick = async (option: Option) => {
    // 通过当前选项计算出toast
    const { toast, endKey } = computeEffect(option as Option & Equipment);
    if (option.pics?.length) {
      for (let i = 0; i < option.pics.length; i++) {
        setPic(option.pics[i]);
        await timeoutPromise();
      }
      setPic(undefined);
    }

    if (toast) {
      setToast(toast);
    } else if (endKey) {
      setCurrentEventByKey(endKey);
    } else if (option?.mustTriggerAfterKey) {
      setCurrentEventByKey(option?.mustTriggerAfterKey);
    } else {
      setMounting(true);
    }
  };

  // 出现card的时机：mounting动画 和 点击选项后的toast 和 到结局
  let CenterCardDefined = null;
  if (mouting) {
    CenterCardDefined = (
      <MoutingAnimationCom
        showWarningTime={MOUNTING_ANIMATION_SHOW_WARNING_TIME}
        closeTime={MOUNTING_ANIMATION_CLOSE_TIME}
        onClose={() => {
          setMounting(false);
        }}
      />
    );
  } else if (currentEvent?.isEnd) {
    CenterCardDefined = (
      <section className="endWrapper">
        <div
          dangerouslySetInnerHTML={{ __html: currentEvent.title }}
          className="title"
        ></div>
        <img src={currentEvent.pic} width={60} />
      </section>
    );
  } else if (toast) {
    CenterCardDefined = (
      <div
        className="dialogToastText"
        dangerouslySetInnerHTML={{ __html: toast }}
      ></div>
    );
  }

  return (
    <section className="gameDialog">
      {!CenterCardDefined && currentEvent && (
        <div className="pixel-dialog">
          <div className="title">
            <div className="text">{currentEvent.title}</div>
          </div>
          <section className="desc">
            {currentEvent.options?.map((item) => {
              return (
                <section
                  className="buttonWrapper"
                  key={item.key}
                  onClick={() => onClick(item)}
                >
                  <div className="button" key={item.title}></div>
                  <div className="text">{item.title}</div>
                </section>
              );
            })}
          </section>
        </div>
      )}

      {CenterCardDefined && <CenterCard content={CenterCardDefined} />}

      {pic && (
        <div className="optionPicWrapper">
          <img src={pic} width="80%" className="optionPic" />
        </div>
      )}
    </section>
  );
};

const timeoutPromise = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(true);
    }, 2000),
  );
