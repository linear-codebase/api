import { defineConfig } from "drizzle-kit"
import { env } from "@/shared/env"

export default defineConfig({
  out: "./drizzle",
  schema: "./src/database/schema/*.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  casing: "snake_case",
})
