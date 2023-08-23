import { WithId, withIdSchema } from "@/server/schemas";
import {
  MicrocycleCreateInputSchema,
  MicrocycleUpdateInputSchema,
  MicrocycleWhereInputSchema,
  MicrocycleWhereUniqueInputSchema,
} from "prisma/generated/zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const microRouter = createTRPCRouter({
  getMicros: protectedProcedure
    .input(MicrocycleWhereInputSchema)
    .query(async ({ input, ctx: { prisma } }) => {
      return await prisma.microcycle.findMany({
        where: {
          ...input,
        },
      });
    }),
  getMicro: protectedProcedure
    .input(MicrocycleWhereUniqueInputSchema)
    .query(async ({ input, ctx: { prisma } }) => {
      return await prisma.microcycle.findUnique({
        where: {
          ...input,
        },
      });
    }),
  createMicro: protectedProcedure
    .input(MicrocycleCreateInputSchema)
    .mutation(async ({ input, ctx: { prisma } }) => {
      return await prisma.microcycle.create({
        data: input,
      });
    }),
  updateMicro: protectedProcedure
    .input(withIdSchema(MicrocycleUpdateInputSchema))
    .mutation(async ({ input, ctx: { prisma } }) => {
      return await prisma.microcycle.update({
        data: input.data,
        where: {
          id: input.id,
        },
      });
    }),
  deleteMicro: protectedProcedure
    .input(WithId)
    .mutation(async ({ input, ctx: { prisma } }) => {
      return await prisma.microcycle.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
