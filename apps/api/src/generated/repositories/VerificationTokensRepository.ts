import { isArray } from "@tsed/core";
import { deserialize } from "@tsed/json-mapper";
import { Injectable, Inject } from "@tsed/di";
import { PrismaService } from "../services/PrismaService";
import { Prisma, VerificationToken } from "../client";
import { VerificationTokenModel } from "../models";

@Injectable()
export class VerificationTokensRepository {
  @Inject()
  protected prisma: PrismaService;

  get collection() {
    return this.prisma.verificationToken
  }

  get groupBy() {
    return this.collection.groupBy.bind(this.collection)
  }

  protected deserialize<T>(obj: null | VerificationToken | VerificationToken[]): T {
    return deserialize<T>(obj, { type: VerificationTokenModel, collectionType: isArray(obj) ? Array : undefined })
  }

  async findUnique(args: Prisma.VerificationTokenFindUniqueArgs): Promise<VerificationTokenModel | null> {
    const obj = await this.collection.findUnique(args);
    return this.deserialize<VerificationTokenModel | null>(obj);
  }

  async findFirst(args: Prisma.VerificationTokenFindFirstArgs): Promise<VerificationTokenModel | null> {
    const obj = await this.collection.findFirst(args);
    return this.deserialize<VerificationTokenModel | null>(obj);
  }

  async findMany(args?: Prisma.VerificationTokenFindManyArgs): Promise<VerificationTokenModel[]> {
    const obj = await this.collection.findMany(args);
    return this.deserialize<VerificationTokenModel[]>(obj);
  }

  async create(args: Prisma.VerificationTokenCreateArgs): Promise<VerificationTokenModel> {
    const obj = await this.collection.create(args);
    return this.deserialize<VerificationTokenModel>(obj);
  }

  async update(args: Prisma.VerificationTokenUpdateArgs): Promise<VerificationTokenModel> {
    const obj = await this.collection.update(args);
    return this.deserialize<VerificationTokenModel>(obj);
  }

  async upsert(args: Prisma.VerificationTokenUpsertArgs): Promise<VerificationTokenModel> {
    const obj = await this.collection.upsert(args);
    return this.deserialize<VerificationTokenModel>(obj);
  }

  async delete(args: Prisma.VerificationTokenDeleteArgs): Promise<VerificationTokenModel> {
    const obj = await this.collection.delete(args);
    return this.deserialize<VerificationTokenModel>(obj);
  }

  deleteMany(args: Prisma.VerificationTokenDeleteManyArgs) {
    return this.collection.deleteMany(args)
  }

  updateMany(args: Prisma.VerificationTokenUpdateManyArgs) {
    return this.collection.updateMany(args)
  }

  aggregate(args: Prisma.VerificationTokenAggregateArgs) {
    return this.collection.aggregate(args)
  }
}
