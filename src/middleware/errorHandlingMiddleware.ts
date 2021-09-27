import { HttpError } from '@/error';
import type { ErrorRequestHandler } from "express";

export const errorHandling: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    return res.status(err.status).json({message: err.message});
  }
  return res.status(500).json({message: 'Internal Server Error'});
};
