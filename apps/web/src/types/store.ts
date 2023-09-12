import { Mesocycle } from "db";
import type { EventHandler } from ".";

export type MesoStatus = "show" | "hide";
export type EditMode = "create" | "update";

export type MesoState = {
  meso: Mesocycle;
  updateMeso: (m: Mesocycle) => void;
  mesoMode: EditMode;
  updateMesoMode: (m: EditMode) => void;
};

export type AppMetadataState = {
  pageTitle: string;
  updatePageTitle: (t: string) => void;
  actionButton: string;
  updateActionButton: (b: string) => void;
  actionHandler: EventHandler;
  updateActionHandler: (h: EventHandler) => void;
  showActionButton: boolean;
  updateShowActionButton: (s: boolean) => void;
};
