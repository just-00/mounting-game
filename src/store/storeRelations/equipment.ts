import { useEquipmentStore } from "@/store/equipment/store";
import { useStatusStore } from "@/store/status/store";
import { getSpeed } from "@/store/status/type";
import { useEffect } from "react";

export const useEquipmentSubscribe = () => {
  const setSpeed = useStatusStore().setSpeed;

  useEffect(() => {
    const subscribe = useEquipmentStore.subscribe(
      (state) => ({
        totalWeight: state.totalWeight,
        totalSize: state.totalSize,
      }),
      ({ totalSize, totalWeight }) => {
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
