import { create } from "zustand";
import { createMesoSlice } from "./meso";

import type {
  MesoState,
  AppMetadataState,
} from "@/types/store";
import { createMetadataSlice } from "./appMetadata";

export const useBoundStore = create<
  AppMetadataState & MesoState
>()((...a) => ({
  ...createMetadataSlice(...a),
  ...createMesoSlice(...a),
}));
