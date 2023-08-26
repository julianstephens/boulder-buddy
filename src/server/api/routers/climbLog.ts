import { withIdSchema, WithId } from "@/server/schemas";
import {
  ClimbLogWhereInputSchema,
  ClimbLogWhereUniqueInputSchema,
  ClimbLogCreateInputSchema,
  ClimbLogUpdateInputSchema,
} from "prisma/generated/zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const climbLogRouter = createTRPCRouter({
  getClimbLogs: protectedProcedure
    .input(ClimbLogWhereInputSchema)
    .query(async ({ input, ctx: { prisma } }) => {
      return await prisma.climbLog.findMany({
        where: {
          ...input,
        },
      });
    }),
  getClimbLog: protectedProcedure
    .input(ClimbLogWhereUniqueInputSchema)
    .query(async ({ input, ctx: { prisma } }) => {
      return await prisma.climbLog.findUnique({
        where: {
          ...input,
        },
      });
    }),
  createClimbLog: protectedProcedure
    .input(ClimbLogCreateInputSchema)
    .mutation(async ({ input, ctx: { prisma } }) => {
      return await prisma.climbLog.create({
        data: input,
      });
    }),
  updateClimbLog: protectedProcedure
    .input(withIdSchema(ClimbLogUpdateInputSchema))
    .mutation(async ({ input, ctx: { prisma } }) => {
      return await prisma.climbLog.update({
        data: input.data,
        where: {
          id: input.id,
        },
      });
    }),
  deleteClimbLog: protectedProcedure
    .input(WithId)
    .mutation(async ({ input, ctx: { prisma } }) => {
      return await prisma.climbLog.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
