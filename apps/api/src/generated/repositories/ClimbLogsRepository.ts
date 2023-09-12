import { isArray } from "@tsed/core";
import { deserialize } from "@tsed/json-mapper";
import { Injectable, Inject } from "@tsed/di";
import { PrismaService } from "../services/PrismaService";
import { Prisma, ClimbLog } from "../client";
import { ClimbLogModel } from "../models";

@Injectable()
export class ClimbLogsRepository {
  @Inject()
  protected prisma: PrismaService;

  get collection() {
    return this.prisma.climbLog
  }

  get groupBy() {
    return this.collection.groupBy.bind(this.collection)
  }

  protected deserialize<T>(obj: null | ClimbLog | ClimbLog[]): T {
    return deserialize<T>(obj, { type: ClimbLogModel, collectionType: isArray(obj) ? Array : undefined })
  }

  async findUnique(args: Prisma.ClimbLogFindUniqueArgs): Promise<ClimbLogModel | null> {
    const obj = await this.collection.findUnique(args);
    return this.deserialize<ClimbLogModel | null>(obj);
  }

  async findFirst(args: Prisma.ClimbLogFindFirstArgs): Promise<ClimbLogModel | null> {
    const obj = await this.collection.findFirst(args);
    return this.deserialize<ClimbLogModel | null>(obj);
  }

  async findMany(args?: Prisma.ClimbLogFindManyArgs): Promise<ClimbLogModel[]> {
    const obj = await this.collection.findMany(args);
    return this.deserialize<ClimbLogModel[]>(obj);
  }

  async create(args: Prisma.ClimbLogCreateArgs): Promise<ClimbLogModel> {
    const obj = await this.collection.create(args);
    return this.deserialize<ClimbLogModel>(obj);
  }

  async update(args: Prisma.ClimbLogUpdateArgs): Promise<ClimbLogModel> {
    const obj = await this.collection.update(args);
    return this.deserialize<ClimbLogModel>(obj);
  }

  async upsert(args: Prisma.ClimbLogUpsertArgs): Promise<ClimbLogModel> {
    const obj = await this.collection.upsert(args);
    return this.deserialize<ClimbLogModel>(obj);
  }

  async delete(args: Prisma.ClimbLogDeleteArgs): Promise<ClimbLogModel> {
    const obj = await this.collection.delete(args);
    return this.deserialize<ClimbLogModel>(obj);
  }

  deleteMany(args: Prisma.ClimbLogDeleteManyArgs) {
    return this.collection.deleteMany(args)
  }

  updateMany(args: Prisma.ClimbLogUpdateManyArgs) {
    return this.collection.updateMany(args)
  }

  aggregate(args: Prisma.ClimbLogAggregateArgs) {
    return this.collection.aggregate(args)
  }
}
