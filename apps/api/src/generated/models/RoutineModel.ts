import { Routine } from "../client";
import { Required, Property, Integer, Allow, Enum, CollectionOf } from "@tsed/schema";
import { RoutineType } from "../enums";
import { ExerciseModel } from "./ExerciseModel";
import { TrainingDayModel } from "./TrainingDayModel";
import { RoutineSubtypeModel } from "./RoutineSubtypeModel";
import { NoteModel } from "./NoteModel";

export class RoutineModel implements Routine {
  @Property(String)
  @Required()
  id: string;

  @Property(String)
  @Required()
  name: string;

  @Property(Number)
  @Integer()
  @Allow(null)
  duration: number | null;

  @Required()
  @Enum(RoutineType)
  type: RoutineType;

  @Property(String)
  @Required()
  sortOrder: string;

  @CollectionOf(() => ExerciseModel)
  @Required()
  exercises: ExerciseModel[];

  @CollectionOf(() => TrainingDayModel)
  @Required()
  trainingDays: TrainingDayModel[];

  @Property(() => RoutineSubtypeModel)
  @Allow(null)
  routineSubtype: RoutineSubtypeModel | null;

  @Property(String)
  @Allow(null)
  routineSubtypeId: string | null;

  @Property(() => NoteModel)
  @Allow(null)
  note: NoteModel | null;

  @Property(String)
  @Allow(null)
  noteId: string | null;
}

