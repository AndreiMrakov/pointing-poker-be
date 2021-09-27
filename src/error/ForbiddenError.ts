import { HttpStatusCode } from "@/utils/enums";
import { HttpError } from "./HttpError";

export class ForbiddenError extends HttpError {
  constructor(message: string) {
    super(message, HttpStatusCode.FORBIDDEN);
  }
}
