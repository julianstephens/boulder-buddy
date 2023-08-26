import type { EditMode, MesoState, } from "@/types/store";
import { Mesocycle } from "@prisma/client";
import { StateCreator } from "zustand";

export const createMesoSlice: StateCreator<
  MesoState,
  [],
  [],
  MesoState
> = (set) => ({
  meso: {} as Mesocycle,
  updateMeso: (m: Mesocycle) => set(() => ({ meso: m })),
  mesoMode: "create",
  updateMesoMode: (m: EditMode) => set(() => ({ mesoMode: m })),
});
