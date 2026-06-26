import type { MiddlewareHandler } from "hono"
import { verifyToken } from "../utils/jwt"
import type { AuthUser } from "../types"

export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const authHeader = c.req.header("Authorization")
  if (!authHeader?.startsWith("Bearer ")) {
    return c.json({ succes: false, message: "Authentification requise", code: "UNAUTHORIZED" }, 401)
  }

  const token = authHeader.slice(7)
  try {
    const user = await verifyToken(token)
    c.set("user", user)
    await next()
  } catch {
    return c.json({ succes: false, message: "Token invalide ou expire", code: "INVALID_TOKEN" }, 401)
  }
}
