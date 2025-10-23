import { bearer as bearerPlugin } from "@elysiajs/bearer"
import { jwt as jwtPlugin } from "@elysiajs/jwt"
import { Elysia, t } from "elysia"
import { UnauthorizedError } from "@/errors/unauthorized"
import { env } from "@/lib/env"

const jwtOptionsTemplate = {
  secret: env.JWT_SECRET,
  schema: t.Object({
    sub: t.String(),
  }),
}

export const auth = new Elysia({ name: "auth" })
  .use(
    jwtPlugin({
      ...jwtOptionsTemplate,
      name: "access",
      exp: "15min",
    })
  )
  .use(
    jwtPlugin({
      ...jwtOptionsTemplate,
      name: "refresh",
      exp: "30d",
    })
  )
  .decorate(({ access, refresh }) => ({
    jwt: {
      access,
      refresh,
    },
  }))
  .use(bearerPlugin())
  .macro({
    isAuth: {
      resolve: async ({ bearer, jwt }) => {
        const payload = await jwt.access.verify(bearer)

        if (!payload) {
          throw new UnauthorizedError("Invalid or expired token")
        }

        return {
          user: payload,
        }
      },
    },
  })
