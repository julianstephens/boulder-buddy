import { mesoRouter } from "@/server/api/routers/meso";
import { createTRPCRouter } from "@/server/api/trpc";
import { microRouter } from "@/server/api/routers/micro";
import { trainingDayRouter } from "@/server/api/routers/trainingDay";
import { routineRouter } from "./routers/routine";
import { activityRouter } from "./routers/activity";
import { exerciseRouter } from "./routers/exercise";
import { locationRouter } from "./routers/location";
import { climbRouter } from "./routers/climb";
import { subtypeRouter } from "./routers/activitySubtype";
import { noteRouter } from "./routers/note";

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
  activity: activityRouter,
  activitySubtype: subtypeRouter,
  exercise: exerciseRouter,
  climb: climbRouter,
  location: locationRouter,
  note: noteRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
