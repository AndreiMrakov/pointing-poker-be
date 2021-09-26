import { HttpError } from "./HttpError";

export class Internal extends HttpError {
  constructor(message: string) {
    super(500, message);
  }
}
