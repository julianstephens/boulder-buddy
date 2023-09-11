import { Routine, TrainingDay } from "db";

export type TrainingDayWithRelations = TrainingDay & {
  routines: Routine[];
};
