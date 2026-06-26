import { Hono } from "hono"
import { createApplicationSchema, updateStatusSchema } from "../schemas/application.schema"
import * as applicationService from "../services/application.service"
import * as orgService from "../services/organization.service"
import { findById as findOfferById } from "../database/queries/offers.queries"
import { findById as findAppById } from "../database/queries/applications.queries"
import { authMiddleware } from "../middlewares/auth.middleware"
import { roleMiddleware } from "../middlewares/role.middleware"
import type { Offer } from "../types"

const router = new Hono()

router.use("*", authMiddleware)

router.post("/", roleMiddleware("candidat"), async (c) => {
  const body = await c.req.json()
  const parsed = createApplicationSchema.safeParse(body)
  if (!parsed.success) {
    return c.json({ succes: false, message: "Donnees invalides", erreurs: parsed.error.flatten().fieldErrors }, 422)
  }
  const user = c.get("user") as { id: string }
  const offreId = c.req.query("offre_id")
  if (!offreId) return c.json({ succes: false, message: "offre_id requis" }, 400)

  const app = applicationService.apply(user.id, offreId, parsed.data.message)
  return c.json({ succes: true, donnees: app, message: "Candidature envoyee" }, 201)
})

router.get("/mine", roleMiddleware("candidat"), async (c) => {
  const user = c.get("user") as { id: string }
  const apps = applicationService.getMyApplications(user.id)
  return c.json({ succes: true, donnees: apps })
})

router.get("/received", roleMiddleware("entreprise"), async (c) => {
  const user = c.get("user") as { id: string }
  const org = orgService.getMyOrganization(user.id)
  if (!org) return c.json({ succes: true, donnees: [] })
  const apps = applicationService.getReceivedApplications(org.id)
  return c.json({ succes: true, donnees: apps })
})

router.patch("/:id/status", roleMiddleware("entreprise"), async (c) => {
  const body = await c.req.json()
  const parsed = updateStatusSchema.safeParse(body)
  if (!parsed.success) {
    return c.json({ succes: false, message: "Donnees invalides", erreurs: parsed.error.flatten().fieldErrors }, 422)
  }
  const user = c.get("user") as { id: string }
  const app = findAppById(c.req.param("id"))
  if (!app) return c.json({ succes: false, message: "Candidature non trouvee" }, 404)
  const offer = findOfferById(app.offre_id) as Offer | null
  const org = orgService.getMyOrganization(user.id)
  if (!org || !offer || offer.entreprise_id !== org.id) {
    return c.json({ succes: false, message: "Acces interdit" }, 403)
  }
  applicationService.changeStatus(c.req.param("id"), user.id, parsed.data.statut, parsed.data.commentaire)
  return c.json({ succes: true, message: "Statut mis a jour" })
})

router.post("/:id/withdraw", roleMiddleware("candidat"), async (c) => {
  const user = c.get("user") as { id: string }
  applicationService.withdraw(user.id, c.req.param("id"))
  return c.json({ succes: true, message: "Candidature retiree" })
})

router.get("/:id/history", async (c) => {
  const user = c.get("user") as { id: string; role: string }
  const app = findAppById(c.req.param("id"))
  if (!app) return c.json({ succes: false, message: "Candidature non trouvee" }, 404)
  if (user.role !== "admin" && app.candidat_id !== user.id) {
    if (user.role === "entreprise") {
      const org = orgService.getMyOrganization(user.id)
      const offer = findOfferById(app.offre_id) as Offer | null
      if (!org || !offer || offer.entreprise_id !== org.id) {
        return c.json({ succes: false, message: "Acces interdit" }, 403)
      }
    } else {
      return c.json({ succes: false, message: "Acces interdit" }, 403)
    }
  }
  const history = applicationService.getApplicationHistory(c.req.param("id"))
  return c.json({ succes: true, donnees: history })
})

export default router
