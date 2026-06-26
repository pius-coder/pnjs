import { Hono } from "hono"
import * as statsService from "../services/statistics.service"
import { authMiddleware } from "../middlewares/auth.middleware"
import { roleMiddleware } from "../middlewares/role.middleware"

const router = new Hono()

router.use("*", authMiddleware)

router.get("/admin", roleMiddleware("admin"), async (c) => {
  const stats = statsService.adminStats()
  return c.json({ succes: true, donnees: stats })
})

router.get("/entreprise", roleMiddleware("entreprise"), async (c) => {
  const user = c.get("user") as { id: string }
  const org = (await import("../services/organization.service")).getMyOrganization(user.id)
  if (!org) return c.json({ succes: true, donnees: {} })
  const stats = statsService.entrepriseStats(org.id)
  return c.json({ succes: true, donnees: stats })
})

router.get("/etablissement", roleMiddleware("etablissement"), async (c) => {
  const user = c.get("user") as { id: string }
  const org = (await import("../services/organization.service")).getMyOrganization(user.id)
  if (!org) return c.json({ succes: true, donnees: {} })
  const stats = statsService.etablissementStats(org.id)
  return c.json({ succes: true, donnees: stats })
})

export default router
