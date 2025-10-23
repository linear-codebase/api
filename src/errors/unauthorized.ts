export class UnauthorizedError extends Error {
  status = 401

  constructor(message = "Unauthorized") {
    super(message)
    this.name = "UnauthorizedError"
  }

  // Optional: Custom response format
  toResponse() {
    return {
      success: false,
      message: this.message,
      error: "Unauthorized",
    }
  }
}
