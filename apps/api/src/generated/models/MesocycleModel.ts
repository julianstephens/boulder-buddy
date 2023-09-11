import { Mesocycle } from "../client";
import { Required, Property, Allow, Integer, CollectionOf } from "@tsed/schema";
import { UserModel } from "./UserModel";
import { MicrocycleModel } from "./MicrocycleModel";

export class MesocycleModel implements Mesocycle {
  @Property(String)
  @Required()
  id: string;

  @Property(String)
  @Required()
  goal: string;

  @Property(String)
  @Allow(null)
  description: string | null;

  @Property(Number)
  @Integer()
  @Required()
  startDate: number;

  @Property(Number)
  @Integer()
  @Required()
  endDate: number;

  @Property(Number)
  @Integer()
  @Required()
  numMicros: number;

  @Property(String)
  @Required()
  userId: string;

  @Property(Boolean)
  @Required()
  isActive: boolean;

  @Property(() => UserModel)
  @Required()
  user: UserModel;

  @CollectionOf(() => MicrocycleModel)
  @Required()
  microcycles: MicrocycleModel[];
}

