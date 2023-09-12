import { isArray } from "@tsed/core";
import { deserialize } from "@tsed/json-mapper";
import { Injectable, Inject } from "@tsed/di";
import { PrismaService } from "../services/PrismaService";
import { Prisma, RecoveryLevel } from "../client";
import { RecoveryLevelModel } from "../models";

@Injectable()
export class RecoveryLevelsRepository {
  @Inject()
  protected prisma: PrismaService;

  get collection() {
    return this.prisma.recoveryLevel
  }

  get groupBy() {
    return this.collection.groupBy.bind(this.collection)
  }

  protected deserialize<T>(obj: null | RecoveryLevel | RecoveryLevel[]): T {
    return deserialize<T>(obj, { type: RecoveryLevelModel, collectionType: isArray(obj) ? Array : undefined })
  }

  async findUnique(args: Prisma.RecoveryLevelFindUniqueArgs): Promise<RecoveryLevelModel | null> {
    const obj = await this.collection.findUnique(args);
    return this.deserialize<RecoveryLevelModel | null>(obj);
  }

  async findFirst(args: Prisma.RecoveryLevelFindFirstArgs): Promise<RecoveryLevelModel | null> {
    const obj = await this.collection.findFirst(args);
    return this.deserialize<RecoveryLevelModel | null>(obj);
  }

  async findMany(args?: Prisma.RecoveryLevelFindManyArgs): Promise<RecoveryLevelModel[]> {
    const obj = await this.collection.findMany(args);
    return this.deserialize<RecoveryLevelModel[]>(obj);
  }

  async create(args: Prisma.RecoveryLevelCreateArgs): Promise<RecoveryLevelModel> {
    const obj = await this.collection.create(args);
    return this.deserialize<RecoveryLevelModel>(obj);
  }

  async update(args: Prisma.RecoveryLevelUpdateArgs): Promise<RecoveryLevelModel> {
    const obj = await this.collection.update(args);
    return this.deserialize<RecoveryLevelModel>(obj);
  }

  async upsert(args: Prisma.RecoveryLevelUpsertArgs): Promise<RecoveryLevelModel> {
    const obj = await this.collection.upsert(args);
    return this.deserialize<RecoveryLevelModel>(obj);
  }

  async delete(args: Prisma.RecoveryLevelDeleteArgs): Promise<RecoveryLevelModel> {
    const obj = await this.collection.delete(args);
    return this.deserialize<RecoveryLevelModel>(obj);
  }

  deleteMany(args: Prisma.RecoveryLevelDeleteManyArgs) {
    return this.collection.deleteMany(args)
  }

  updateMany(args: Prisma.RecoveryLevelUpdateManyArgs) {
    return this.collection.updateMany(args)
  }

  aggregate(args: Prisma.RecoveryLevelAggregateArgs) {
    return this.collection.aggregate(args)
  }
}
