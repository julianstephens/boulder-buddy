import { Note } from "../client";
import { Required, Property, CollectionOf } from "@tsed/schema";
import { TrainingDayModel } from "./TrainingDayModel";
import { ExerciseModel } from "./ExerciseModel";
import { ClimbLogModel } from "./ClimbLogModel";
import { LocationModel } from "./LocationModel";
import { RoutineModel } from "./RoutineModel";
import { ExerciseLogModel } from "./ExerciseLogModel";

export class NoteModel implements Note {
  @Property(String)
  @Required()
  id: string;

  @Property(String)
  @Required()
  text: string;

  @CollectionOf(() => TrainingDayModel)
  @Required()
  trainingDays: TrainingDayModel[];

  @CollectionOf(() => ExerciseModel)
  @Required()
  exercises: ExerciseModel[];

  @CollectionOf(() => ClimbLogModel)
  @Required()
  climbs: ClimbLogModel[];

  @CollectionOf(() => LocationModel)
  @Required()
  locations: LocationModel[];

  @CollectionOf(() => RoutineModel)
  @Required()
  routines: RoutineModel[];

  @CollectionOf(() => ExerciseLogModel)
  @Required()
  WorkoutLog: ExerciseLogModel[];
}

