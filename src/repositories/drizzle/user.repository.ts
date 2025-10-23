import { eq } from "drizzle-orm"
import { db } from "@/database/client"
import { schema } from "@/database/schema"
import type { User, UserInsert } from "@/database/schema/users"
import type { ID } from "@/shared/types/utils"
import type { IUserRepository } from "../type/user"

export class DrizzleUserRepository implements IUserRepository {
  async create(data: UserInsert): Promise<User> {
    const user = await db.insert(schema.users).values(data).returning()
    return user[0]
  }
  async findAll(): Promise<User[]> {
    const users = await db.query.users.findMany()
    return users
  }
  async findById(id: ID): Promise<User | null> {
    const user = await db.query.users.findFirst({
      where: eq(schema.users.id, id),
    })
    return user ?? null
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await db.query.users.findFirst({
      where: eq(schema.users.email, email),
    })
    return user ?? null
  }
  async update(id: ID, data: Partial<UserInsert>): Promise<User> {
    const user = await db
      .update(schema.users)
      .set(data)
      .where(eq(schema.users.id, id))
      .returning()
    return user[0]
  }
  async delete(id: ID): Promise<void> {
    await db.delete(schema.users).where(eq(schema.users.id, id))
  }
}
