import Elysia from "elysia"
import { HTTP_STATUS_CODES } from "@/shared/http/constants"

export const status = () =>
  new Elysia({ name: "status" })
    .decorate("code", HTTP_STATUS_CODES.SUCCESS)
    .macro("status", (code: keyof typeof HTTP_STATUS_CODES.SUCCESS) => ({
      resolve: ({ set }) => {
        set.status = HTTP_STATUS_CODES.SUCCESS[code]
      },
    }))
