import { NextFunction, Request, Response } from 'express';

export function fakeDelay(ms = 1000) {
  return (_req: Request, _res: Response, next: NextFunction) => {
    setTimeout(next, ms);
  };
}
