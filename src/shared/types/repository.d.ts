import type { ID, InsertData, UpdateData } from "./utils"

export interface IRepository<T> {
  create(data: InsertData<T>): Promise<T>
  findById(id: ID): Promise<T | null>
  findAll(): Promise<T[]>
  update(id: ID, data: UpdateData<T>): Promise<T>
  delete(id: ID): Promise<void>
}
