import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { WithId } from "@/server/schemas";
import {
  MesocycleCreateInputSchema,
  MesocycleUpdateInputSchema,
} from "prisma/generated/zod";
import { z } from "zod";

export const cycleRouter = createTRPCRouter({
  getMesos: protectedProcedure
    .input(z.object({ isActive: z.boolean().optional() }))
    .query(async ({ input, ctx: { session, prisma } }) => {
      const mesos = await prisma.mesocycle.findMany({
        where: {
          ...(input.isActive ? { isActive: input.isActive } : {}),
          userId: session.user.id,
        },
      });

      return {
        cycles: mesos,
      };
    }),
  createMeso: protectedProcedure
    .input(MesocycleCreateInputSchema)
    .mutation(async ({ input, ctx: { prisma } }) => {
      const meso = await prisma.mesocycle.create({
        data: input,
      });

      return {
        cycle: meso,
      };
    }),
  updateMeso: protectedProcedure
    .input(WithId.merge(z.object({ data: MesocycleUpdateInputSchema })))
    .mutation(async ({ input, ctx: { prisma } }) => {
      const meso = await prisma.mesocycle.update({
        data: input.data,
        where: {
          id: input.id,
        },
      });

      return {
        cycle: meso,
      };
    }),
});
