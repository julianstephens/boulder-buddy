import { z } from "zod";

export const WithId = z.object({
  id: z.string(),
});

export const withIdSchema = <T extends z.ZodTypeAny>(schema: T) =>
  WithId.merge(z.object({ data: schema }));
