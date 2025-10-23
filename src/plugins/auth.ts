import { bearer as bearerPlugin } from "@elysiajs/bearer"
import { jwt as jwtPlugin } from "@elysiajs/jwt"
import { Elysia, t } from "elysia"
import { db } from "@/database/client"
import { UnauthorizedError } from "@/errors/unauthorized"
import { env } from "@/shared/env"

export const auth = new Elysia({ name: "auth" })
  .state("jwtPattern", {
    secret: env.JWT_SECRET,
    schema: t.Object({
      sub: t.String(),
    }),
  })
  .use(({ store }) =>
    jwtPlugin({
      ...store.jwtPattern,
      name: "access",
      exp: "15min",
    })
  )
  .use(({ store }) =>
    jwtPlugin({
      ...store.jwtPattern,
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
