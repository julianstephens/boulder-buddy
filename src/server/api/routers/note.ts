import { withIdSchema, WithId } from "@/server/schemas";
import {
  NoteWhereInputSchema,
  NoteWhereUniqueInputSchema,
  NoteCreateInputSchema,
  NoteUpdateInputSchema,
} from "prisma/generated/zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const noteRouter = createTRPCRouter({
  getNotes: protectedProcedure
    .input(NoteWhereInputSchema)
    .query(async ({ input, ctx: { prisma } }) => {
      return await prisma.note.findMany({
        where: {
          ...input,
        },
      });
    }),
  getNote: protectedProcedure
    .input(NoteWhereUniqueInputSchema)
    .query(async ({ input, ctx: { prisma } }) => {
      return await prisma.note.findUnique({
        where: {
          ...input,
        },
      });
    }),
  createNote: protectedProcedure
    .input(NoteCreateInputSchema)
    .mutation(async ({ input, ctx: { prisma } }) => {
      return await prisma.note.create({
        data: input,
      });
    }),
  updateNote: protectedProcedure
    .input(withIdSchema(NoteUpdateInputSchema))
    .mutation(async ({ input, ctx: { prisma } }) => {
      return await prisma.note.update({
        data: input.data,
        where: {
          id: input.id,
        },
      });
    }),
  deleteNote: protectedProcedure
    .input(WithId)
    .mutation(async ({ input, ctx: { prisma } }) => {
      return await prisma.note.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
