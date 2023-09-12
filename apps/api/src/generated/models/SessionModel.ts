import { Session } from "../client";
import { Required, Property, Format } from "@tsed/schema";
import { UserModel } from "./UserModel";

export class SessionModel implements Session {
  @Property(String)
  @Required()
  id: string;

  @Property(String)
  @Required()
  sessionToken: string;

  @Property(String)
  @Required()
  userId: string;

  @Property(Date)
  @Format("date-time")
  @Required()
  expires: Date;

  @Property(() => UserModel)
  @Required()
  user: UserModel;
}

