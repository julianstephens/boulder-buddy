import { useMetadata } from "@/hooks/useMetadata";
import { useEffect } from "react";

const RoutinePage = () => {
  const { initialize } = useMetadata();

  useEffect(() => {
    initialize("Routines", true, "Create new routine", (e) => {
      console.log("creating routine...");
    });
  }, []);
};

export default RoutinePage;
