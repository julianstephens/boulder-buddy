import { Mesocycle } from "@prisma/client";
import { useState } from "react";
import { useBoundStore } from "@/store";
import type { MesoModalStatus } from "@/types/store";

export const useMeso = () => {
  const meso = useBoundStore((state) => state.meso);
  const mesoState = useBoundStore((state) => state.mesoModalState);
  const updateMeso = useBoundStore((state) => state.updateMeso);
  const updateMesoState = useBoundStore((state) => state.updateMesoModalState);

  const update = (m: Mesocycle) => {
    updateMeso(m);
  };

  const updateState = (m: MesoModalStatus) => {
    updateMesoState(m);
  };

  return { meso, mesoState, update, updateMesoState };
};
