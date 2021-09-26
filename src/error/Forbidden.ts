import { HttpStatusCode } from "@/utils/enums";
import { HttpError } from "./HttpError";

export class Forbidden extends HttpError {
  constructor(message: string) {
    super(HttpStatusCode.FORBIDDEN, message);
  }
}
