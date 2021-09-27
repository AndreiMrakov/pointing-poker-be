import { HttpStatusCode } from "@/utils/enums";
import { HttpError } from "./HttpError";

export class InternalError extends HttpError {
  constructor(message: string) {
    super(HttpStatusCode.INTERNAL_SERVER, message);
  }
}
