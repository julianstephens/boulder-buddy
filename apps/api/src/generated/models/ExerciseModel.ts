import { Exercise } from "../client";
import { Required, Property, Enum, Integer, Allow, CollectionOf } from "@tsed/schema";
import { ExerciseType, Equipment } from "../enums";
import { NoteModel } from "./NoteModel";
import { ExerciseLogModel } from "./ExerciseLogModel";
import { RoutineModel } from "./RoutineModel";

export class ExerciseModel implements Exercise {
  @Property(String)
  @Required()
  id: string;

  @Property(String)
  @Required()
  name: string;

  @Required()
  @Enum(ExerciseType)
  type: ExerciseType;

  @Required()
  @Enum(Equipment)
  equipment: Equipment;

  @Property(Number)
  @Integer()
  @Allow(null)
  imageId: number | null;

  @Property(() => NoteModel)
  @Allow(null)
  note: NoteModel | null;

  @Property(String)
  @Allow(null)
  noteId: string | null;

  @CollectionOf(() => ExerciseLogModel)
  @Required()
  history: ExerciseLogModel[];

  @CollectionOf(() => RoutineModel)
  @Required()
  routines: RoutineModel[];
}

