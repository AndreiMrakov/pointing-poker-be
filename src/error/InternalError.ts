import { HttpError } from "./HttpError";

export class InternalError extends HttpError {
  constructor(message: string) {
    super(message);
  }
}
