import { useEquipmentStore } from "@/store/equipment/store";
import { useStatusStore } from "@/store/status/store";
import { getSpeed } from "@/store/status/type";
import { useEffect } from "react";

export const useSpeedSubscribe = () => {
  const setSpeed = useStatusStore().setSpeed;

  useEffect(() => {
    const eqSubscribe = useEquipmentStore.subscribe(
      (state) => ({
        totalWeight: state.totalWeight,
        totalSize: state.totalSize,
      }),
      ({ totalSize, totalWeight }) => {
        const { injuried, hunger } = useStatusStore.getState();
        setSpeed(
          getSpeed({
            totalSize,
            totalWeight,
            injuried,
            hunger,
          }),
        );
      },
    );
    return () => {
      eqSubscribe();
    };
  }, []);
};
