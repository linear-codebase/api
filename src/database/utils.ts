/**
 * @lastModified 2025-02-04
 * @see https://elysiajs.com/recipe/drizzle.html#utility
 */

import { Kind, type TObject } from "@sinclair/typebox"
import type { Table } from "drizzle-orm"
import {
  type BuildSchema,
  createInsertSchema,
  createSelectSchema,
} from "drizzle-typebox"

type Spread<
  T extends TObject | Table,
  Mode extends "select" | "insert" | undefined,
> = T extends TObject<infer Fields>
  ? {
      [K in keyof Fields as K extends "id" | "createdAt" | "updatedAt"
        ? never
        : K]: Fields[K]
    }
  : T extends Table
    ? Mode extends "select"
      ? Omit<
          BuildSchema<"select", T["_"]["columns"], undefined>["properties"],
          "id" | "createdAt" | "updatedAt"
        >
      : Mode extends "insert"
        ? Omit<
            BuildSchema<"insert", T["_"]["columns"], undefined>["properties"],
            "id" | "createdAt" | "updatedAt"
          >
        : never
    : never

/**
 * Spread a Drizzle schema into a plain object
 */
export const spread = <
  T extends TObject | Table,
  Mode extends "select" | "insert" | undefined,
>(
  schema: T,
  mode?: Mode
): Spread<T, Mode> => {
  const newSchema: Record<string, unknown> = {}
  let table: TObject | Table

  switch (mode) {
    case "insert":
    case "select":
      if (Kind in schema) {
        table = schema
        break
      }

      if (mode === "insert") {
        table = createInsertSchema<Table>(schema)
      } else if (mode === "select") {
        table = createSelectSchema<Table>(schema)
      } else {
        throw new Error("Invalid mode")
      }

      break

    default:
      if (!(Kind in schema)) {
        throw new Error("Expect a schema")
      }
      table = schema
  }

  for (const key of Object.keys(table.properties)) {
    newSchema[key] = table.properties[key as keyof typeof table.properties]
  }

  return newSchema as Spread<T, Mode>
}

/**
 * Spread a Drizzle Table into a plain object
 *
 * If `mode` is 'insert', the schema will be refined for insert
 * If `mode` is 'select', the schema will be refined for select
 * If `mode` is undefined, the schema will be spread as is, models will need to be refined manually
 */
export const spreads = <
  T extends Record<string, TObject | Table>,
  Mode extends "select" | "insert" | undefined,
>(
  models: T,
  mode?: Mode
): {
  [K in keyof T]: Spread<T[K], Mode>
} => {
  const newSchema: Record<string, unknown> = {}
  const keys = Object.keys(models)

  for (const key of keys) {
    if (key === "id" || key === "createdAt" || key === "updatedAt") {
      continue
    }
    newSchema[key] = spread(models[key], mode)
  }

  return newSchema as {
    [K in keyof T]: Spread<T[K], Mode>
  }
}
