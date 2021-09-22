export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super();
    this.message = message;
    this.status = status;
  }

  static badRequest(message: string) {
    return new ApiError(404, message);
  }

  static internal(message: string) {
    return new ApiError(500, message);
  }
}