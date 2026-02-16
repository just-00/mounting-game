import { useEquipmentStore } from "@/store/equipment/store";
import { useStatusStore } from "@/store/status/store";
import { getSpeed, Speed } from "@/store/status/type";
import { useEffect } from "react";

export const useEquipmentSubscribe = () => {
  const setSpeed = useStatusStore().setSpeed;
  const injuried = useStatusStore().injuried;

  useEffect(() => {
    const subscribe = useEquipmentStore.subscribe(
      (state) => ({
        totalWeight: state.totalWeight,
        totalSize: state.totalSize,
      }),
      ({ totalSize, totalWeight }) => {
        if(injuried){
          setSpeed(Speed.Slow)
          return
        }
        setSpeed(
          getSpeed({
            totalSize,
            totalWeight,
          }),
        );
      },
    );
    return () => {
      subscribe();
    };
  }, []);
};
