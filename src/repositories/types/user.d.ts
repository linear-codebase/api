import type { User } from "@/modules/user/model"
import type { IRepository } from "@/shared/types/repository"

export interface IUserRepository extends IRepository<User> {
  findByEmail(email: string): Promise<User | null>
}
