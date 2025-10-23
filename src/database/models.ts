import { createInsertSchema, createSelectSchema } from "drizzle-typebox"
import { t } from "elysia"
import { schema } from "@/database/schema"
import { spreads } from "./utils"

export const db = {
  insert: spreads(
    {
      users: createInsertSchema(schema.users, {
        email: t.String({
          format: "email",
          error: "Invalid email address",
          examples: ["you@linear.net.br"],
        }),
      }),
    },
    "insert"
  ),
  select: spreads(
    {
      users: createSelectSchema(schema.users, {
        email: t.String({
          format: "email",
        }),
      }),
    },
    "select"
  ),
} as const
