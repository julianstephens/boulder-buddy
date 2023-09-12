import { mesoRouter } from "@/server/api/routers/meso";
import { microRouter } from "@/server/api/routers/micro";
import { trainingDayRouter } from "@/server/api/routers/trainingDay";
import { createTRPCRouter } from "@/server/api/trpc";
import { climbLogRouter } from "./routers/climbLog";
import { exerciseRouter } from "./routers/exercise";
import { locationRouter } from "./routers/location";
import { noteRouter } from "./routers/note";
import { routineRouter } from "./routers/routine";
import { recoveryLevelRouter } from "./routers/recoveryLevel";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  meso: mesoRouter,
  micro: microRouter,
  trainingDay: trainingDayRouter,
  routine: routineRouter,
  recoveryLevel: recoveryLevelRouter,
  exercise: exerciseRouter,
  climbLog: climbLogRouter,
  location: locationRouter,
  note: noteRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
