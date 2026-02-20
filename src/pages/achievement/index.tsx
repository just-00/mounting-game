import { useNavigate } from "react-router-dom";
import "./index.scss";
import {
  AchievementType,
  AchievementTypeMap,
  getTypedAchievements,
  type Achievement,
  type AchievementTypeMapItem,
  type TypeAchievementItem,
} from "@/store/achievement/type";
import { useAchievementStore } from "@/store/achievement/store";
import { Popup } from "react-vant";
import { useState } from "react";
import { Success } from "@react-vant/icons";
import classNames from "classnames";

const Achievement = () => {
  const { achieved } = useAchievementStore();
  const navigate = useNavigate();
  const returnPage = () => {
    navigate(-1);
  };
  const [visible, setVisible] = useState<boolean>(false);
  const [select, setSelect] = useState<
    AchievementTypeMapItem & TypeAchievementItem
  >();

  const onClick = (key: AchievementType, value: TypeAchievementItem) => {
    setSelect({ ...AchievementTypeMap[key], ...value });
    setVisible(true);
  };

  return (
    <section className="achievementPage">
      <section className="headerWrapper">
        <div onClick={returnPage}>返回</div>
        <div>成就</div>
        <div
          style={{
            visibility: "hidden",
          }}
        >
          占位
        </div>
      </section>
      <section className="typeWrapper">
        {Object.entries(getTypedAchievements(achieved)).map(([key, value]) => {
          return (
            <section
              className="typeItemWrapper"
              onClick={() => onClick(key as AchievementType, value)}
            >
              <section className="bk">
                {AchievementTypeMap[key as AchievementType].colors.map(
                  (item) => (
                    <div className="bkItem" style={{ background: item }}></div>
                  ),
                )}
              </section>
              <section className="mainWrapper">
                <img
                  src={AchievementTypeMap[key as AchievementType].pic}
                  height={60}
                  className="img"
                />
                <div className="title">
                  {AchievementTypeMap[key as AchievementType].title}
                </div>
              </section>
              <div className="text">
                {value.doneCount}/{value.value.length}
              </div>
            </section>
          );
        })}
      </section>
      <Popup
        visible={visible}
        onClose={() => setVisible(false)}
        style={{ width: "80%" }}
        className="achievementPopup"
        round
        closeable
        closeIcon={
          <span
            className="fontIcon"
            style={{
              color: "#C8102E",
            }}
          >
           &#xe63c;
          </span>
        }
      >
        <div className="popTitle">{select?.title}类成就</div>
        {select?.value.map((item) => (
          <section className="listItemWrapper">
            <div
              className={classNames({
                icon: true,
                isSelected: item.isDone,
              })}
            >
              {item.isDone ? <Success /> : null}
            </div>
            <section>
              <div className="title">{item.title}</div>
              <div className="desc">{item.desc}</div>
            </section>
          </section>
        ))}
      </Popup>
    </section>
  );
};

export default Achievement;
