import type { Config } from "drizzle-kit";
import { getEnvVar } from "./lib/env";

export default {
  schema: "./db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: getEnvVar("DATABASE_URL"),
  },
} satisfies Config;
