import { DashboardLayout } from "@/components/DashboardLayout";
import "@/styles/globals.css";
import { api } from "@/utils/api";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import "react-datepicker/dist/react-datepicker.css";
import { Toaster } from "react-hot-toast";

const BoulderBuddy: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <Toaster />
      <SessionProvider session={session}>
        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(BoulderBuddy);
