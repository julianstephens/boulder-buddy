import { withIdSchema, WithId } from "@/server/schemas";
import {
  ActivitySubtypeWhereInputSchema,
  ActivitySubtypeWhereUniqueInputSchema,
  ActivitySubtypeCreateInputSchema,
  ActivitySubtypeUpdateInputSchema,
} from "prisma/generated/zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const subtypeRouter = createTRPCRouter({
  getActivities: protectedProcedure
    .input(ActivitySubtypeWhereInputSchema)
    .query(async ({ input, ctx: { prisma } }) => {
      return await prisma.activitySubtype.findMany({
        where: {
          ...input,
        },
      });
    }),
  getActivitySubtype: protectedProcedure
    .input(ActivitySubtypeWhereUniqueInputSchema)
    .query(async ({ input, ctx: { prisma } }) => {
      return await prisma.activitySubtype.findUnique({
        where: {
          ...input,
        },
      });
    }),
  createActivitySubtype: protectedProcedure
    .input(ActivitySubtypeCreateInputSchema)
    .mutation(async ({ input, ctx: { prisma } }) => {
      return await prisma.activitySubtype.create({
        data: input,
      });
    }),
  updateActivitySubtype: protectedProcedure
    .input(withIdSchema(ActivitySubtypeUpdateInputSchema))
    .mutation(async ({ input, ctx: { prisma } }) => {
      return await prisma.activitySubtype.update({
        data: input.data,
        where: {
          id: input.id,
        },
      });
    }),
  deleteActivitySubtype: protectedProcedure
    .input(WithId)
    .mutation(async ({ input, ctx: { prisma } }) => {
      return await prisma.activitySubtype.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
