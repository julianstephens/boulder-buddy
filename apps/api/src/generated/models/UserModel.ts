import { User } from "../client";
import { Required, Property, Allow, Format, CollectionOf } from "@tsed/schema";
import { AccountModel } from "./AccountModel";
import { SessionModel } from "./SessionModel";
import { MesocycleModel } from "./MesocycleModel";

export class UserModel implements User {
  @Property(String)
  @Required()
  id: string;

  @Property(String)
  @Allow(null)
  name: string | null;

  @Property(String)
  @Allow(null)
  email: string | null;

  @Property(Date)
  @Format("date-time")
  @Allow(null)
  emailVerified: Date | null;

  @Property(String)
  @Allow(null)
  image: string | null;

  @CollectionOf(() => AccountModel)
  @Required()
  accounts: AccountModel[];

  @CollectionOf(() => SessionModel)
  @Required()
  sessions: SessionModel[];

  @CollectionOf(() => MesocycleModel)
  @Required()
  mesocycles: MesocycleModel[];
}

