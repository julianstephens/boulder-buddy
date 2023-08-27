import { withIdSchema, WithId } from "@/server/schemas";
import {
  RecoveryLevelWhereInputSchema,
  RecoveryLevelWhereUniqueInputSchema,
  RecoveryLevelCreateInputSchema,
  RecoveryLevelUpdateInputSchema,
} from "prisma/generated/zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const recoveryLevelRouter = createTRPCRouter({
  getRecoveryLevels: protectedProcedure
    .input(RecoveryLevelWhereInputSchema)
    .query(async ({ input, ctx: { prisma } }) => {
      return await prisma.recoveryLevel.findMany({
        where: {
          ...input,
        },
      });
    }),
  getRecoveryLevel: protectedProcedure
    .input(RecoveryLevelWhereUniqueInputSchema)
    .query(async ({ input, ctx: { prisma } }) => {
      return await prisma.recoveryLevel.findUnique({
        where: {
          ...input,
        },
      });
    }),
  createRecoveryLevel: protectedProcedure
    .input(RecoveryLevelCreateInputSchema)
    .mutation(async ({ input, ctx: { prisma } }) => {
      return await prisma.recoveryLevel.create({
        data: input,
      });
    }),
  updateRecoveryLevel: protectedProcedure
    .input(withIdSchema(RecoveryLevelUpdateInputSchema))
    .mutation(async ({ input, ctx: { prisma } }) => {
      return await prisma.recoveryLevel.update({
        data: input.data,
        where: {
          id: input.id,
        },
      });
    }),
  deleteRecoveryLevel: protectedProcedure
    .input(WithId)
    .mutation(async ({ input, ctx: { prisma } }) => {
      return await prisma.recoveryLevel.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
