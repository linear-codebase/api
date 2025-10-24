import { SQL } from "bun"
import { drizzle } from "drizzle-orm/bun-sql"
import { env } from "@/shared/env"
import { schema } from "./schema"

const client = new SQL(env.DATABASE_URL)

export const db = drizzle({
  client,
  schema,
  casing: "snake_case",
  logger: true,
})
