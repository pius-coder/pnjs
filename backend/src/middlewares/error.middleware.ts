import type { ErrorHandler } from "hono"
import type { ApiResponse } from "../types"

export const errorMiddleware: ErrorHandler = (err, c) => {
  console.error("[Error]", err)

  const status = err instanceof HTTPError ? err.status : 500
  const message = err instanceof HTTPError ? err.message : "Erreur interne du serveur"

  const response: ApiResponse = {
    succes: false,
    message,
    code: status >= 500 ? "INTERNAL_ERROR" : "REQUEST_ERROR",
  }

  return c.json(response, status)
}

export class HTTPError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = "HTTPError"
  }
}
