import { Form, Select } from "@/components/AppForm";
import { HoverButton } from "@/components/HoverButton";
import { useForm } from "react-hook-form";
import { useMetadata } from "@/hooks/useMetadata";
import { useStateCallback } from "@/hooks/useStateCallback";
import { Grouped } from "@/types";
import { api } from "@/utils/api";
import { formatTimestamp, groupBy, isEmpty } from "@/utils/helpers";
import { Prisma, RoutineType } from "@prisma/client";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import {
  RoutineWithRelations,
  TrainingDayWithRelations,
  RecoveryLevel,
} from "prisma/generated/zod";
import { useEffect, useState } from "react";

type Routine = keyof typeof RoutineType;
const TrainingDayPage = () => {
  const router = useRouter();
  const [date, setDate] = useState(NaN);
  const [recoveryLevels, setRecoveryLevels] = useState<RecoveryLevel[]>(
    [] as RecoveryLevel,
  );
  const [showRecoverySelect, setShowRecoverySelect] = useState(false);
  const [sortOrder, setSortOrder] = useState<Routine[]>([] as Routine[]);
  const [groupedRoutines, setGroupedRoutines] = useState(
    {} as Grouped<RoutineWithRelations>,
  );
  const [trainingDay, setTrainingDay] =
    useStateCallback<TrainingDayWithRelations>({} as TrainingDayWithRelations);

  const today = dayjs().startOf("d");
  const trainingDayjs =
    trainingDay && !isEmpty(trainingDay) ? dayjs.unix(trainingDay.date) : null;

  const form = useForm<Prisma.RoutineUpdateInput>();

  const { updatePageTitle } = useMetadata();

  const { data: trainingData, isLoading } =
    api.trainingDay.getDay.useQuery<TrainingDayWithRelations>(
      {
        where: { date },
        include: {
          routines: true,
        },
      },
      { enabled: !Number.isNaN(date) },
    );

  const { data: recoveryData, isLoading: recoveryLoading } =
    api.recoveryLevel.getRecoveryLevels.useQuery<RecoveryLevel[]>({});

  const initRoutines = (trainingDay: TrainingDayWithRelations) => {
    const { routines } = trainingDay;
    setGroupedRoutines(groupBy(routines, (val) => val.type));
    setSortOrder(trainingDay.sortOrder.split(",") as Routine[]);
  };

  const showSelect = () => {
    setShowRecoverySelect(true);
  };

  const onSubmit = async (data: Prisma.RoutineUpdateInput) => {
    console.log("DATA", data);
  };

  useEffect(() => {
    console.log(RecoveryLevel);
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
    if (!isLoading && trainingData && !isEmpty(trainingData)) {
      setTrainingDay(trainingData, initRoutines);
    }
  }, [trainingData]);

  useEffect(() => {
    if (!recoveryLoading && recoveryData && !isEmpty(recoveryData)) {
      setRecoveryLevels(recoveryData);
    }
  }, [recoveryData]);

  return (
    <Form form={form} onSubmit={onSubmit}>
      <div className="col full">
        <div className="stats mx-auto mt-10 shrink-0 bg-neutral">
          <div className="stat place-items-center">
            <div className="stat-title">Recovery Level</div>
            <div className="stat-value whitespace-break-spaces text-center text-3xl">
              {trainingDay.recoveryLevel?.level ? (
                trainingDay.recoveryLevel?.level
              ) : form.getValues("recoveryLevel.connect.id") ? (
                recoveryLevels.find(
                  (l) => l.id === form.getValues("recoveryLevel.connect.id"),
                ).level
              ) : showRecoverySelect && !isEmpty(recoveryLevels) ? (
                <>
                  <Select name="recoveryLevel.connect.id" options={} />
                  {/* <select
                    name="recoveryLevel.connect.id"
                    {...form.register("recoveryLevel.connect.id")}
                  >
                    {recoveryLevels.map((l, idx) => (
                      <option key={idx} value={l.id}>
                        {l.level}
                      </option>
                    ))}
                  </select> */}
                </>
              ) : (
                "Unset"
              )}
            </div>
            {!trainingDay.recoveryLevel?.level && (
              <div className="stat-actions">
                <HoverButton onClick={showSelect}>
                  {trainingDay.recoveryLevel?.level ||
                  form.getValues("recoveryLevel.connect.id")
                    ? "Edit recovery"
                    : "Add recovery"}
                </HoverButton>
              </div>
            )}
          </div>
          <div className="stat place-items-center">
            <div className="stat-title">Routines</div>
            <div className="stat-value">
              {trainingDay.routines?.length ?? 0}
            </div>
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
    </Form>
  );
};

export default TrainingDayPage;
