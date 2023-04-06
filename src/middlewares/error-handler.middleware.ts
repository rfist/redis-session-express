import { NextFunction, Request, Response } from 'express';
import { logger } from '../utils/logger';

export class UnprocessableEntityError extends Error {}

export function handleErrorMiddleware(
  error: Error,
  _: Request,
  res: Response,
  next: NextFunction
): void {
  const { message } = error;

  logger.error(error);
  if (error instanceof UnprocessableEntityError) {
    res.status(422).send({ name: 'UnprocessableEntityError', message });
  } else {
    res.status(500).send({ message: 'Internal Server Error' });
  }

  next();
}
