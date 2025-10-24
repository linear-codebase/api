import { bearer as bearerPlugin } from "@elysiajs/bearer"
import { jwt as jwtPlugin } from "@elysiajs/jwt"
import { Elysia, t } from "elysia"
import { db } from "@/database/client"
import { env } from "@/shared/env"
import { UnauthorizedError } from "@/shared/http/errors/unauthorized"

export const jwtPattern = {
  secret: env.JWT_SECRET,
  schema: t.Object({
    sub: t.String(),
  }),
}

export const auth = new Elysia({ name: "auth" })
  .decorate("jwtPattern", jwtPattern)
  .use(
    jwtPlugin({
      ...jwtPattern,
      name: "access",
      exp: "15min",
    })
  )
  .use(
    jwtPlugin({
      ...jwtPattern,
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
  .macro("auth", {
    resolve: async ({ bearer, jwt }) => {
      const payload = await jwt.access.verify(bearer)

      if (!payload) {
        throw new UnauthorizedError("Invalid or expired token")
      }

      return {
        userId: payload.sub,
        getCurrentUser: async () =>
          await db.query.users.findFirst({
            where: (fields, { eq }) => eq(fields.id, payload.sub),
          }),
      }
    },
  })
