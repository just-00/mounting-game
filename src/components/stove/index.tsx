import { useEquipmentStore } from "@/store/equipment/store";
import "./index.scss";
import { EquipmentKey, EquipmentType } from "@/store/equipment/type";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { useCook } from "./hook";
import { STOVE_PRELOAD } from "@/const/ResourceUrl";
import { CenterCard } from "@/pages/main/components/center-card";

export const Stove = () => {
  const { equipments } = useEquipmentStore();
  const { cook } = useCook();
  const [selectedFoods, setSelectedFoods] = useState<EquipmentKey[]>([]);
  // 烹饪导致的toast
  const toastRef = useRef<string>("");
  const [toast, setToast] = useState<string>();
  // 烹饪动画
  const [animation, setAnimation] = useState<boolean>(false);

  // 只筛选食物装备
  const foods = equipments.filter((item) => item.type === EquipmentType.Food);
  // 正在烹饪和没有选择食物时disabled
  const cookDisabled = !!animation || !selectedFoods.length;

  const onSelect = (key: EquipmentKey) => {
    if (selectedFoods.includes(key)) {
      selectedFoods.splice(selectedFoods.indexOf(key), 1);
      setSelectedFoods([...selectedFoods]);
    } else {
      setSelectedFoods([...selectedFoods, key]);
    }
  };
  const onReturn = () => {};

  const onCook = () => {
    // disabled下按了没用
    if (cookDisabled) return;

    // 开始烹饪动画
    setAnimation(true);
    const { toast } = cook(selectedFoods);
    toastRef.current = toast!;
  };

  useEffect(() => {
    if (!animation) return;

    setTimeout(() => {
      // 动画结束后展示toast
      setToast(toastRef.current);
      setAnimation(false);
      setSelectedFoods([]);
    }, 2000);
  }, [animation]);

  // 目前不启用自动关闭toast
  // useEffect(() => {
  //   if (!toast) return;
  //   setTimeout(() => {
  //     setToast("");
  //   }, 4000);
  // }, [toast]);

  return (
    <section className="stoveBkWrapper">
      <section className="stoveWrapper">
        <section className="imgWrapper">
          <img className="stove" width="300px" src={STOVE_PRELOAD.STOVE} />
          <img
            className="pot"
            width="140px"
            src={STOVE_PRELOAD.POT}
            style={{
              animation: animation
                ? "stoveSwave 1s ease-in-out infinite alternate"
                : "none",
            }}
          />
        </section>
        <section className="foodWrapper">
          {foods.map((item) => (
            <section
              className={classNames({
                foodItemWrapper: true,
                foodItemWrapperSelected: selectedFoods.includes(item.key),
              })}
              onClick={() => onSelect(item.key)}
            >
              <img src={item.src} className="img" />
            </section>
          ))}
        </section>
        <section className="buttonWrapper">
          <div className="button" onClick={onReturn}>
            退出
          </div>
          <div
            className={classNames({
              button: true,
              disabled: cookDisabled,
            })}
            onClick={onCook}
          >
            烹饪
          </div>
        </section>
      </section>
      {toast && (
        <CenterCard
          closable
          onClose={() => {
            setToast("");
          }}
          content={
            <div
              className="centerCardToastWrapper"
              dangerouslySetInnerHTML={{ __html: toast }}
            ></div>
          }
        />
      )}
    </section>
  );
};
