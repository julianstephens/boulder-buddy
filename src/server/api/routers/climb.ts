import { withIdSchema, WithId } from "@/server/schemas";
import {
  ClimbWhereInputSchema,
  ClimbWhereUniqueInputSchema,
  ClimbCreateInputSchema,
  ClimbUpdateInputSchema,
} from "prisma/generated/zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const climbRouter = createTRPCRouter({
  getClimbs: protectedProcedure
    .input(ClimbWhereInputSchema)
    .query(async ({ input, ctx: { prisma } }) => {
      return await prisma.climb.findMany({
        where: {
          ...input,
        },
      });
    }),
  getClimb: protectedProcedure
    .input(ClimbWhereUniqueInputSchema)
    .query(async ({ input, ctx: { prisma } }) => {
      return await prisma.climb.findUnique({
        where: {
          ...input,
        },
      });
    }),
  createClimb: protectedProcedure
    .input(ClimbCreateInputSchema)
    .mutation(async ({ input, ctx: { prisma } }) => {
      return await prisma.climb.create({
        data: input,
      });
    }),
  updateClimb: protectedProcedure
    .input(withIdSchema(ClimbUpdateInputSchema))
    .mutation(async ({ input, ctx: { prisma } }) => {
      return await prisma.climb.update({
        data: input.data,
        where: {
          id: input.id,
        },
      });
    }),
  deleteClimb: protectedProcedure
    .input(WithId)
    .mutation(async ({ input, ctx: { prisma } }) => {
      return await prisma.climb.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
