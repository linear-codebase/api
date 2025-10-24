import { HTTP_STATUS_CODES } from "../constants"
import { CustomError } from "./custom"

export class UnauthorizedError extends CustomError {
  constructor(message = "Unauthorized") {
    super(message, HTTP_STATUS_CODES.ERROR.UNAUTHORIZED)
    this.name = "UnauthorizedError"
  }
}
