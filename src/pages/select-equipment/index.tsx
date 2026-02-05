import { Play } from "@react-vant/icons";
import {
  EQUIPMENT_MAX_SIZE,
  EQUIPMENT_MAX_WEIGHT,
} from "../../store/equipment/config";
import "./index.scss";
import { useState } from "react";
import { Stepper } from "react-vant";
import { useEquipmentStore } from "@/store/equipment/store";

export const SelectEquipment = () => {
  const [page, setPage] = useState(1);
  const onPage = (p: number) => {
    setPage(p);
  };
  const { equipments, setEquipmentsCount, totalSize, totalWeight } =
    useEquipmentStore();

  const onValueChange = (key: string, count?: number | null) => {
    setEquipmentsCount(key, count ?? 0);
  };
  const submit = () => {};

  return (
    <div className="selectEquipment">
      <div className="title">选取装备</div>

      <section className="desc">
        <div>
          体积
          <span className="space" />
          V:
          <span className="space" />
          <span
            style={{
              color: totalSize > EQUIPMENT_MAX_SIZE ? "red" : "inherit",
            }}
          >
            {totalSize}
          </span>
          <span className="space" />/<span className="space" />
          {EQUIPMENT_MAX_SIZE}
        </div>
        <div>
          重量
          <span className="space" />
          W:
          <span className="space" />
          <span
            style={{
              color: totalWeight > EQUIPMENT_MAX_WEIGHT ? "red" : "inherit",
            }}
          >
            {totalWeight}
          </span>
          <span className="space" />/<span className="space" />
          {EQUIPMENT_MAX_WEIGHT}
        </div>
      </section>

      <section className="detaiWrapper">
        <section className="pageWrapper">
          <section className="mainWrapper">
            <Play
              className="playIcon"
              style={{
                transform: "rotate(180deg)",
              }}
              onClick={() => {
                onPage(1);
              }}
              fontSize={24}
              color="#e67e22"
            />
            <span className="pageNumber">{page} / 2</span>
            <Play
              className="playIcon"
              fontSize={24}
              color="#e67e22"
              onClick={() => {
                onPage(2);
              }}
            />
          </section>
        </section>
        <section className="detailItemWrapper">
          {equipments.slice((page - 1) * 7, page * 7).map((item) => {
            return (
              <section key={item.name} className="detailItem">
                <img className="img" src={item.src} width={40} />
                <section className="mainWrapper">
                  <div>
                    <span className="space" />
                    {item.name}
                  </div>
                  <div className="sizeAndWeight">
                    V<span className="space" />
                    {item.size} W<span className="space" />
                    {item.weight}
                  </div>
                </section>
                <Stepper
                  value={item.count}
                  min={0}
                  integer
                  allowEmpty={false}
                  onChange={(v) => onValueChange(item.key, v)}
                  className="step"
                />
              </section>
            );
          })}
        </section>
        <div className="submitButton" onClick={submit}>
          选择完毕
        </div>
      </section>
    </div>
  );
};
