import { isArray } from "@tsed/core";
import { deserialize } from "@tsed/json-mapper";
import { Injectable, Inject } from "@tsed/di";
import { PrismaService } from "../services/PrismaService";
import { Prisma, ExerciseLog } from "../client";
import { ExerciseLogModel } from "../models";

@Injectable()
export class ExerciseLogsRepository {
  @Inject()
  protected prisma: PrismaService;

  get collection() {
    return this.prisma.exerciseLog
  }

  get groupBy() {
    return this.collection.groupBy.bind(this.collection)
  }

  protected deserialize<T>(obj: null | ExerciseLog | ExerciseLog[]): T {
    return deserialize<T>(obj, { type: ExerciseLogModel, collectionType: isArray(obj) ? Array : undefined })
  }

  async findUnique(args: Prisma.ExerciseLogFindUniqueArgs): Promise<ExerciseLogModel | null> {
    const obj = await this.collection.findUnique(args);
    return this.deserialize<ExerciseLogModel | null>(obj);
  }

  async findFirst(args: Prisma.ExerciseLogFindFirstArgs): Promise<ExerciseLogModel | null> {
    const obj = await this.collection.findFirst(args);
    return this.deserialize<ExerciseLogModel | null>(obj);
  }

  async findMany(args?: Prisma.ExerciseLogFindManyArgs): Promise<ExerciseLogModel[]> {
    const obj = await this.collection.findMany(args);
    return this.deserialize<ExerciseLogModel[]>(obj);
  }

  async create(args: Prisma.ExerciseLogCreateArgs): Promise<ExerciseLogModel> {
    const obj = await this.collection.create(args);
    return this.deserialize<ExerciseLogModel>(obj);
  }

  async update(args: Prisma.ExerciseLogUpdateArgs): Promise<ExerciseLogModel> {
    const obj = await this.collection.update(args);
    return this.deserialize<ExerciseLogModel>(obj);
  }

  async upsert(args: Prisma.ExerciseLogUpsertArgs): Promise<ExerciseLogModel> {
    const obj = await this.collection.upsert(args);
    return this.deserialize<ExerciseLogModel>(obj);
  }

  async delete(args: Prisma.ExerciseLogDeleteArgs): Promise<ExerciseLogModel> {
    const obj = await this.collection.delete(args);
    return this.deserialize<ExerciseLogModel>(obj);
  }

  deleteMany(args: Prisma.ExerciseLogDeleteManyArgs) {
    return this.collection.deleteMany(args)
  }

  updateMany(args: Prisma.ExerciseLogUpdateManyArgs) {
    return this.collection.updateMany(args)
  }

  aggregate(args: Prisma.ExerciseLogAggregateArgs) {
    return this.collection.aggregate(args)
  }
}
