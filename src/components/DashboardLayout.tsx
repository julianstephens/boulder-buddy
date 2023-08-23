import { MesoModal } from "@/components/MesoModal";
import type { ChildrenProps } from "@/types";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AuthButton } from "./AuthButton";
import { Loader } from "./Loader";
import { useBoundStore } from "@/store";
import { useMetadata } from "@/hooks/useMetadata";

export const DashboardLayout = ({ children }: ChildrenProps) => {
  const { status } = useSession();
  const isAuthed = () => status === "authenticated";
  const loading = status === "loading";
  const {
    pageTitle,
    actionButton,
    showActionButton,
    actionHandler,
    updateShowActionButton,
  } = useMetadata();

  const router = useRouter();

  useEffect(() => {
    if (router.pathname === "/" && isAuthed()) {
      void router.push("/dashboard");
    } else if (router.pathname === "/" && !isAuthed()) {
      return;
    } else if (!isAuthed()) {
      void router.push("/");
    }
  }, [status, router.pathname]);

  useEffect(() => {
    updateShowActionButton(false);
  }, []);

  if (loading) return <Loader fullPage={true} />;

  return (
    <div className="row h-full w-full">
      <div className="col h-full w-1/6 border-r-2 border-r-neutral px-6 py-5">
        <Link
          href="/dashboard"
          className="h4 font-bold transition hover:text-white"
        >
          Boulder Buddy
        </Link>
        <nav className="mt-20 w-full">
          <ul className="col items-start gap-5">
            {[
              ["Training Overview", "/dashboard"],
              ["Mesocyles", "/mesocycles"],
              ["Routines", "/routines"],
            ].map(([title, path], idx) => (
              <li key={idx}>
                <Link
                  className={
                    router.pathname === path!
                      ? "font-bold text-info"
                      : "transition hover:font-bold hover:text-info"
                  }
                  href={path!}
                >
                  <h5>{title}</h5>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <AuthButton
          className={`${
            isAuthed() ? "block" : "hidden"
          } mt-auto self-center px-32`}
        />
      </div>
      <div className="col h-full w-5/6 px-5 pt-10">
        <div className="row w-full justify-between">
          <h4>{pageTitle}</h4>
          {showActionButton && (
            <button className="btn px-8" onClick={actionHandler}>
              {actionButton}
            </button>
          )}
        </div>
        <div className="row full">{children}</div>
      </div>
      <MesoModal />
    </div>
  );
};
