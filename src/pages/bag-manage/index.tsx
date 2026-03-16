import { useEquipmentStore } from "@/store/equipment/store";
import "./index.scss";
import { useEffect, useState } from "react";
import {
  EquipmentKey,
  EquipmentType,
  type Equipment,
} from "@/store/equipment/type";
import classNames from "classnames";
import { GameToast } from "../main/components/toast";
import { useGameEffect } from "@/store/effect";
import { useLocation, useNavigate } from "react-router-dom";
import { useEventStore } from "@/store/event/store";
import { useSettingStore } from "@/store/setting";
import { TitleCom } from "@/components/title";
import { IconFontCom } from "@/components/icon-font-com";
import { useAchievementStore } from "@/store/achievement/store";
import { AchievementKey } from "@/store/achievement/type";

const BagManage = () => {
  const { setMounting } = useSettingStore();
  const { addAchieved } = useAchievementStore();
  const { equipments, setEquipmentsCount } = useEquipmentStore();
  const [equipment, setEquipment] = useState<Equipment>();
  const filterEquipments = equipments.filter((item) => item.count);
  const [toast, setToast] = useState<string>();
  const navigate = useNavigate();
  const { computeEffect } = useGameEffect();
  const { setCurrentEventByKey } = useEventStore();
  const [confirm, setConfirm] = useState<boolean>(false);
  const routeLocation = useLocation();

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

  const onUse = () => {
    if (!equipment) return;
    if (equipment.effect?.endKey) {
      setMounting(false);
      setCurrentEventByKey(equipment.effect.endKey);
      navigate(-1);
      return;
    }
    const { toast } = computeEffect(equipment);
    // 如果要开启炉子的话，就把背包页关掉
    if (equipment.action?.stove) {
      navigate(-1);
      return;
    }
    if (toast) {
      setToast(toast);
    }
    if (equipment.disposable) {
      const final = equipment.count! - 1;
      setEquipmentsCount(equipment.key, final);
      setEquipment({
        ...equipment,
        count: final,
      });
      if (!final) {
        setEquipment(undefined);
      }
    }
  };

  const handleDestory = () => {
    if (!equipment) return;
    setConfirm(false);
    const final = equipment.count! - 1;
    setEquipmentsCount(equipment.key, final, true);
    setEquipment({
      ...equipment,
      count: final,
    });
    if (!final) {
      setEquipment(undefined);
    }
  };

  const onDestory = () => {
    if (!equipment) return;
    const canRubbish = routeLocation.state?.rubbish === true;
    if (
      !canRubbish &&
      (equipment.emptyRubbish || equipment.type === EquipmentType.RUBBISH)
    ) {
      // 新增乱扔垃圾成就
      addAchieved([AchievementKey.LITTERING]);
      setConfirm(true);
      return;
    }
    handleDestory();
  };

  const onCancel = () => {
    setConfirm(false);
  };

  return (
    <section className="bagManagePage">
      <TitleCom title="背包" />
      {!filterEquipments.length && (
        <section className="placeholderWrapper">
          <IconFontCom code="&#xe502;" className="emptyIcon" />
          <div className="placeholder">背包无物品</div>
        </section>
      )}

      <section className="mainWrapper">
        {/* 菜肴在前面 */}
        {/* WIP 搞个装备类型优先级 */}
        {filterEquipments
          .sort((item) => {
            if (item.type === EquipmentType.DISH) {
              return 1;
            }
            return 0;
          })
          .map((item) => {
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
                <section className="imgWrapper">
                  <img src={item.src} className="img" />
                </section>
                <div className="itemTitle">{item.name}</div>
                <span className="num">{item.count}</span>
              </section>
            );
          })}
      </section>
      {!!filterEquipments.length && (
        <section className="buttonWrapper">
          {!!equipment && (
            <div className="detailWrapper">
              重量：{equipment?.weight}&nbsp; 体积：{equipment?.size}
            </div>
          )}
          <section className="buttonMainWrapper">
            {/* 只有菜肴、食品、汽炉可以使用 */}
            {!equipment ||
            (equipment?.type === EquipmentType.Tool &&
              equipment.key !== EquipmentKey.GasStove) ? (
              <div />
            ) : (
              <div className="button confirm" onClick={onUse}>
                使用
              </div>
            )}
            {/* 只有菜肴、食品、垃圾可以丢弃 */}
            {equipment &&
            [
              EquipmentType.DISH,
              EquipmentType.Food,
              EquipmentType.RUBBISH,
            ].includes(equipment?.type) ? (
              <div className="button distory" onClick={onDestory}>
                丢弃
              </div>
            ) : (
              <div />
            )}
          </section>
        </section>
      )}
      {toast && (
        <GameToast
          position="center"
          content={<div dangerouslySetInnerHTML={{ __html: toast }}></div>}
          width={220}
        />
      )}
      {/* 乱扔垃圾二次check */}
      {confirm && (
        <>
          <div className="toastBk" />
          <section className="destoryConfirm">
            <div className="title">你确定要乱扔垃圾吗？</div>
            <section className="confirmButtonWrapper">
              <div className="button confirm" onClick={handleDestory}>
                确定
              </div>
              <div className="button cancel" onClick={onCancel}>
                不了
              </div>
            </section>
          </section>
        </>
      )}
    </section>
  );
};

export default BagManage;
