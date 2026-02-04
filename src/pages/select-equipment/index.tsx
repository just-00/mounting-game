import { Play } from "@react-vant/icons";
import { EQUIPMENTS } from "./equipment";
import "./index.scss";
import { useState } from "react";
import { Stepper } from 'react-vant';

export const SelectEquipment = () => {
  const [page, setPage] = useState(1)
  const onPage = (p: number) => {
    setPage(p)
  }
  const [value, setValue] = useState()

  const onStepperChange = () => {
  }
  
  return (
    <div className="selectEquipment">
      <div className="title">选取装备</div>

      <section className="desc">
        <div>
          体积
          <span className="space" />
          V:
          <span className="space" />
          20
          <span className="space" />/<span className="space" />
          30
        </div>
        <div>
          重量
          <span className="space" />
          W:
          <span className="space" />
          20
          <span className="space" />/<span className="space" />
          30
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
                onPage(1)
              }}
              fontSize={24}
              color="#e67e22"
            />
            <span className="pageNumber">
                {page} / 2
            </span>
            <Play className="playIcon" fontSize={24} color="#e67e22" 
            onClick={() => {
                onPage(2)
              }}
              />
          </section>
        </section>
        {EQUIPMENTS.slice((page-1) * 7, page*7).map((item) => {
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
              <Stepper value={value} step={2} onChange={onStepperChange} className="step"/>
            </section>
          );
        })}
      </section>
    </div>
  );
};
