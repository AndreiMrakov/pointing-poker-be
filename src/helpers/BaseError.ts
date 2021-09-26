import { HttpStatusCode } from "@/utils/enums";

export class BaseError extends Error {
  public readonly name: string;
  public readonly httpCode: HttpStatusCode;
  
  constructor(name: string, httpCode: HttpStatusCode) {
    super();
    Object.setPrototypeOf(this, new.target.prototype);
  
    this.name = name;
    this.httpCode = httpCode;
  
    Error.captureStackTrace(this);
  }
 }