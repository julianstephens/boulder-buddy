import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { WithId, withIdSchema } from "@/server/schemas";
import {
  MesocycleCreateInputSchema,
  MesocycleUpdateInputSchema,
  MesocycleWhereInputSchema,
  MesocycleWhereUniqueInputSchema,
} from "prisma/generated/zod";

export const mesoRouter = createTRPCRouter({
  getMesos: protectedProcedure
    .input(MesocycleWhereInputSchema)
    .query(async ({ input, ctx: { session, prisma } }) => {
      return await prisma.mesocycle.findMany({
        where: {
          ...input,
          userId: session.user.id,
        },
      });
    }),
  getMeso: protectedProcedure
    .input(MesocycleWhereUniqueInputSchema)
    .query(async ({ input, ctx: { session, prisma } }) => {
      return await prisma.mesocycle.findUnique({
        where: {
          ...input,
          userId: session.user.id,
        },
      });
    }),
  createMeso: protectedProcedure
    .input(MesocycleCreateInputSchema)
    .mutation(async ({ input, ctx: { prisma } }) => {
      return await prisma.mesocycle.create({
        data: input,
      });
    }),
  updateMeso: protectedProcedure
    .input(withIdSchema(MesocycleUpdateInputSchema))
    .mutation(async ({ input, ctx: { prisma } }) => {
      return await prisma.mesocycle.update({
        data: input.data,
        where: {
          id: input.id,
        },
      });
    }),
  deleteMeso: protectedProcedure
    .input(WithId)
    .mutation(async ({ input, ctx: { prisma } }) => {
      return await prisma.mesocycle.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
