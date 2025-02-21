import type { Config } from "drizzle-kit";
import { getEnvVar } from "./lib/env";

export default {
	schema: "./db/schema.ts",
	dialect: "singlestore",
	tablesFilter: ["group_tick_*"],
	dbCredentials: {
		host: getEnvVar("SINGLESTORE_HOST"),
		port: Number.parseInt(getEnvVar("SINGLESTORE_PORT")),
		user: getEnvVar("SINGLESTORE_USER"),
		password: getEnvVar("SINGLESTORE_PASS"),
		database: getEnvVar("SINGLESTORE_DB_NAME"),
		ssl: {},
	},
} satisfies Config;
