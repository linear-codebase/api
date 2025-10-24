import { HTTP_STATUS_CODES } from "../constants"
import { CustomError } from "./custom"

export class ConflictError extends CustomError {
  constructor(message = "Conflict") {
    super(message, HTTP_STATUS_CODES.ERROR.CONFLICT)
    this.name = "ConflictError"
  }
}
