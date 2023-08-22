import { create } from "zustand";
import { createMesoModalSlice } from "./mesoModal";
import { MesoModalState } from "@/types/stores";

export const useBoundStore = create<MesoModalState>()((...a) => ({
  ...createMesoModalSlice(...a),
}));
