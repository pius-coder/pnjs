import type { MiddlewareHandler } from "hono"
import type { Role } from "../types"

export function roleMiddleware(...roles: Role[]): MiddlewareHandler {
  return async (c, next) => {
    const user = c.get("user") as { role: Role } | undefined
    if (!user) {
      return c.json({ succes: false, message: "Non authentifie", code: "UNAUTHORIZED" }, 401)
    }
    if (!roles.includes(user.role)) {
      return c.json({ succes: false, message: "Acces interdit", code: "FORBIDDEN" }, 403)
    }
    await next()
  }
}
