import { HttpError } from "./HttpError";

export class Forbidden extends HttpError {
  constructor(message: string) {
    super(403, message);
  }
}
