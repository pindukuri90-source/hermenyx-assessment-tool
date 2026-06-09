import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required");
}
const parsedDatabaseUrl = new URL(databaseUrl);

console.log("Database connection target", {
  host: parsedDatabaseUrl.hostname,
  port: parsedDatabaseUrl.port,
  database: parsedDatabaseUrl.pathname,
  username: decodeURIComponent(parsedDatabaseUrl.username),
  sslmode: parsedDatabaseUrl.searchParams.get("sslmode"),
  uselibpqcompat: parsedDatabaseUrl.searchParams.get("uselibpqcompat"),
});

export const pool = new Pool({
  connectionString: databaseUrl,
  ssl: databaseUrl.includes("supabase.com")
    ? { rejectUnauthorized: false }
    : undefined,
});

export const db = drizzle(pool , {schema});

export * from "./schema";
