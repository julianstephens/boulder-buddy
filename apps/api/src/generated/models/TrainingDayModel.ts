import { TrainingDay } from "../client";
import { Required, Property, Integer, CollectionOf, Allow } from "@tsed/schema";
import { RoutineModel } from "./RoutineModel";
import { MicrocycleModel } from "./MicrocycleModel";
import { RecoveryLevelModel } from "./RecoveryLevelModel";
import { ExerciseLogModel } from "./ExerciseLogModel";
import { NoteModel } from "./NoteModel";

export class TrainingDayModel implements TrainingDay {
  @Property(String)
  @Required()
  id: string;

  @Property(Number)
  @Integer()
  @Required()
  date: number;

  @Property(String)
  @Required()
  sortOrder: string;

  @CollectionOf(() => RoutineModel)
  @Required()
  routines: RoutineModel[];

  @Property(() => MicrocycleModel)
  @Required()
  microcycle: MicrocycleModel;

  @Property(String)
  @Required()
  microcycleId: string;

  @Property(() => RecoveryLevelModel)
  @Allow(null)
  recoveryLevel: RecoveryLevelModel | null;

  @Property(String)
  @Allow(null)
  recoveryLevelId: string | null;

  @CollectionOf(() => ExerciseLogModel)
  @Required()
  workoutLog: ExerciseLogModel[];

  @Property(() => NoteModel)
  @Allow(null)
  note: NoteModel | null;

  @Property(String)
  @Allow(null)
  noteId: string | null;
}

