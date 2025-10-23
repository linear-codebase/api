import { z } from "zod"

const DEFAULT_PORT = 3333

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(DEFAULT_PORT),
  JWT_SECRET: z.string(),
})

export const env = envSchema.parse(Bun.env)
