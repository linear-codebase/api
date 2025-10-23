import type { User, UserInsert } from "@/database/schema/users"
import type { ID } from "@/shared/types/utils"
import type { IUserRepository } from "../types/user"

export class InMemoryUserRepository implements IUserRepository {
  readonly users: Map<ID, User> = new Map()

  create(data: UserInsert) {
    const user = {
      id: Bun.randomUUIDv7(),
      createdAt: new Date(),
      updatedAt: new Date(),
      lastName: null,
      ...data,
    }
    this.users.set(user.id, user)
    return Promise.resolve(user)
  }

  findAll(): Promise<User[]> {
    return Promise.resolve(Array.from(this.users.values()))
  }

  findById(id: ID) {
    return Promise.resolve(this.users.get(id) ?? null)
  }

  findByEmail(email: string) {
    const user = Array.from(this.users.values()).find((u) => u.email === email)
    return Promise.resolve(user ?? null)
  }

  update(id: ID, data: Partial<UserInsert>) {
    const user = this.users.get(id) ?? null
    if (!user) {
      throw new Error("Failed to update user")
    }
    this.users.set(id, { ...user, ...data, updatedAt: new Date() })
    return Promise.resolve(user)
  }

  delete(id: ID) {
    this.users.delete(id)
    return Promise.resolve()
  }
}
