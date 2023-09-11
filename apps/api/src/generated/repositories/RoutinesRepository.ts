import { isArray } from "@tsed/core";
import { deserialize } from "@tsed/json-mapper";
import { Injectable, Inject } from "@tsed/di";
import { PrismaService } from "../services/PrismaService";
import { Prisma, Routine } from "../client";
import { RoutineModel } from "../models";

@Injectable()
export class RoutinesRepository {
  @Inject()
  protected prisma: PrismaService;

  get collection() {
    return this.prisma.routine
  }

  get groupBy() {
    return this.collection.groupBy.bind(this.collection)
  }

  protected deserialize<T>(obj: null | Routine | Routine[]): T {
    return deserialize<T>(obj, { type: RoutineModel, collectionType: isArray(obj) ? Array : undefined })
  }

  async findUnique(args: Prisma.RoutineFindUniqueArgs): Promise<RoutineModel | null> {
    const obj = await this.collection.findUnique(args);
    return this.deserialize<RoutineModel | null>(obj);
  }

  async findFirst(args: Prisma.RoutineFindFirstArgs): Promise<RoutineModel | null> {
    const obj = await this.collection.findFirst(args);
    return this.deserialize<RoutineModel | null>(obj);
  }

  async findMany(args?: Prisma.RoutineFindManyArgs): Promise<RoutineModel[]> {
    const obj = await this.collection.findMany(args);
    return this.deserialize<RoutineModel[]>(obj);
  }

  async create(args: Prisma.RoutineCreateArgs): Promise<RoutineModel> {
    const obj = await this.collection.create(args);
    return this.deserialize<RoutineModel>(obj);
  }

  async update(args: Prisma.RoutineUpdateArgs): Promise<RoutineModel> {
    const obj = await this.collection.update(args);
    return this.deserialize<RoutineModel>(obj);
  }

  async upsert(args: Prisma.RoutineUpsertArgs): Promise<RoutineModel> {
    const obj = await this.collection.upsert(args);
    return this.deserialize<RoutineModel>(obj);
  }

  async delete(args: Prisma.RoutineDeleteArgs): Promise<RoutineModel> {
    const obj = await this.collection.delete(args);
    return this.deserialize<RoutineModel>(obj);
  }

  deleteMany(args: Prisma.RoutineDeleteManyArgs) {
    return this.collection.deleteMany(args)
  }

  updateMany(args: Prisma.RoutineUpdateManyArgs) {
    return this.collection.updateMany(args)
  }

  aggregate(args: Prisma.RoutineAggregateArgs) {
    return this.collection.aggregate(args)
  }
}
