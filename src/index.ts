import chalk from "chalk"
import { Elysia } from "elysia"
import { env } from "./lib/env"

const app = new Elysia().get("/", () => "Hello Elysia").listen(env.PORT)

// biome-ignore lint/suspicious/noConsole: debug elysia server
console.log(
  chalk.green("🦊 Elysia is running at ") +
    chalk.italic.cyanBright(`${app.server?.hostname}:${app.server?.port}`)
)
