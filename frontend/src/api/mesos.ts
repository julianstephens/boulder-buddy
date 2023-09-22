import type { Meso } from "@/types";
import { useFetch, usePost } from "@/utils/reactQuery";

export const useGetMesos = () => useFetch<Meso[]>("/mesos");
export const useCreateMeso = (
  updater: (oldMesoList: Meso[], newMeso: Meso) => Meso[],
) => usePost<Meso[], Meso>("/mesos", undefined, updater);
