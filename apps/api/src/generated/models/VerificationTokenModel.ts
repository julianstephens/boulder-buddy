import { VerificationToken } from "../client";
import { Required, Property, Format } from "@tsed/schema";

export class VerificationTokenModel implements VerificationToken {
  @Property(String)
  @Required()
  identifier: string;

  @Property(String)
  @Required()
  token: string;

  @Property(Date)
  @Format("date-time")
  @Required()
  expires: Date;
}

