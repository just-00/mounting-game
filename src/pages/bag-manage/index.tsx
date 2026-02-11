import { useEquipmentStore } from "@/store/equipment/store";
import "./index.scss";
import { useEffect, useState } from "react";
import { type Equipment } from "@/store/equipment/type";
import classNames from "classnames";
import { GameToast } from "../main/components/toast";
import { getToast } from "@/store/effect";
import type { Option } from "@/store/event/type";

const BagManage = () => {
  const { equipments, setEquipmentsCount } = useEquipmentStore();
  const [equipment, setEquipment] = useState<Equipment>();
  const filterEquipments = equipments.filter((item) => item.count);
  const [toast, setToast] = useState<string>();

  // toast展示1500秒
  useEffect(() => {
    if (!toast) return;
    const timeout = setTimeout(() => {
      clearTimeout(timeout)
      setToast(undefined);
    }, 1500);
    return () => {
      clearTimeout(timeout);
    };
  }, [toast]);

  const onSelectEquipment = (eq: Equipment) => {
    setEquipment(eq);
  };

  const onUse = () => {
    if (!equipment) return;
    setEquipmentsCount(equipment.key, equipment.count! - 1)
    const text = getToast(equipment as Option & Equipment);
    if (text) {
      setToast(text);
    }
  };

  const onDestory = () => {
    console.log("2");
  };

  return (
    <section className="bagManagePage">
      <section className="headerWrapper">背包</section>
      {!filterEquipments.length && (
        <section className="placeholderWrapper">
          <div
            className="fontIcon emptyIcon"
            dangerouslySetInnerHTML={{ __html: "&#xe502;" }}
          ></div>
          <div className="placeholder">背包无物品</div>
        </section>
      )}

      <section className="mainWrapper">
        {filterEquipments.map((item) => {
          return (
            <section
              key={item.key}
              className={classNames({
                itemWrapper: true,
                isSelected: equipment?.key === item.key,
              })}
              onClick={() => {
                onSelectEquipment(item);
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
      {!!filterEquipments.length && (
        <section className="buttonWrapper">
          <div className="button confirm" onClick={onUse}>
            使用
          </div>
          <div className="button distory" onClick={onDestory}>
            丢弃
          </div>
        </section>
      )}
      {toast && (
        <GameToast
          position="center"
          content={<div dangerouslySetInnerHTML={{ __html: toast }}></div>}
          width={220}
        />
      )}
    </section>
  );
};

export default BagManage;
