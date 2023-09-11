import { isArray } from "@tsed/core";
import { deserialize } from "@tsed/json-mapper";
import { Injectable, Inject } from "@tsed/di";
import { PrismaService } from "../services/PrismaService";
import { Prisma, RoutineSubtype } from "../client";
import { RoutineSubtypeModel } from "../models";

@Injectable()
export class RoutineSubtypesRepository {
  @Inject()
  protected prisma: PrismaService;

  get collection() {
    return this.prisma.routineSubtype
  }

  get groupBy() {
    return this.collection.groupBy.bind(this.collection)
  }

  protected deserialize<T>(obj: null | RoutineSubtype | RoutineSubtype[]): T {
    return deserialize<T>(obj, { type: RoutineSubtypeModel, collectionType: isArray(obj) ? Array : undefined })
  }

  async findUnique(args: Prisma.RoutineSubtypeFindUniqueArgs): Promise<RoutineSubtypeModel | null> {
    const obj = await this.collection.findUnique(args);
    return this.deserialize<RoutineSubtypeModel | null>(obj);
  }

  async findFirst(args: Prisma.RoutineSubtypeFindFirstArgs): Promise<RoutineSubtypeModel | null> {
    const obj = await this.collection.findFirst(args);
    return this.deserialize<RoutineSubtypeModel | null>(obj);
  }

  async findMany(args?: Prisma.RoutineSubtypeFindManyArgs): Promise<RoutineSubtypeModel[]> {
    const obj = await this.collection.findMany(args);
    return this.deserialize<RoutineSubtypeModel[]>(obj);
  }

  async create(args: Prisma.RoutineSubtypeCreateArgs): Promise<RoutineSubtypeModel> {
    const obj = await this.collection.create(args);
    return this.deserialize<RoutineSubtypeModel>(obj);
  }

  async update(args: Prisma.RoutineSubtypeUpdateArgs): Promise<RoutineSubtypeModel> {
    const obj = await this.collection.update(args);
    return this.deserialize<RoutineSubtypeModel>(obj);
  }

  async upsert(args: Prisma.RoutineSubtypeUpsertArgs): Promise<RoutineSubtypeModel> {
    const obj = await this.collection.upsert(args);
    return this.deserialize<RoutineSubtypeModel>(obj);
  }

  async delete(args: Prisma.RoutineSubtypeDeleteArgs): Promise<RoutineSubtypeModel> {
    const obj = await this.collection.delete(args);
    return this.deserialize<RoutineSubtypeModel>(obj);
  }

  deleteMany(args: Prisma.RoutineSubtypeDeleteManyArgs) {
    return this.collection.deleteMany(args)
  }

  updateMany(args: Prisma.RoutineSubtypeUpdateManyArgs) {
    return this.collection.updateMany(args)
  }

  aggregate(args: Prisma.RoutineSubtypeAggregateArgs) {
    return this.collection.aggregate(args)
  }
}
