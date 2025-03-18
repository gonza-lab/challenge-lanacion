import { Request, Response, NextFunction } from 'express'

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction // eslint-disable-line @typescript-eslint/no-unused-vars
) => {
  console.error(err)
  res.status(500).json({ error: 'Internal Server Error' })
}
