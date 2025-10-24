import { type Static, t } from "elysia"
import { db } from "@/database/models"

const model = {
  insert: db.insert.users,
  select: db.select.users,
}

export const registerBody = t.Object({
  email: model.insert.email,
  firstName: model.insert.firstName,
  lastName: model.insert.lastName,
})

export type RegisterBody = Static<typeof registerBody>

export const registerResponse = t.Object(model.select)

export const AuthModel = {
  registerBody,
  registerResponse,
}
