import { Location } from "../client";
import { Required, Property, Allow, CollectionOf } from "@tsed/schema";
import { NoteModel } from "./NoteModel";
import { ClimbLogModel } from "./ClimbLogModel";

export class LocationModel implements Location {
  @Property(String)
  @Required()
  id: string;

  @Property(String)
  @Required()
  name: string;

  @Property(String)
  @Allow(null)
  address: string | null;

  @Property(() => NoteModel)
  @Allow(null)
  note: NoteModel | null;

  @CollectionOf(() => ClimbLogModel)
  @Required()
  climbs: ClimbLogModel[];

  @Property(String)
  @Allow(null)
  noteId: string | null;
}

