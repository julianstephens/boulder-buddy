import { Mesocycle } from "@prisma/client";

export type MesoModalStatus = "show" | "hide";

export type MesoModalState = {
  meso: Mesocycle;
  updateMeso: (m: Mesocycle) => void;
  mesoModalState: MesoModalStatus;
  updateMesoModalState: (m: MesoModalStatus) => void;
};
