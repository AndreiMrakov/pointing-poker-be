export class HttpError extends Error {
  readonly status: number;

  constructor(message: string, status = 500) {
    super();
    this.message = message;
    this.status = status;
  }
}
