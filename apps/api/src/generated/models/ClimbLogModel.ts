import { ClimbLog } from "../client";
import { Required, Property, Allow, Integer } from "@tsed/schema";
import { LocationModel } from "./LocationModel";
import { NoteModel } from "./NoteModel";
import { ExerciseLogModel } from "./ExerciseLogModel";

export class ClimbLogModel implements ClimbLog {
  @Property(String)
  @Required()
  id: string;

  @Property(String)
  @Allow(null)
  name: string | null;

  @Property(Number)
  @Integer()
  @Required()
  grade: number;

  @Property(Boolean)
  @Allow(null)
  project: boolean | null;

  @Property(Number)
  @Integer()
  @Allow(null)
  attempts: number | null;

  @Property(Boolean)
  @Allow(null)
  flashed: boolean | null;

  @Property(() => LocationModel)
  @Allow(null)
  location: LocationModel | null;

  @Property(String)
  @Allow(null)
  locationId: string | null;

  @Property(() => NoteModel)
  @Allow(null)
  note: NoteModel | null;

  @Property(String)
  @Allow(null)
  noteId: string | null;

  @Property(() => ExerciseLogModel)
  @Allow(null)
  WorkoutLog: ExerciseLogModel | null;

  @Property(String)
  @Allow(null)
  workoutLogId: string | null;
}

