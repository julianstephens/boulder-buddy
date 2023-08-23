import { withIdSchema, WithId } from "@/server/schemas";
import {
  LocationWhereInputSchema,
  LocationWhereUniqueInputSchema,
  LocationCreateInputSchema,
  LocationUpdateInputSchema,
} from "prisma/generated/zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const locationRouter = createTRPCRouter({
  getLocations: protectedProcedure
    .input(LocationWhereInputSchema)
    .query(async ({ input, ctx: { prisma } }) => {
      return await prisma.location.findMany({
        where: {
          ...input,
        },
      });
    }),
  getLocation: protectedProcedure
    .input(LocationWhereUniqueInputSchema)
    .query(async ({ input, ctx: { prisma } }) => {
      return await prisma.location.findUnique({
        where: {
          ...input,
        },
      });
    }),
  createLocation: protectedProcedure
    .input(LocationCreateInputSchema)
    .mutation(async ({ input, ctx: { prisma } }) => {
      return await prisma.location.create({
        data: input,
      });
    }),
  updateLocation: protectedProcedure
    .input(withIdSchema(LocationUpdateInputSchema))
    .mutation(async ({ input, ctx: { prisma } }) => {
      return await prisma.location.update({
        data: input.data,
        where: {
          id: input.id,
        },
      });
    }),
  deleteLocation: protectedProcedure
    .input(WithId)
    .mutation(async ({ input, ctx: { prisma } }) => {
      return await prisma.location.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
