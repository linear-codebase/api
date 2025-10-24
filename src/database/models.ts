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
          pattern: "^[a-zA-Z0-9._%+-]+@linear\\.net\\.br$",
          examples: ["you@linear.net.br"],
        }),
        firstName: t.String({
          minLength: 2,
          error: "Invalid first name",
          examples: ["John", "Jane"],
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
