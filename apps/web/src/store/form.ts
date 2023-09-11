import type { FormState, MesoStatus, EditMode } from "@/types/store";
import { Mesocycle } from "db";
import { StateCreator } from "zustand";

export const createFormSlice: StateCreator<FormState, [], [], FormState> = (
  set,
) => ({
  data: null,
  mode: "create",
});
