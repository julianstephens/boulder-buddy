import { Account } from "../client";
import { Required, Property, Allow, Integer } from "@tsed/schema";
import { UserModel } from "./UserModel";

export class AccountModel implements Account {
  @Property(String)
  @Required()
  id: string;

  @Property(String)
  @Required()
  userId: string;

  @Property(String)
  @Required()
  type: string;

  @Property(String)
  @Required()
  provider: string;

  @Property(String)
  @Required()
  providerAccountId: string;

  @Property(String)
  @Allow(null)
  refresh_token: string | null;

  @Property(String)
  @Allow(null)
  access_token: string | null;

  @Property(Number)
  @Integer()
  @Allow(null)
  expires_at: number | null;

  @Property(String)
  @Allow(null)
  token_type: string | null;

  @Property(String)
  @Allow(null)
  scope: string | null;

  @Property(String)
  @Allow(null)
  id_token: string | null;

  @Property(String)
  @Allow(null)
  session_state: string | null;

  @Property(() => UserModel)
  @Required()
  user: UserModel;
}

