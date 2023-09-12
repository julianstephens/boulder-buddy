import { MenuModal } from "@/components/MenuModal";
import { NavMenu } from "@/components/NavMenu";
import { RoutineModal } from "@/components/RoutineModal";
import type { ChildrenProps } from "@/types";
import { useEffect } from "react";
import { Link } from "react-router-dom";
// import { AuthButton } from "./AuthButton";
import { useMetadata } from "@/hooks/useMetadata";
import { FiMenu } from "react-icons/fi";
import { Loader } from "./Loader";

export const DashboardLayout = ({ children }: ChildrenProps) => {
  // const { status } = useSession();
  // const isAuthed = () => true;
  const loading = false;

  const {
    pageTitle,
    actionButton,
    showActionButton,
    actionHandler,
    updateShowActionButton,
  } = useMetadata();

  useEffect(() => {
    updateShowActionButton(false);
  }, []);

  if (loading) return <Loader fullPage={true} />;

  return (
    <div className="row full">
      <div className="col hidden h-full w-2/12 justify-between border-r-2 border-r-neutral px-6 py-5 sm:flex">
        <div className="col">
          <Link
            to="/dashboard"
            className="text-xl font-bold transition hover:text-white sm:block xl:text-2xl"
          >
            Boulder Buddy
          </Link>
          <NavMenu navClassName="mt-20" />
        </div>
        {/* <AuthButton */}
        {/*   className={`${isAuthed() ? "block" : "hidden"} xl:px-24z px-24`} */}
        {/* /> */}
      </div>
      <div className="col full px-5 pt-10 sm:w-10/12">
        <div className="row w-full justify-between">
          <div className="row w-full justify-between">
            <h4>{pageTitle}</h4>
            <button
              className="sm:hidden"
              onClick={() => (window as any).menuModal.showModal()}
            >
              <FiMenu size={30} />
            </button>
          </div>
          {showActionButton && (
            <button className="btn px-8" onClick={actionHandler}>
              {actionButton}
            </button>
          )}
        </div>
        <div className="row full items-start justify-start">{children}</div>
      </div>
      {/* <MesoModal /> */}
      <RoutineModal />
      <MenuModal />
    </div>
  );
};
