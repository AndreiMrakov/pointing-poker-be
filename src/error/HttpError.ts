export class HttpError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super();
    this.message = message;
    this.status = status;
  }
}
