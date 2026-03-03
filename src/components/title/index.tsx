import { useNavigate } from "react-router-dom";
import "./index.scss";
import { COMMON_PRELOAD } from "@/const/ResourceUrl";
export const TitleCom = ({ title }: { title: string }) => {
  const navigate = useNavigate();

  const returnPage = () => {
    navigate(-1);
  };

  return (
    <section className="headerWrapper">
      <div onClick={returnPage} className="return">
        <img src={COMMON_PRELOAD.BACK} width={36}/>
      </div>
      <div>{title}</div>
      <div
        style={{
          visibility: "hidden",
          width: 36
        }}
      >
        占位
      </div>
    </section>
  );
};
