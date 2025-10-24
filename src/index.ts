import { fromTypes, openapi } from "@elysiajs/openapi"
import chalk from "chalk"
import { Elysia } from "elysia"
import { env } from "@/shared/env"
import { auth } from "./modules/auth"

const app = new Elysia()
  .use(
    openapi({
      references: fromTypes(),
      path: "/docs",
    })
  )
  .onError(({ error, code }) => {
    if (code === "VALIDATION") {
      return error.detail(error.message)
    }
    return error
  })
  .get("/", () => "Hello Elysia")
  .use(auth)
  .listen(env.PORT)

// biome-ignore lint/suspicious/noConsole: debug elysia server
console.log(
  chalk.green("🦊 Elysia is running at ") +
    chalk.italic.cyanBright(`${app.server?.hostname}:${app.server?.port}`)
)
