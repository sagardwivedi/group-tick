import { drizzle } from "drizzle-orm/singlestore";
import { createPool, type Pool } from "mysql2/promise";

import * as schema from "./schema";
import { getEnvVar } from "@/lib/env";

const globalForDb = globalThis as unknown as { conn: Pool | undefined };

const conn =
	globalForDb.conn ??
	createPool({
		host: getEnvVar("SINGLESTORE_HOST"),
		port: Number.parseInt(getEnvVar("SINGLESTORE_PORT")),
		user: getEnvVar("SINGLESTORE_USER"),
		password: getEnvVar("SINGLESTORE_PASS"),
		database: getEnvVar("SINGLESTORE_DB_NAME"),
		ssl: {}, // Adjust SSL settings as needed
		maxIdle: 0, // Ensures no idle connections remain open
	});

if (process.env.NODE_ENV !== "production") globalForDb.conn = conn;

conn.addListener("error", (err) => {
	console.error("Database connection error:", err);
});

export const db = drizzle(conn, { schema });
