import { Hono } from "hono"
import * as userService from "../services/user.service"
import * as orgService from "../services/organization.service"
import * as offerService from "../services/offer.service"
import * as statsService from "../services/statistics.service"
import { authMiddleware } from "../middlewares/auth.middleware"
import { roleMiddleware } from "../middlewares/role.middleware"

const router = new Hono()

router.use("*", authMiddleware, roleMiddleware("admin"))

router.get("/users", async (c) => {
  const page = parseInt(c.req.query("page") || "1", 10)
  const limit = parseInt(c.req.query("limit") || "20", 10)
  const result = userService.listUsers(page, limit)
  return c.json({ succes: true, donnees: result.users, total: result.total })
})

router.patch("/users/:id/toggle", async (c) => {
  const body = await c.req.json()
  userService.toggleUserActive(c.req.param("id"), body.actif)
  return c.json({ succes: true, message: "Statut utilisateur modifie" })
})

router.get("/organizations", async (c) => {
  const status = c.req.query("statut") || null
  const page = parseInt(c.req.query("page") || "1", 10)
  const limit = parseInt(c.req.query("limit") || "20", 10)
  const result = orgService.list(status, page, limit)
  return c.json({ succes: true, donnees: result.orgs, total: result.total })
})

router.post("/organizations/:id/validate", async (c) => {
  const body = await c.req.json()
  orgService.validate(c.req.param("id"), body.statut)
  return c.json({ succes: true, message: "Statut organisation modifie" })
})

router.get("/offers/pending", async (c) => {
  const page = parseInt(c.req.query("page") || "1", 10)
  const limit = parseInt(c.req.query("limit") || "20", 10)
  const result = offerService.listPending(page, limit)
  return c.json({ succes: true, donnees: result.offers, total: result.total })
})

router.post("/offers/:id/publish", async (c) => {
  offerService.publish(c.req.param("id"))
  return c.json({ succes: true, message: "Offre publiee" })
})

router.post("/offers/:id/reject", async (c) => {
  offerService.reject(c.req.param("id"))
  return c.json({ succes: true, message: "Offre rejetee" })
})

router.get("/statistics", async (c) => {
  const stats = statsService.adminStats()
  return c.json({ succes: true, donnees: stats })
})

export default router
