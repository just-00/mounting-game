import { useEquipmentStore } from "@/store/equipment/store";
import "./index.scss";
import { useState } from "react";
import type { EquipmentKey } from "@/store/equipment/type";
import classNames from "classnames";

const BagManage = () => {
  const { equipments } = useEquipmentStore();
  const [equipmentKey, setEquipmentKey] = useState<EquipmentKey | null>(null);
  const filterEquipments = equipments.filter((item) => item.count);

  const onSelectEquipment = (key: EquipmentKey) => {
    setEquipmentKey(key);
  };

  const onUse = () => {
    console.log("1")
  }

  const onDestory = () => {
    console.log("2")
  }

  return (
    <section className="bagManagePage">
      <section className="headerWrapper">背包</section>
      <section className="mainWrapper">
        {filterEquipments.map((item) => {
          return (
            <section
              key={item.key}
              className={classNames({
                itemWrapper: true,
                isSelected: equipmentKey === item.key,
              })}
              onClick={() => {
                onSelectEquipment(item.key);
              }}
            >
              <img src={item.src} className="img" />
              <div className="itemTitle">
                {item.name}x{item.count}
              </div>
            </section>
          );
        })}
      </section>
      <section className="buttonWrapper">
        <div className="button confirm" onClick={onUse}>使用</div>
        <div className="button distory" onClick={onDestory}>丢弃</div>
      </section>
    </section>
  );
};

export default BagManage;
