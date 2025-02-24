import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@/src/server/trpc/router/_app";

export const trpc = createTRPCReact<AppRouter>();
