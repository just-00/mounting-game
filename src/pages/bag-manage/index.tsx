import { useEquipmentStore } from "@/store/equipment/store";
import "./index.scss";
import { useEffect, useState } from "react";
import { type Equipment } from "@/store/equipment/type";
import classNames from "classnames";
import { GameToast } from "../main/components/toast";
import { useGameEffect } from "@/store/effect";
import type { Option } from "@/store/event/type";
import { useNavigate } from "react-router-dom";

const BagManage = () => {
  const { equipments, setEquipmentsCount } = useEquipmentStore();
  const [equipment, setEquipment] = useState<Equipment>();
  const filterEquipments = equipments.filter((item) => item.count);
  const [toast, setToast] = useState<string>();
  const navigate = useNavigate();
  const { computeEffect } = useGameEffect();

  // toast展示1500秒
  useEffect(() => {
    if (!toast) return;
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      setToast(undefined);
    }, 1500);
    return () => {
      clearTimeout(timeout);
    };
  }, [toast]);

  const onSelectEquipment = (eq: Equipment) => {
    setEquipment(eq);
  };

  const returnPage = () => {
    navigate(-1);
  };

  const onUse = () => {
    if (!equipment) return;
    const final = equipment.count! - 1;
    setEquipmentsCount(equipment.key, final);
    setEquipment({
      ...equipment,
      count: final,
    });
    const { toast } = computeEffect(equipment as Option & Equipment);
    if (toast) {
      setToast(toast);
    }
    if (!final) {
      setEquipment(undefined);
    }
  };

  const onDestory = () => {
    if (!equipment) return;
    const final = equipment.count! - 1;
    setEquipmentsCount(equipment.key, final);
    setEquipment({
      ...equipment,
      count: final,
    });
    if (!final) {
      setEquipment(undefined);
    }
  };

  return (
    <section className="bagManagePage">
      <section className="headerWrapper">
        <div onClick={returnPage}>返回</div>
        <div>背包</div>
        <div
          style={{
            visibility: "hidden",
          }}
        >
          占位
        </div>
      </section>
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
