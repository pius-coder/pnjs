import type { MiddlewareHandler } from "hono"
import { config } from "../config"

export const corsMiddleware: MiddlewareHandler = async (c, next) => {
  const origin = c.req.header("origin") || ""
  const allowedOrigins = [config.frontendUrl, "http://localhost:5173", "http://localhost:4173"]

  if (allowedOrigins.includes(origin)) {
    c.header("Access-Control-Allow-Origin", origin)
  }
  c.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
  c.header("Access-Control-Allow-Headers", "Content-Type, Authorization")
  c.header("Access-Control-Allow-Credentials", "true")

  if (c.req.method === "OPTIONS") {
    return c.body(null, 204)
  }

  await next()
}
