import { getEnvVar } from "@/lib/env";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

export const db = drizzle(getEnvVar("DATABASE_URL"), { schema });
