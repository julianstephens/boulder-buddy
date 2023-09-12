import { RoutineSubtype } from "../client";
import { Required, Property, CollectionOf } from "@tsed/schema";
import { RoutineModel } from "./RoutineModel";

export class RoutineSubtypeModel implements RoutineSubtype {
  @Property(String)
  @Required()
  id: string;

  @Property(String)
  @Required()
  type: string;

  @CollectionOf(() => RoutineModel)
  @Required()
  routine: RoutineModel[];
}

