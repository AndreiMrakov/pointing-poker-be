import { HttpStatusCode } from "@/utils/enums";
import { HttpError } from "./HttpError";

export class NotFoundError extends HttpError {
  constructor(message: string) {
    super(message, HttpStatusCode.NOT_FOUND);
  }
}
