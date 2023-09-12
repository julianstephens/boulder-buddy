import { isArray } from "@tsed/core";
import { deserialize } from "@tsed/json-mapper";
import { Injectable, Inject } from "@tsed/di";
import { PrismaService } from "../services/PrismaService";
import { Prisma, TrainingDay } from "../client";
import { TrainingDayModel } from "../models";

@Injectable()
export class TrainingDaysRepository {
  @Inject()
  protected prisma: PrismaService;

  get collection() {
    return this.prisma.trainingDay
  }

  get groupBy() {
    return this.collection.groupBy.bind(this.collection)
  }

  protected deserialize<T>(obj: null | TrainingDay | TrainingDay[]): T {
    return deserialize<T>(obj, { type: TrainingDayModel, collectionType: isArray(obj) ? Array : undefined })
  }

  async findUnique(args: Prisma.TrainingDayFindUniqueArgs): Promise<TrainingDayModel | null> {
    const obj = await this.collection.findUnique(args);
    return this.deserialize<TrainingDayModel | null>(obj);
  }

  async findFirst(args: Prisma.TrainingDayFindFirstArgs): Promise<TrainingDayModel | null> {
    const obj = await this.collection.findFirst(args);
    return this.deserialize<TrainingDayModel | null>(obj);
  }

  async findMany(args?: Prisma.TrainingDayFindManyArgs): Promise<TrainingDayModel[]> {
    const obj = await this.collection.findMany(args);
    return this.deserialize<TrainingDayModel[]>(obj);
  }

  async create(args: Prisma.TrainingDayCreateArgs): Promise<TrainingDayModel> {
    const obj = await this.collection.create(args);
    return this.deserialize<TrainingDayModel>(obj);
  }

  async update(args: Prisma.TrainingDayUpdateArgs): Promise<TrainingDayModel> {
    const obj = await this.collection.update(args);
    return this.deserialize<TrainingDayModel>(obj);
  }

  async upsert(args: Prisma.TrainingDayUpsertArgs): Promise<TrainingDayModel> {
    const obj = await this.collection.upsert(args);
    return this.deserialize<TrainingDayModel>(obj);
  }

  async delete(args: Prisma.TrainingDayDeleteArgs): Promise<TrainingDayModel> {
    const obj = await this.collection.delete(args);
    return this.deserialize<TrainingDayModel>(obj);
  }

  deleteMany(args: Prisma.TrainingDayDeleteManyArgs) {
    return this.collection.deleteMany(args)
  }

  updateMany(args: Prisma.TrainingDayUpdateManyArgs) {
    return this.collection.updateMany(args)
  }

  aggregate(args: Prisma.TrainingDayAggregateArgs) {
    return this.collection.aggregate(args)
  }
}
