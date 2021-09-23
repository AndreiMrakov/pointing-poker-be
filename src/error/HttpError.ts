export class HttpError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super();
    this.message = message;
    this.status = status;
  }

  static badRequest(message: string) {
    return new HttpError(400, message);
  }

  static forbidden(message: string) {
    return new HttpError(403, message);
  }

  static notFound(message: string) {
    return new HttpError(404, message);
  }

  static internal(message: string) {
    return new HttpError(500, message);
  }
}
