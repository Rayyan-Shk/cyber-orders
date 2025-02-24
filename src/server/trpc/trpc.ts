import { initTRPC } from "@trpc/server";
import { prisma } from "../db/client";

const t = initTRPC.context<{ prisma: typeof prisma }>().create({
    allowOutsideOfServer: true
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

export const createContext = () => {
  return { prisma };
};

export type Context = ReturnType<typeof createContext>;
