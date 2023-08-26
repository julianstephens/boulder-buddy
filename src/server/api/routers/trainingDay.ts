import { withIdSchema, WithId } from "@/server/schemas";
import {
  TrainingDayWhereInputSchema,
  TrainingDayCreateInputSchema,
  TrainingDayUpdateInputSchema,
  TrainingDayWhereUniqueInputSchema,
  TrainingDayFindUniqueArgsSchema,
  TrainingDayFindManyArgsSchema,
} from "prisma/generated/zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const trainingDayRouter = createTRPCRouter({
  getDays: protectedProcedure
    .input(TrainingDayFindManyArgsSchema)
    .query(async ({ input, ctx: { prisma } }) => {
      return await prisma.trainingDay.findMany(input);
    }),
  getDay: protectedProcedure
    .input(TrainingDayFindUniqueArgsSchema)
    .query(async ({ input, ctx: { prisma } }) => {
      return await prisma.trainingDay.findUnique(input);
    }),
  createDay: protectedProcedure
    .input(TrainingDayCreateInputSchema)
    .mutation(async ({ input, ctx: { prisma } }) => {
      return await prisma.trainingDay.create({
        data: input,
      });
    }),
  updateDay: protectedProcedure
    .input(withIdSchema(TrainingDayUpdateInputSchema))
    .mutation(async ({ input, ctx: { prisma } }) => {
      return await prisma.trainingDay.update({
        data: input.data,
        where: {
          id: input.id,
        },
      });
    }),
  deleteDay: protectedProcedure
    .input(WithId)
    .mutation(async ({ input, ctx: { prisma } }) => {
      return await prisma.trainingDay.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
