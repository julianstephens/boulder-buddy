import { isArray } from "@tsed/core";
import { deserialize } from "@tsed/json-mapper";
import { Injectable, Inject } from "@tsed/di";
import { PrismaService } from "../services/PrismaService";
import { Prisma, Exercise } from "../client";
import { ExerciseModel } from "../models";

@Injectable()
export class ExercisesRepository {
  @Inject()
  protected prisma: PrismaService;

  get collection() {
    return this.prisma.exercise
  }

  get groupBy() {
    return this.collection.groupBy.bind(this.collection)
  }

  protected deserialize<T>(obj: null | Exercise | Exercise[]): T {
    return deserialize<T>(obj, { type: ExerciseModel, collectionType: isArray(obj) ? Array : undefined })
  }

  async findUnique(args: Prisma.ExerciseFindUniqueArgs): Promise<ExerciseModel | null> {
    const obj = await this.collection.findUnique(args);
    return this.deserialize<ExerciseModel | null>(obj);
  }

  async findFirst(args: Prisma.ExerciseFindFirstArgs): Promise<ExerciseModel | null> {
    const obj = await this.collection.findFirst(args);
    return this.deserialize<ExerciseModel | null>(obj);
  }

  async findMany(args?: Prisma.ExerciseFindManyArgs): Promise<ExerciseModel[]> {
    const obj = await this.collection.findMany(args);
    return this.deserialize<ExerciseModel[]>(obj);
  }

  async create(args: Prisma.ExerciseCreateArgs): Promise<ExerciseModel> {
    const obj = await this.collection.create(args);
    return this.deserialize<ExerciseModel>(obj);
  }

  async update(args: Prisma.ExerciseUpdateArgs): Promise<ExerciseModel> {
    const obj = await this.collection.update(args);
    return this.deserialize<ExerciseModel>(obj);
  }

  async upsert(args: Prisma.ExerciseUpsertArgs): Promise<ExerciseModel> {
    const obj = await this.collection.upsert(args);
    return this.deserialize<ExerciseModel>(obj);
  }

  async delete(args: Prisma.ExerciseDeleteArgs): Promise<ExerciseModel> {
    const obj = await this.collection.delete(args);
    return this.deserialize<ExerciseModel>(obj);
  }

  deleteMany(args: Prisma.ExerciseDeleteManyArgs) {
    return this.collection.deleteMany(args)
  }

  updateMany(args: Prisma.ExerciseUpdateManyArgs) {
    return this.collection.updateMany(args)
  }

  aggregate(args: Prisma.ExerciseAggregateArgs) {
    return this.collection.aggregate(args)
  }
}
