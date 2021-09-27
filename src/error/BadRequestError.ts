import { HttpStatusCode } from "@/utils/enums";
import { HttpError } from "./HttpError";

export class BadRequestError extends HttpError {
  constructor(message: string) {
    super(message, HttpStatusCode.BAD_REQUEST);
  }
}
