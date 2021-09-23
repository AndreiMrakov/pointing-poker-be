import { NextFunction, Request, Response } from 'express';
import { HttpError } from '@/error';

interface IErrorHandling {
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
}

export const ErrorHandling = (data: IErrorHandling) => {
  if (data.err instanceof HttpError) {
    return data.res.status(data.err.status).json({message: data.err.message});
  }
  return data.res.status(500).json({message: 'Internal Server Error'});
};
