import { Mesocycle } from "@prisma/client";
import type { ButtonHandler } from ".";

export type MesoModalStatus = "show" | "hide";
export type MesoMode = "create" | "update";

export type MesoModalState = {
  meso: Mesocycle;
  updateMeso: (m: Mesocycle) => void;
  mesoModalState: MesoModalStatus;
  updateMesoModalState: (m: MesoModalStatus) => void;
  mesoMode: MesoMode;
  updateMesoMode: (m: MesoMode) => void;
};

export type AppMetadataState = {
  pageTitle: string;
  updatePageTitle: (t: string) => void;
  actionButton: string;
  updateActionButton: (b: string) => void;
  actionHandler: ButtonHandler;
  updateActionHandler: (h: ButtonHandler) => void;
  showActionButton: boolean;
  updateShowActionButton: (s: boolean) => void;
};
