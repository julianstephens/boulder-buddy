import { Microcycle } from "../client";
import { Required, Property, Integer, Enum, Allow, CollectionOf } from "@tsed/schema";
import { CycleSchema } from "../enums";
import { MesocycleModel } from "./MesocycleModel";
import { TrainingDayModel } from "./TrainingDayModel";

export class MicrocycleModel implements Microcycle {
  @Property(String)
  @Required()
  id: string;

  @Property(String)
  @Required()
  goal: string;

  @Property(Number)
  @Integer()
  @Required()
  startDate: number;

  @Property(Number)
  @Integer()
  @Required()
  endDate: number;

  @Required()
  @Enum(CycleSchema)
  schema: CycleSchema;

  @Property(String)
  @Allow(null)
  description: string | null;

  @Property(String)
  @Required()
  mesoId: string;

  @Property(() => MesocycleModel)
  @Required()
  mesocycle: MesocycleModel;

  @CollectionOf(() => TrainingDayModel)
  @Required()
  trainingDays: TrainingDayModel[];
}

