import { isArray } from "@tsed/core";
import { deserialize } from "@tsed/json-mapper";
import { Injectable, Inject } from "@tsed/di";
import { PrismaService } from "../services/PrismaService";
import { Prisma, Session } from "../client";
import { SessionModel } from "../models";

@Injectable()
export class SessionsRepository {
  @Inject()
  protected prisma: PrismaService;

  get collection() {
    return this.prisma.session
  }

  get groupBy() {
    return this.collection.groupBy.bind(this.collection)
  }

  protected deserialize<T>(obj: null | Session | Session[]): T {
    return deserialize<T>(obj, { type: SessionModel, collectionType: isArray(obj) ? Array : undefined })
  }

  async findUnique(args: Prisma.SessionFindUniqueArgs): Promise<SessionModel | null> {
    const obj = await this.collection.findUnique(args);
    return this.deserialize<SessionModel | null>(obj);
  }

  async findFirst(args: Prisma.SessionFindFirstArgs): Promise<SessionModel | null> {
    const obj = await this.collection.findFirst(args);
    return this.deserialize<SessionModel | null>(obj);
  }

  async findMany(args?: Prisma.SessionFindManyArgs): Promise<SessionModel[]> {
    const obj = await this.collection.findMany(args);
    return this.deserialize<SessionModel[]>(obj);
  }

  async create(args: Prisma.SessionCreateArgs): Promise<SessionModel> {
    const obj = await this.collection.create(args);
    return this.deserialize<SessionModel>(obj);
  }

  async update(args: Prisma.SessionUpdateArgs): Promise<SessionModel> {
    const obj = await this.collection.update(args);
    return this.deserialize<SessionModel>(obj);
  }

  async upsert(args: Prisma.SessionUpsertArgs): Promise<SessionModel> {
    const obj = await this.collection.upsert(args);
    return this.deserialize<SessionModel>(obj);
  }

  async delete(args: Prisma.SessionDeleteArgs): Promise<SessionModel> {
    const obj = await this.collection.delete(args);
    return this.deserialize<SessionModel>(obj);
  }

  deleteMany(args: Prisma.SessionDeleteManyArgs) {
    return this.collection.deleteMany(args)
  }

  updateMany(args: Prisma.SessionUpdateManyArgs) {
    return this.collection.updateMany(args)
  }

  aggregate(args: Prisma.SessionAggregateArgs) {
    return this.collection.aggregate(args)
  }
}
