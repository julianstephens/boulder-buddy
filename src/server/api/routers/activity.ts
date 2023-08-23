import { withIdSchema, WithId } from "@/server/schemas";
import {
  ActivityWhereInputSchema,
  ActivityWhereUniqueInputSchema,
  ActivityCreateInputSchema,
  ActivityUpdateInputSchema,
} from "prisma/generated/zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const activityRouter = createTRPCRouter({
  getActivities: protectedProcedure
    .input(ActivityWhereInputSchema)
    .query(async ({ input, ctx: { prisma } }) => {
      return await prisma.activity.findMany({
        where: {
          ...input,
        },
      });
    }),
  getActivity: protectedProcedure
    .input(ActivityWhereUniqueInputSchema)
    .query(async ({ input, ctx: { prisma } }) => {
      return await prisma.activity.findUnique({
        where: {
          ...input,
        },
      });
    }),
  createActivity: protectedProcedure
    .input(ActivityCreateInputSchema)
    .mutation(async ({ input, ctx: { prisma } }) => {
      return await prisma.activity.create({
        data: input,
      });
    }),
  updateActivity: protectedProcedure
    .input(withIdSchema(ActivityUpdateInputSchema))
    .mutation(async ({ input, ctx: { prisma } }) => {
      return await prisma.activity.update({
        data: input.data,
        where: {
          id: input.id,
        },
      });
    }),
  deleteActivity: protectedProcedure
    .input(WithId)
    .mutation(async ({ input, ctx: { prisma } }) => {
      return await prisma.activity.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
