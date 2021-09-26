import { HttpError } from "./HttpError";

export class BadRequest extends HttpError {
  constructor(message: string) {
    super(400, message);
  }
}
