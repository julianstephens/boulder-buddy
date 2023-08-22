import type { MesoModalState, MesoModalStatus } from "@/types/stores";
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
});
