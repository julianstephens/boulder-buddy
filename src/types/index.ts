import { TRPCClientError } from "@trpc/client";
import type { AppRouter } from "@/server/api/root";

export type ChildrenProps = {
  children: React.ReactNode;
};

export type AppError = TRPCClientError<AppRouter>;
