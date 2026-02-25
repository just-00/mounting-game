import { useEquipmentStore } from "@/store/equipment/store";
import "./index.scss";
import { EquipmentKey, EquipmentType } from "@/store/equipment/type";
import { useState } from "react";
import classNames from "classnames";
import { useCook } from "./hook";
import { STOVE_PRELOAD } from "@/const/ResourceUrl";

export const Stove = () => {
  const { equipments } = useEquipmentStore();
  const { cook } = useCook();
  const foods = equipments.filter((item) => item.type === EquipmentType.Food);
  const [selectedFoods, setSelectedFoods] = useState<EquipmentKey[]>([]);

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
    cook(selectedFoods);
  };

  return (
    <section className="stoveBkWrapper">
      <section className="stoveWrapper">
        <section className="imgWrapper">
          <img className="stove" width="300px" src={STOVE_PRELOAD.STOVE} />
          <img className="pot" width="140px" src={STOVE_PRELOAD.POT} />
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
          <div className="button" onClick={onCook}>
            烹饪
          </div>
        </section>
      </section>
    </section>
  );
};
