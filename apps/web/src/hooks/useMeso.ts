import { useBoundStore } from "@/store";
import type { MesoStatus } from "@/types/store";
import { Mesocycle } from "db";

export const useMeso = () => {
  const meso = useBoundStore((state) => state.meso);
  const mesoState = useBoundStore((state) => state.mesoModalState);
  const mesoMode = useBoundStore((state) => state.mesoMode);
  const updateMeso = useBoundStore((state) => state.updateMeso);
  const updateMesoState = useBoundStore((state) => state.updateMesoModalState);
  const updateMesoMode = useBoundStore((state) => state.updateMesoMode);

  const update = (m: Mesocycle) => {
    updateMeso(m);
  };

  const updateState = (m: MesoStatus) => {
    updateMesoState(m);
  };

  return {
    meso,
    mesoState,
    update,
    updateMesoState: updateState,
    updateMesoMode,
  };
};
