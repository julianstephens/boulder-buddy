import type { ChildrenProps } from "@/types";
import Link from "next/link";
import { MesoModal } from "@/components/MesoModal";

export const DashboardLayout = ({ children }: ChildrenProps) => {
  return (
    <div className="row h-full w-full">
      <div className="col h-full w-1/6 border-r-2 border-r-neutral px-6 pt-5">
        <Link href="/dashboard" className="h4 font-bold">
          Boulder Buddy
        </Link>
        <nav className="mt-20 w-full">
          <ul className="col items-start gap-5">
            {[
              ["Training Overview", "/dashboard"],
              ["Mesocyles", "/mesocycles"],
            ].map(([title, path], idx) => (
              <li key={idx}>
                <Link href={path!}>
                  <h5>{title}</h5>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="col h-full w-5/6 px-5 pt-10">{children}</div>
      <MesoModal />
    </div>
  );
};
