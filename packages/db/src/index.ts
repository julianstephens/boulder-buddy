import { PrismaClient } from ".prisma/prisma-client";

let client: PrismaClient | undefined;

export const prisma = client || new PrismaClient();

if (process.env.NODE_ENV !== "production") client = prisma;
export * from ".prisma/prisma-client";
export { PrismaClient } from ".prisma/prisma-client";
