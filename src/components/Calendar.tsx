import { isEmpty } from "@/utils/helpers";
import { RoutineType } from "@prisma/client";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import Link from "next/link";
import { TrainingDayWithRelations } from "prisma/generated/zod";

const Routine = ({
  height,
  label,
  type,
}: {
  height: number;
  label: string;
  type: RoutineType;
}) => (
  <div
    className={`row centered w-full rounded-md text-center ${
      type === RoutineType.CLIMBING
        ? "bg-green-500 text-white"
        : type === RoutineType.CONDITIONING
        ? "bg-orange-400 text-white"
        : type === RoutineType.STRENGTH
        ? "bg-purple-500 text-white"
        : type === RoutineType.ACTIVE_RECOVERY
        ? "bg-secondary"
        : [
            RoutineType.WARMUP as string,
            RoutineType.COOLDOWN as string,
          ].includes(type)
        ? "bg-sky-500 text-white"
        : "bg-neutral text-white"
    }`}
    style={{ height: `${height}%` }}
  >
    {label}
  </div>
);

export const Calendar = ({
  trainingDays,
}: {
  trainingDays: TrainingDayWithRelations[];
}) => {
  const calcHeight = (idx: number, numChildren: number) => {
    return (idx / numChildren) * 100;
  };

  return (
    <>
      {trainingDays
        .sort((a, b) => a.date - b.date)
        .map((t, idx) => (
          <Link
            href={`/training/${t.date}`}
            key={idx}
            className={`col h-3/4 w-32 shrink-0  text-lg odd:mx-4 first-of-type:ml-2 last-of-type:mr-2 lg:w-1/6`}
          >
            <p className="mb-3 text-xl font-bold">
              {dayjs.unix(t.date).format("dddd")}
            </p>
            <motion.div className="col full gap-3" whileHover={{ scale: 1.05 }}>
              {t.routines &&
                !isEmpty(t.routines) &&
                t.routines.map((r, idx) => (
                  <Routine
                    key={idx}
                    height={calcHeight(idx + 1, t.routines.length)}
                    label={r.name}
                    type={r.type}
                  />
                ))}
            </motion.div>
          </Link>
        ))}
    </>
  );
};
