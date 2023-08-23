import { withIdSchema, WithId } from "@/server/schemas";
import {
  ExerciseWhereInputSchema,
  ExerciseWhereUniqueInputSchema,
  ExerciseCreateInputSchema,
  ExerciseUpdateInputSchema,
} from "prisma/generated/zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const exerciseRouter = createTRPCRouter({
  getExercises: protectedProcedure
    .input(ExerciseWhereInputSchema)
    .query(async ({ input, ctx: { prisma } }) => {
      return await prisma.exercise.findMany({
        where: {
          ...input,
        },
      });
    }),
  getExercise: protectedProcedure
    .input(ExerciseWhereUniqueInputSchema)
    .query(async ({ input, ctx: { prisma } }) => {
      return await prisma.exercise.findUnique({
        where: {
          ...input,
        },
      });
    }),
  createExercise: protectedProcedure
    .input(ExerciseCreateInputSchema)
    .mutation(async ({ input, ctx: { prisma } }) => {
      return await prisma.exercise.create({
        data: input,
      });
    }),
  updateExercise: protectedProcedure
    .input(withIdSchema(ExerciseUpdateInputSchema))
    .mutation(async ({ input, ctx: { prisma } }) => {
      return await prisma.exercise.update({
        data: input.data,
        where: {
          id: input.id,
        },
      });
    }),
  deleteExercise: protectedProcedure
    .input(WithId)
    .mutation(async ({ input, ctx: { prisma } }) => {
      return await prisma.exercise.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
