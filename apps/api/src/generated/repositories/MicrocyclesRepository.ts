import { isArray } from "@tsed/core";
import { deserialize } from "@tsed/json-mapper";
import { Injectable, Inject } from "@tsed/di";
import { PrismaService } from "../services/PrismaService";
import { Prisma, Microcycle } from "../client";
import { MicrocycleModel } from "../models";

@Injectable()
export class MicrocyclesRepository {
  @Inject()
  protected prisma: PrismaService;

  get collection() {
    return this.prisma.microcycle
  }

  get groupBy() {
    return this.collection.groupBy.bind(this.collection)
  }

  protected deserialize<T>(obj: null | Microcycle | Microcycle[]): T {
    return deserialize<T>(obj, { type: MicrocycleModel, collectionType: isArray(obj) ? Array : undefined })
  }

  async findUnique(args: Prisma.MicrocycleFindUniqueArgs): Promise<MicrocycleModel | null> {
    const obj = await this.collection.findUnique(args);
    return this.deserialize<MicrocycleModel | null>(obj);
  }

  async findFirst(args: Prisma.MicrocycleFindFirstArgs): Promise<MicrocycleModel | null> {
    const obj = await this.collection.findFirst(args);
    return this.deserialize<MicrocycleModel | null>(obj);
  }

  async findMany(args?: Prisma.MicrocycleFindManyArgs): Promise<MicrocycleModel[]> {
    const obj = await this.collection.findMany(args);
    return this.deserialize<MicrocycleModel[]>(obj);
  }

  async create(args: Prisma.MicrocycleCreateArgs): Promise<MicrocycleModel> {
    const obj = await this.collection.create(args);
    return this.deserialize<MicrocycleModel>(obj);
  }

  async update(args: Prisma.MicrocycleUpdateArgs): Promise<MicrocycleModel> {
    const obj = await this.collection.update(args);
    return this.deserialize<MicrocycleModel>(obj);
  }

  async upsert(args: Prisma.MicrocycleUpsertArgs): Promise<MicrocycleModel> {
    const obj = await this.collection.upsert(args);
    return this.deserialize<MicrocycleModel>(obj);
  }

  async delete(args: Prisma.MicrocycleDeleteArgs): Promise<MicrocycleModel> {
    const obj = await this.collection.delete(args);
    return this.deserialize<MicrocycleModel>(obj);
  }

  deleteMany(args: Prisma.MicrocycleDeleteManyArgs) {
    return this.collection.deleteMany(args)
  }

  updateMany(args: Prisma.MicrocycleUpdateManyArgs) {
    return this.collection.updateMany(args)
  }

  aggregate(args: Prisma.MicrocycleAggregateArgs) {
    return this.collection.aggregate(args)
  }
}
