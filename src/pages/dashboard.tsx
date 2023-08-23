import { Loader } from "@/components/Loader";
import { api } from "@/utils/api";
import { isEmpty } from "@/utils/helpers";
import { useSession } from "next-auth/react";

const DashboardPage = () => {
  const { data: session } = useSession();
  const { data, isLoading } = api.cycle.getMesos.useQuery({ isActive: true });

  return (
    <div className="col h-full w-full items-start">
      <div className="col h-full w-full">
        <div className="row w-full justify-between">
          <h4>
            Welcome back
            {`${session?.user.name ? `, ${session.user.name}` : ""}!`}
          </h4>
          <button
            className="btn px-8"
            onClick={() => (window as any).mesoModal.showModal()}
          >
            Create new mesocycle
          </button>
        </div>
        {isLoading ? (
          <Loader fullPage={true} />
        ) : (
          <div className="row mt-10 h-full w-full items-center justify-center">
            {data && isEmpty(data?.cycles) ? (
              <h5>No active Mesocycle selected</h5>
            ) : (
              <h5>{data?.cycles[0]?.id}</h5>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
