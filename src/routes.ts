import { Elysia } from "elysia"
import { auth } from "./modules/auth"

export const routes = new Elysia().use(auth)
