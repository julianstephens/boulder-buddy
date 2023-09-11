import { isArray } from "@tsed/core";
import { deserialize } from "@tsed/json-mapper";
import { Injectable, Inject } from "@tsed/di";
import { PrismaService } from "../services/PrismaService";
import { Prisma, Mesocycle } from "../client";
import { MesocycleModel } from "../models";

@Injectable()
export class MesocyclesRepository {
  @Inject()
  protected prisma: PrismaService;

  get collection() {
    return this.prisma.mesocycle
  }

  get groupBy() {
    return this.collection.groupBy.bind(this.collection)
  }

  protected deserialize<T>(obj: null | Mesocycle | Mesocycle[]): T {
    return deserialize<T>(obj, { type: MesocycleModel, collectionType: isArray(obj) ? Array : undefined })
  }

  async findUnique(args: Prisma.MesocycleFindUniqueArgs): Promise<MesocycleModel | null> {
    const obj = await this.collection.findUnique(args);
    return this.deserialize<MesocycleModel | null>(obj);
  }

  async findFirst(args: Prisma.MesocycleFindFirstArgs): Promise<MesocycleModel | null> {
    const obj = await this.collection.findFirst(args);
    return this.deserialize<MesocycleModel | null>(obj);
  }

  async findMany(args?: Prisma.MesocycleFindManyArgs): Promise<MesocycleModel[]> {
    const obj = await this.collection.findMany(args);
    return this.deserialize<MesocycleModel[]>(obj);
  }

  async create(args: Prisma.MesocycleCreateArgs): Promise<MesocycleModel> {
    const obj = await this.collection.create(args);
    return this.deserialize<MesocycleModel>(obj);
  }

  async update(args: Prisma.MesocycleUpdateArgs): Promise<MesocycleModel> {
    const obj = await this.collection.update(args);
    return this.deserialize<MesocycleModel>(obj);
  }

  async upsert(args: Prisma.MesocycleUpsertArgs): Promise<MesocycleModel> {
    const obj = await this.collection.upsert(args);
    return this.deserialize<MesocycleModel>(obj);
  }

  async delete(args: Prisma.MesocycleDeleteArgs): Promise<MesocycleModel> {
    const obj = await this.collection.delete(args);
    return this.deserialize<MesocycleModel>(obj);
  }

  deleteMany(args: Prisma.MesocycleDeleteManyArgs) {
    return this.collection.deleteMany(args)
  }

  updateMany(args: Prisma.MesocycleUpdateManyArgs) {
    return this.collection.updateMany(args)
  }

  aggregate(args: Prisma.MesocycleAggregateArgs) {
    return this.collection.aggregate(args)
  }
}
