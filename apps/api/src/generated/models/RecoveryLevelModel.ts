import { RecoveryLevel } from "../client";
import { Required, Property, CollectionOf } from "@tsed/schema";
import { TrainingDayModel } from "./TrainingDayModel";

export class RecoveryLevelModel implements RecoveryLevel {
  @Property(String)
  @Required()
  id: string;

  @Property(String)
  @Required()
  level: string;

  @CollectionOf(() => TrainingDayModel)
  @Required()
  trainingDays: TrainingDayModel[];
}

