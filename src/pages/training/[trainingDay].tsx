import { HoverButton } from "@/components/HoverButton";
import { useMetadata } from "@/hooks/useMetadata";
import { useStateCallback } from "@/hooks/useStateCallback";
import { Grouped } from "@/types";
import { api } from "@/utils/api";
import { formatTimestamp, groupBy, isEmpty } from "@/utils/helpers";
import { RoutineType } from "@prisma/client";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import {
  RoutineWithRelations,
  TrainingDayWithRelations,
} from "prisma/generated/zod";
import { useEffect, useState } from "react";

type Routine = keyof typeof RoutineType;
const TrainingDayPage = () => {
  const router = useRouter();
  const [date, setDate] = useState(NaN);
  const [sortOrder, setSortOrder] = useState<Routine[]>([] as Routine[]);
  const [groupedRoutines, setGroupedRoutines] = useState(
    {} as Grouped<RoutineWithRelations>,
  );
  const [trainingDay, setTrainingDay] =
    useStateCallback<TrainingDayWithRelations>({} as TrainingDayWithRelations);

  const today = dayjs().startOf("d");
  const trainingDayjs =
    trainingDay && !isEmpty(trainingDay) ? dayjs.unix(trainingDay.date) : null;

  const { updatePageTitle } = useMetadata();

  const { data, isLoading } =
    api.trainingDay.getDay.useQuery<TrainingDayWithRelations>(
      {
        where: { date },
        include: {
          routines: true,
        },
      },
      { enabled: !Number.isNaN(date) },
    );

  const initRoutines = (trainingDay: TrainingDayWithRelations) => {
    const { routines } = trainingDay;
    setGroupedRoutines(groupBy(routines, (val) => val.type));
    setSortOrder(trainingDay.sortOrder.split(",") as Routine[]);
  };

  useEffect(() => {
    if (
      router.query.trainingDay &&
      !Number.isNaN(Number.parseInt(router.query.trainingDay as string))
    ) {
      updatePageTitle(
        `${formatTimestamp(
          Number.parseInt(router.query.trainingDay as string),
          "dddd, MMM DD, YYYY",
        )}`,
      );
      setDate(Number.parseInt(router.query.trainingDay as string));
    }
  }, []);

  useEffect(() => {
    if (!isLoading && data && !isEmpty(data)) {
      setTrainingDay(data, initRoutines);
    }
  }, [data]);

  return (
    <div className="col full">
      <div className="stats mx-auto mt-10 shrink-0 bg-neutral">
        <div className="stat place-items-center">
          <div className="stat-title">Recovery Level</div>
          <div className="stat-value">
            {trainingDay.recoveryLevel?.level ?? "Unset"}
          </div>
          {!trainingDay.recoveryLevel?.level && (
            <div className="stat-actions">
              <HoverButton>Add recovery</HoverButton>
            </div>
          )}
        </div>
        <div className="stat place-items-center">
          <div className="stat-title">Routines</div>
          <div className="stat-value">{trainingDay.routines?.length ?? 0}</div>
          <div className="stat-actions">
            <HoverButton>Add routine</HoverButton>
          </div>
        </div>
      </div>
      <div className="mt-10 w-full">
        <h4 className="text-center font-bold">
          {isEmpty(trainingDay.routines)
            ? "Nothing scheduled today"
            : trainingDay.routines[0]?.type === RoutineType.REST
            ? "Rest day"
            : `${
                today.isSame(trainingDayjs?.startOf("d"))
                  ? "Today's"
                  : `${trainingDayjs?.format("dddd")}'s`
              } Workout`}
        </h4>
        <div className="col full mt-3 justify-start gap-4 overflow-y-scroll">
          {!isEmpty(sortOrder) &&
            sortOrder.map((type, idx) => (
              <div className="w-full" key={idx}>
                {!isEmpty(groupedRoutines[type]) && (
                  <div className="row h-28 w-full items-start justify-start rounded-xl border-2 p-2">
                    {groupedRoutines[type]?.map((r, idx) => (
                      <div key={idx}>
                        <h5 className="font-semibold">{type}</h5>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TrainingDayPage;
