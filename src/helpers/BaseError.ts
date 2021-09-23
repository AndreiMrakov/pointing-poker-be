export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
 }

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