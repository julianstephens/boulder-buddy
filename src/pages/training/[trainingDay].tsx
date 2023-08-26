import { HoverButton } from "@/components/HoverButton";
import { useMetadata } from "@/hooks/useMetadata";
import { api } from "@/utils/api";
import { isEmpty } from "@/utils/helpers";
import { RoutineType } from "@prisma/client";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { TrainingDayWithRelations } from "prisma/generated/zod";
import { useEffect, useState } from "react";

const TrainingDayPage = () => {
  const router = useRouter();

  const { updatePageTitle } = useMetadata();

  const [date, setDate] = useState(NaN);
  const [trainingDay, setTrainingDay] = useState<TrainingDayWithRelations>(
    {} as TrainingDayWithRelations,
  );

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

  useEffect(() => {
    if (
      router.query.trainingDay &&
      !Number.isNaN(Number.parseInt(router.query.trainingDay as string))
    ) {
      updatePageTitle(
        `${dayjs
          .unix(Number.parseInt(router.query.trainingDay as string))
          .format("dddd, MMM DD, YYYY")}`,
      );
      setDate(Number.parseInt(router.query.trainingDay as string));
    }
  }, []);

  useEffect(() => {
    if (!isLoading && data && !isEmpty(data)) {
      setTrainingDay(data);
    }
  }, [data]);

  return (
    <div className="col full">
      <div className="stats mx-auto mt-10 bg-neutral">
        <div className="stat place-items-center">
          <div className="stat-title">Recovery Level</div>
          <div className="stat-value">
            {trainingDay.recoveryLevel?.level ?? "N/A"}
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
      <div className="mt-10">
        <h4 className="font-bold">
          {isEmpty(trainingDay.routines)
            ? "Nothing scheduled today"
            : trainingDay.routines[0]?.type === RoutineType.REST
            ? "Rest day"
            : "Today's Workout"}
        </h4>
      </div>
    </div>
  );
};

export default TrainingDayPage;
