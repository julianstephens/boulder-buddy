import { isArray } from "@tsed/core";
import { deserialize } from "@tsed/json-mapper";
import { Injectable, Inject } from "@tsed/di";
import { PrismaService } from "../services/PrismaService";
import { Prisma, Note } from "../client";
import { NoteModel } from "../models";

@Injectable()
export class NotesRepository {
  @Inject()
  protected prisma: PrismaService;

  get collection() {
    return this.prisma.note
  }

  get groupBy() {
    return this.collection.groupBy.bind(this.collection)
  }

  protected deserialize<T>(obj: null | Note | Note[]): T {
    return deserialize<T>(obj, { type: NoteModel, collectionType: isArray(obj) ? Array : undefined })
  }

  async findUnique(args: Prisma.NoteFindUniqueArgs): Promise<NoteModel | null> {
    const obj = await this.collection.findUnique(args);
    return this.deserialize<NoteModel | null>(obj);
  }

  async findFirst(args: Prisma.NoteFindFirstArgs): Promise<NoteModel | null> {
    const obj = await this.collection.findFirst(args);
    return this.deserialize<NoteModel | null>(obj);
  }

  async findMany(args?: Prisma.NoteFindManyArgs): Promise<NoteModel[]> {
    const obj = await this.collection.findMany(args);
    return this.deserialize<NoteModel[]>(obj);
  }

  async create(args: Prisma.NoteCreateArgs): Promise<NoteModel> {
    const obj = await this.collection.create(args);
    return this.deserialize<NoteModel>(obj);
  }

  async update(args: Prisma.NoteUpdateArgs): Promise<NoteModel> {
    const obj = await this.collection.update(args);
    return this.deserialize<NoteModel>(obj);
  }

  async upsert(args: Prisma.NoteUpsertArgs): Promise<NoteModel> {
    const obj = await this.collection.upsert(args);
    return this.deserialize<NoteModel>(obj);
  }

  async delete(args: Prisma.NoteDeleteArgs): Promise<NoteModel> {
    const obj = await this.collection.delete(args);
    return this.deserialize<NoteModel>(obj);
  }

  deleteMany(args: Prisma.NoteDeleteManyArgs) {
    return this.collection.deleteMany(args)
  }

  updateMany(args: Prisma.NoteUpdateManyArgs) {
    return this.collection.updateMany(args)
  }

  aggregate(args: Prisma.NoteAggregateArgs) {
    return this.collection.aggregate(args)
  }
}
