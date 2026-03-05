import type { Option } from "@/store/event/type";
import "./index.scss";
import { useEffect, useRef, useState } from "react";
import { CenterCard } from "../center-card";
import { MountingAnimationCom } from "../center-card/mounting-animation";
import { useEventStore } from "@/store/event/store";
import { useGameEffect } from "@/store/effect";
import { useSettingStore } from "@/store/setting";
import { useNavigate } from "react-router-dom";

// mounting的动画展示多久
const MOUNTING_ANIMATION_SHOW_WARNING_TIME = 2000;
// mounting的动画多少时间后展示感叹号
const MOUNTING_ANIMATION_CLOSE_TIME = 3000;
// 点击选项后的toast展示多久
const TOAST_SHOW_TIME = 2500;
// 无选项事件展示多久
const NO_OPTIONS_EVENT = 3000;

// 逻辑

// 游戏主页
//  初始看mounting动画
//  mounting动画结束后，计算当前事件（由于mounting动画会减少distance增加timestamp）
//  出现事件后
//   选项点击后 计算toast，展示toast
//   选项点击后 toast结束后，展示mounting动画

export const GameDialog = () => {
  // 是否展示动画
  const [mounting, setMounting] = useState<boolean>(true);
  const mountingRef = useRef<boolean>(true);
  const [toast, setToast] = useState<string | undefined>();
  const [optionPic, setOptionPic] = useState<{
    url: string;
    position: "top" | "full";
  }>();
  const navigate = useNavigate();
  const { currentEvent, setCurrentEventByCompute, setCurrentEventByKey } =
    useEventStore();
  const { resetAll, computeEffect } = useGameEffect();
  const { setMounting: setSettingMouting } = useSettingStore();
  const endRef = useRef<{
    key: string | undefined;
    title?: string;
  }>(null);

  // 监听背包页是否关闭了动画
  useEffect(() => {
    const subscribe = useSettingStore.subscribe(
      (state) => ({
        mounting: state.mounting,
      }),
      ({ mounting }) => {
        setMounting(mounting);
      },
    );
    return () => {
      subscribe();
    };
  }, []);

  useEffect(() => {
    // 如果事件有选项，不做处理
    if (!currentEvent || currentEvent?.options?.length) {
      return;
    }

    // 如果事件无选项，定时把事件关掉
    setTimeout(() => {
      let toast: string | undefined = "";
      if (currentEvent?.effect) {
        toast = computeEffect(currentEvent).toast;
      }
      // 如果有toast展示
      if (toast) {
        setToast(toast);
      } else {
        // 没有的话直接展示mounting动画
        setSettingMouting(true);
      }
    }, NO_OPTIONS_EVENT);
  }, [currentEvent]);

  useEffect(() => {
    // 展示动画变为展示时，或者之前mounting也是false时，不进行逻辑计算
    if (mounting || !mountingRef.current) {
      mountingRef.current = mounting;
      return;
    }
    mountingRef.current = mounting;
    console.log("动画结束，计算当前事件=====");
    // 展示动画变为不展示时，计算当前事件
    setCurrentEventByCompute();
  }, [mounting]);

  useEffect(() => {
    // toast变为空时，如果有结局key，展示结局，如果没有，展示mounting动画
    if (!toast) {
      queueMicrotask(() => {
        if (endRef.current?.key) {
          setCurrentEventByKey(endRef.current.key);
          endRef.current = null;
        } else {
          setMounting(true);
        }
      });
      return;
    }
    // 一定时间后，toast变为空
    setTimeout(() => {
      setToast(undefined);
      setOptionPic(undefined);
    }, TOAST_SHOW_TIME);
  }, [toast]);

  const restart = () => {
    resetAll();
    navigate("/route-select", {
      replace: true,
    });
  };

  const onClick = async (option: Option) => {
    // 通过当前选项计算出toast
    const {
      optionPics: originOptionPics,
      toast,
      endKey,
      endTitle,
      hasAction,
    } = computeEffect(option);

    // 如果全屏图片，先出图片再出toast
    if (originOptionPics?.type === "full") {
      for (let i = 0; i < originOptionPics.urls.length; i++) {
        setOptionPic({
          url: originOptionPics.urls[i],
          position: originOptionPics.type,
        });
        await timeoutPromise();
      }
      setOptionPic(undefined);
    }

    if (toast) {
      setToast(toast);
      // 如果局部图片，图片和toast一起出
      if (originOptionPics?.type === "top") {
        setOptionPic({
          url:
            typeof originOptionPics.urls === "string"
              ? originOptionPics.urls
              : originOptionPics.urls[0],
          position: originOptionPics.type,
        });
      }
      endRef.current = {
        key: endKey,
        title: endTitle,
      };
    } else if (endKey) {
      // 可能有自定义end title的情况
      setCurrentEventByKey(endKey, endTitle);
    } else if (option?.mustTriggerAfterKey) {
      setCurrentEventByKey(option?.mustTriggerAfterKey);
    } else if (!hasAction) {
      setMounting(true);
    }
  };

  // 出现card的时机：mounting动画 和 点击选项后的toast 和 到结局
  let CenterCardDefined = null;
  if (mounting) {
    CenterCardDefined = (
      <MountingAnimationCom
        showWarningTime={MOUNTING_ANIMATION_SHOW_WARNING_TIME}
        closeTime={MOUNTING_ANIMATION_CLOSE_TIME}
        onClose={() => {
          setMounting(false);
        }}
      />
    );
  } else if (currentEvent?.isEnd) {
    CenterCardDefined = (
      <section className="centerCardEndWrapper">
        <div
          dangerouslySetInnerHTML={{ __html: currentEvent.title }}
          className="title"
        ></div>
        <img src={currentEvent.eventPic} width={60} />
      </section>
    );
  } else if (toast) {
    CenterCardDefined = (
      <div
        className="centerCardToastWrapper"
        dangerouslySetInnerHTML={{ __html: toast }}
      ></div>
    );
  }

  return (
    <>
      {/* 展示当前事件 */}
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

          {/* 事件图片展示 */}
          {currentEvent?.eventPic && !currentEvent.isEnd && (
            <section className="eventPicWrapper">
              <img src={currentEvent.eventPic} height={100} />
            </section>
          )}
        </div>
      )}

      {/* 展示中心卡片：动画、结局、toast */}
      {CenterCardDefined && (
        <CenterCard
          content={CenterCardDefined}
          imgConfig={{
            needBorder: true,
            src: optionPic?.position === "top" ? optionPic?.url : undefined,
          }}
        />
      )}

      {currentEvent?.isEnd && (
        <div className="restartWrapper">
          <div className="button" onClick={restart}>
            重新开始
          </div>
        </div>
      )}

      {/* 点击选项后的图片展示 */}
      {optionPic?.position === "full" && (
        <div className="optionPicWrapper">
          <img src={optionPic.url} width="80%" className="optionPic" />
        </div>
      )}
    </>
  );
};

const timeoutPromise = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(true);
    }, 2000),
  );
