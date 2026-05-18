import { PrismaClient } from "@prisma/client";
import path from "node:path";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");

declare global {
  // eslint-disable-next-line no-var
  var __prismaClient: PrismaClient | undefined;
}

function makePrisma(): PrismaClient {
  const raw = process.env.DATABASE_URL ?? "file:./dev.db";
  // Strip the file: prefix, resolve to absolute path, then re-add file: prefix
  const stripped = raw.startsWith("file:") ? raw.slice(5) : raw;
  const abs = path.isAbsolute(stripped)
    ? stripped
    : path.resolve(process.cwd(), stripped);
  const url = `file:${abs}`;

  const adapter = new PrismaBetterSqlite3({ url });
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  } as ConstructorParameters<typeof PrismaClient>[0]);
}

// Singleton: reuse across hot-reloads in dev
export const prisma: PrismaClient =
  global.__prismaClient ?? (global.__prismaClient = makePrisma());
