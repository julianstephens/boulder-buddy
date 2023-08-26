import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export const NavMenu = ({ navClassName }: { navClassName?: string }) => {
  const { status } = useSession();
  const isAuthed = () => status === "authenticated";
  const loading = status === "loading";
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
  return (
    <nav className={`w-full ${navClassName}`}>
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
              onClick={() => {
                (window as any).menuModal.close();
              }}
              href={path!}
            >
              <h4>{title}</h4>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
