import { HttpStatusCode } from "@/utils/enums";
import { HttpError } from "./HttpError";

export class NotFound extends HttpError {
  constructor(message: string) {
    super(HttpStatusCode.NOT_FOUND, message);
  }
}
