import type { MesoModalState, MesoModalStatus, MesoMode } from "@/types/store";
import { Mesocycle } from "@prisma/client";
import { StateCreator } from "zustand";

export const createMesoModalSlice: StateCreator<
  MesoModalState,
  [],
  [],
  MesoModalState
> = (set) => ({
  meso: {} as Mesocycle,
  updateMeso: (m: Mesocycle) => set(() => ({ meso: m })),
  mesoModalState: "hide",
  updateMesoModalState: (m: MesoModalStatus) =>
    set(() => ({ mesoModalState: m })),
  mesoMode: "create",
  updateMesoMode: (m: MesoMode) => set(() => ({ mesoMode: m })),
});
