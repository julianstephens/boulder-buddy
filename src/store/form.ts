import type { FormState, MesoModalStatus, EditMode } from "@/types/store";
import { Mesocycle } from "@prisma/client";
import { StateCreator } from "zustand";

export const createFormSlice: StateCreator<FormState, [], [], FormState> = (
  set,
) => ({
  data: null,
  mode: "create",
});
