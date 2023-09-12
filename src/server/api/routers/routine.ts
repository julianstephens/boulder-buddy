import { WithId, withIdSchema } from "@/server/schemas";
import {
    RoutineCreateInputSchema,
    RoutineUpdateInputSchema,
    RoutineWhereInputSchema,
    RoutineWhereUniqueInputSchema,
} from "prisma/generated/zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const routineRouter = createTRPCRouter({
  getRoutines: protectedProcedure
    .input(RoutineWhereInputSchema)
    .query(async ({ input, ctx: { prisma } }) => {
      return await prisma.routine.findMany({
        where: {
          ...input,
        },
      });
    }),
  getRoutine: protectedProcedure
    .input(RoutineWhereUniqueInputSchema)
    .query(async ({ input, ctx: { prisma } }) => {
      return await prisma.routine.findUnique({
        where: {
          ...input,
        },
      });
    }),
  createRoutine: protectedProcedure
    .input(RoutineCreateInputSchema)
    .mutation(async ({ input, ctx: { prisma } }) => {
      return await prisma.routine.create({
        data: input,
      });
    }),
  updateRoutine: protectedProcedure
    .input(withIdSchema(RoutineUpdateInputSchema))
    .mutation(async ({ input, ctx: { prisma } }) => {
      return await prisma.routine.update({
        data: input.data,
        where: {
          id: input.id,
        },
      });
    }),
  deleteRoutine: protectedProcedure
    .input(WithId)
    .mutation(async ({ input, ctx: { prisma } }) => {
      return await prisma.routine.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
