import { isArray } from "@tsed/core";
import { deserialize } from "@tsed/json-mapper";
import { Injectable, Inject } from "@tsed/di";
import { PrismaService } from "../services/PrismaService";
import { Prisma, Location } from "../client";
import { LocationModel } from "../models";

@Injectable()
export class LocationsRepository {
  @Inject()
  protected prisma: PrismaService;

  get collection() {
    return this.prisma.location
  }

  get groupBy() {
    return this.collection.groupBy.bind(this.collection)
  }

  protected deserialize<T>(obj: null | Location | Location[]): T {
    return deserialize<T>(obj, { type: LocationModel, collectionType: isArray(obj) ? Array : undefined })
  }

  async findUnique(args: Prisma.LocationFindUniqueArgs): Promise<LocationModel | null> {
    const obj = await this.collection.findUnique(args);
    return this.deserialize<LocationModel | null>(obj);
  }

  async findFirst(args: Prisma.LocationFindFirstArgs): Promise<LocationModel | null> {
    const obj = await this.collection.findFirst(args);
    return this.deserialize<LocationModel | null>(obj);
  }

  async findMany(args?: Prisma.LocationFindManyArgs): Promise<LocationModel[]> {
    const obj = await this.collection.findMany(args);
    return this.deserialize<LocationModel[]>(obj);
  }

  async create(args: Prisma.LocationCreateArgs): Promise<LocationModel> {
    const obj = await this.collection.create(args);
    return this.deserialize<LocationModel>(obj);
  }

  async update(args: Prisma.LocationUpdateArgs): Promise<LocationModel> {
    const obj = await this.collection.update(args);
    return this.deserialize<LocationModel>(obj);
  }

  async upsert(args: Prisma.LocationUpsertArgs): Promise<LocationModel> {
    const obj = await this.collection.upsert(args);
    return this.deserialize<LocationModel>(obj);
  }

  async delete(args: Prisma.LocationDeleteArgs): Promise<LocationModel> {
    const obj = await this.collection.delete(args);
    return this.deserialize<LocationModel>(obj);
  }

  deleteMany(args: Prisma.LocationDeleteManyArgs) {
    return this.collection.deleteMany(args)
  }

  updateMany(args: Prisma.LocationUpdateManyArgs) {
    return this.collection.updateMany(args)
  }

  aggregate(args: Prisma.LocationAggregateArgs) {
    return this.collection.aggregate(args)
  }
}
