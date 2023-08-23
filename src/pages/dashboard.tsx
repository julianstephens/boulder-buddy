import { Loader } from "@/components/Loader";
import { useMetadata } from "@/hooks/useMetadata";
import { api } from "@/utils/api";
import { isEmpty } from "@/utils/helpers";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const DashboardPage = () => {
  const { data: session } = useSession();
  const { data, isLoading } = api.meso.getMesos.useQuery({ isActive: true });
  const { updatePageTitle } = useMetadata();
  useEffect(() => {
    updatePageTitle("Training Overview");
  }, []);

  return (
    <div className="col full">
      {isLoading ? (
        <Loader fullPage={true} />
      ) : (
        <div className="row full centered mt-10">
          {!data || isEmpty(data) ? (
            <h5>No active mesocycle selected</h5>
          ) : (
            <h5>{data[0]?.id}</h5>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
