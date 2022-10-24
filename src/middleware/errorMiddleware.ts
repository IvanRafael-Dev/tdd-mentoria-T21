import { ErrorRequestHandler } from 'express'

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  if (err.status) {
    return res.status(err.status).json({ error: err.message })
  }

  return res.status(500).json({ error: err.message })
}
