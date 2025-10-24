import Elysia from "elysia"
import { auth as authPlugin } from "@/plugins/auth"
import { status as statusPlugin } from "@/plugins/status"
import { AuthModel } from "./model"
import { AuthService } from "./service"

export const auth = new Elysia({ prefix: "/auth", tags: ["Auth"] })
  .use(authPlugin)
  .use(statusPlugin)
  .post("/register", async ({ body }) => await AuthService.register(body), {
    status: "CREATED",
    body: AuthModel.registerBody,
    response: {
      201: AuthModel.registerResponse,
    },
  })
