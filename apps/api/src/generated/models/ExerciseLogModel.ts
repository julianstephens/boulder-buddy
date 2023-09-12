import { ExerciseLog } from "../client";
import { Required, Property, Integer, Allow, CollectionOf } from "@tsed/schema";
import { ExerciseModel } from "./ExerciseModel";
import { ClimbLogModel } from "./ClimbLogModel";
import { NoteModel } from "./NoteModel";
import { TrainingDayModel } from "./TrainingDayModel";

export class ExerciseLogModel implements ExerciseLog {
  @Property(String)
  @Required()
  id: string;

  @Property(String)
  @Required()
  exerciseId: string;

  @Property(() => ExerciseModel)
  @Required()
  exercise: ExerciseModel;

  @Property(Number)
  @Integer()
  @Allow(null)
  sets: number | null;

  @Property(Number)
  @Integer()
  @Allow(null)
  reps: number | null;

  @Property(Number)
  @Integer()
  @Allow(null)
  weight: number | null;

  @Property(Number)
  @Integer()
  @Allow(null)
  duration: number | null;

  @CollectionOf(() => ClimbLogModel)
  @Required()
  climbLog: ClimbLogModel[];

  @Property(() => NoteModel)
  @Allow(null)
  note: NoteModel | null;

  @Property(String)
  @Allow(null)
  noteId: string | null;

  @Property(() => TrainingDayModel)
  @Allow(null)
  TrainingDay: TrainingDayModel | null;

  @Property(String)
  @Allow(null)
  trainingDayId: string | null;
}

