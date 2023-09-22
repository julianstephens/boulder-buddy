import type { ChildrenProps } from "@/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

export const Providers = ({
  children,
  queryClient,
}: ChildrenProps & { queryClient: QueryClient }) => (
  <>
    <Toaster />
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </>
);
