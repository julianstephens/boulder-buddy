import { create } from "zustand";
import { createMesoModalSlice } from "./mesoModal";
import { MesoModalState } from "@/types/store";
import { set } from "react-hook-form";
import { createMetadataSlice } from "./appMetadata";
import { AppMetadataState } from "../types/store";

export const useBoundStore = create<AppMetadataState & MesoModalState>()(
  (...a) => ({
    ...createMetadataSlice(...a),
    ...createMesoModalSlice(...a),
  }),
);
