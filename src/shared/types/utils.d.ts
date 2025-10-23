export type ID = string

export type InsertData<T> = Omit<T, "id" | "createdAt" | "updatedAt">
export type UpdateData<T> = Partial<InsertData<T>>
