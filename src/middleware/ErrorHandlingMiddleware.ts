import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../error';

export const errorHandling = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HttpError) {
    return res.status(err.status).json({message: err.message});
  }
  return res.status(500).json({message: 'Internal Server Error'});
};
