import { db } from "@/database/models"

const _model = {
  insert: db.insert.users,
  select: db.select.users,
}
