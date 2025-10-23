import Elysia from "elysia"
import { auth as authPlugin } from "@/plugins/auth"

export const authModule = new Elysia({ prefix: "/auth" }).use(authPlugin)
