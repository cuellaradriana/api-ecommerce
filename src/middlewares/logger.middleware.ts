import { Request, Response, NextFunction } from 'express';

export function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const actualDate = new Date();
  const date = actualDate.toLocaleDateString();
  const time = actualDate.toLocaleTimeString();

  console.log(
    `Executing GlobalMiddleware: Route ${req.url} accessed via ${req.method} method, on ${date} at ${time}.`,
  );
  next();
}
