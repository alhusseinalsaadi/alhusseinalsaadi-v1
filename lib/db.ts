// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require("@prisma/client");

type PrismaClientType = typeof PrismaClient;

declare global {
  // eslint-disable-next-line no-var
  var __prismaClient: InstanceType<PrismaClientType> | undefined;
}

function makePrisma() {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

// Singleton: reuse across hot-reloads in dev
export const prisma: InstanceType<PrismaClientType> =
  global.__prismaClient ?? (global.__prismaClient = makePrisma());
