import { TRPCClientError } from "@trpc/client";
import type { AppRouter } from "@/server/api/root";
import React from "react";

export type ChildrenProps = {
  children: React.ReactNode;
};

export type AppError = TRPCClientError<AppRouter>;

export type ButtonHandler = (e: React.SyntheticEvent) => void;
