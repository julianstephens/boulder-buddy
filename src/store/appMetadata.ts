import type { EventHandler } from "@/types";
import type { AppMetadataState } from "@/types/store";
import React from "react";
import { StateCreator } from "zustand";

export const createMetadataSlice: StateCreator<
  AppMetadataState,
  [],
  [],
  AppMetadataState
> = (set) => ({
  pageTitle: "Overview",
  updatePageTitle: (t: string) => set(() => ({ pageTitle: t })),
  actionButton: "Overview",
  updateActionButton: (b: string) => set(() => ({ actionButton: b })),
  showActionButton: true,
  updateShowActionButton: (s: boolean) => set(() => ({ showActionButton: s })),
  actionHandler: (e) => {
    console.log("Clicked action button");
  },
  updateActionHandler: (h: EventHandler) => set(() => ({ actionHandler: h })),
});
