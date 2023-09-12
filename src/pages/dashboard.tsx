import { Calendar } from "@/components/Calendar";
import { Loader } from "@/components/Loader";
import { useMetadata } from "@/hooks/useMetadata";
import { api } from "@/utils/api";
import { isEmpty, isInRange } from "@/utils/helpers";
import dayjs from "dayjs";
import {
  MesocycleWithRelations,
  MicrocycleWithRelations,
} from "prisma/generated/zod";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const { data, isLoading } = api.meso.getMesos.useQuery({
    where: { isActive: true },
    include: {
      microcycles: {
        include: { trainingDays: { include: { routines: true } } },
      },
    },
  });
  const [activeMeso, setActiveMeso] = useState<MesocycleWithRelations>(
    {} as MesocycleWithRelations,
  );
  const [activeMicro, setActiveMicro] = useState<MicrocycleWithRelations>(
    {} as MicrocycleWithRelations,
  );

  const { updatePageTitle } = useMetadata();

  useEffect(() => {
    updatePageTitle("Training Overview");
  }, []);

  useEffect(() => {
    if (!isLoading && data && data[0]) {
      setActiveMeso(data[0]);
      const micros = data[0].microcycles;
      if (micros && !isEmpty(micros)) {
        const active = micros.find((m) =>
          isInRange(dayjs().unix(), m.startDate, m.endDate),
        );
        if (active) setActiveMicro(active);
      }
    }
  }, [data]);

  return (
    <div className="row full items-start">
      {isLoading ? (
        <Loader fullPage={true} />
      ) : (
        <div className="col full mt-10 justify-start">
          {isEmpty(activeMeso) ? (
            <h5 className="my-auto">No active mesocycle selected</h5>
          ) : (
            <>
              {[activeMeso.goal, activeMicro.goal].map((el, idx) => (
                <div key={idx} className="row w-full">
                  <div
                    className={`row centered w-full rounded-md py-2 text-white ${
                      idx === 0
                        ? "mb-4 bg-primary text-xl font-bold"
                        : "bg-secondary text-lg"
                    }`}
                  >
                    {el}
                  </div>
                </div>
              ))}
              <div className="col full items-start pt-16 sm:pt-20">
                <div className="col w-full items-center">
                  <h3 className="mx-auto font-bold text-white">Calendar</h3>
                  <h5 className="mt-2">
                    {dayjs().startOf("w").format("MMM DD, YYYY")} -{" "}
                    {dayjs().endOf("w").format("MMM DD, YYYY")}
                  </h5>
                </div>
                <div className="row full mt-10 items-start justify-between overflow-x-scroll">
                  <Calendar trainingDays={activeMicro.trainingDays} />
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
