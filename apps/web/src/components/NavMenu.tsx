import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const NavMenu = ({ navClassName }: { navClassName?: string }) => {
  const isAuthed = () => true;
  const goto = useNavigate();
  const { pathname } = useLocation();
  // const loading = status === "loading";

  useEffect(() => {
    if (pathname === "/" && isAuthed()) {
      goto("/dashboard");
    } else if (pathname === "/" && !isAuthed()) {
      return;
    } else if (!isAuthed()) {
      goto("/");
    }
  }, [pathname]);

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
                pathname === path!
                  ? "font-bold text-info"
                  : "transition hover:font-bold hover:text-info"
              }
              onClick={() => {
                (window as any).menuModal.close();
              }}
              to={path!}
            >
              <h4>{title}</h4>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
