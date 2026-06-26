import { Hono } from "hono"
import { createOfferSchema, updateOfferSchema } from "../schemas/offer.schema"
import * as offerService from "../services/offer.service"
import { authMiddleware } from "../middlewares/auth.middleware"
import { roleMiddleware } from "../middlewares/role.middleware"

const router = new Hono()

router.get("/", async (c) => {
  const search = c.req.query("search")
  const type = c.req.query("type")
  const region = c.req.query("region")
  const page = parseInt(c.req.query("page") || "1", 10)
  const limit = parseInt(c.req.query("limit") || "12", 10)

  const result = offerService.listPublic({ search, type, region, page, limit })
  return c.json({
    succes: true,
    donnees: result.offers,
    total: result.total,
    page,
    limite: limit,
  })
})

router.get("/:id", async (c) => {
  const offer = offerService.getOffer(c.req.param("id"))
  return c.json({ succes: true, donnees: offer })
})

// Protected routes below
router.use("/entreprise/*", authMiddleware, roleMiddleware("entreprise"))

router.get("/entreprise/mine", authMiddleware, async (c) => {
  const user = c.get("user") as { id: string }
  const org = (await import("../services/organization.service")).getMyOrganization(user.id)
  if (!org) return c.json({ succes: true, donnees: [] })
  const offers = offerService.listByEntreprise(org.id)
  return c.json({ succes: true, donnees: offers })
})

router.post("/entreprise", authMiddleware, roleMiddleware("entreprise"), async (c) => {
  const body = await c.req.json()
  const parsed = createOfferSchema.safeParse(body)
  if (!parsed.success) {
    return c.json({ succes: false, message: "Donnees invalides", erreurs: parsed.error.flatten().fieldErrors }, 422)
  }
  const user = c.get("user") as { id: string }
  const org = (await import("../services/organization.service")).getMyOrganization(user.id)
  if (!org) return c.json({ succes: false, message: "Vous devez avoir une organisation" }, 400)

  if (org.type !== "entreprise") {
    return c.json({ succes: false, message: "Seules les entreprises peuvent creer des offres" }, 403)
  }
  if (org.statut !== "validee") {
    return c.json({ succes: false, message: "Votre organisation doit etre validee" }, 400)
  }

  const offer = offerService.create({ ...parsed.data, entrepriseId: org.id })
  return c.json({ succes: true, donnees: offer, message: "Offre creee" }, 201)
})

router.patch("/entreprise/:id", authMiddleware, roleMiddleware("entreprise"), async (c) => {
  const body = await c.req.json()
  const parsed = updateOfferSchema.safeParse(body)
  if (!parsed.success) {
    return c.json({ succes: false, message: "Donnees invalides", erreurs: parsed.error.flatten().fieldErrors }, 422)
  }
  const user = c.get("user") as { id: string }
  const org = (await import("../services/organization.service")).getMyOrganization(user.id)
  if (!org) return c.json({ succes: false, message: "Organisation non trouvee" }, 400)
  offerService.update(c.req.param("id"), org.id, parsed.data)
  return c.json({ succes: true, message: "Offre mise a jour" })
})

router.post("/entreprise/:id/submit", authMiddleware, roleMiddleware("entreprise"), async (c) => {
  const user = c.get("user") as { id: string }
  const org = (await import("../services/organization.service")).getMyOrganization(user.id)
  if (!org) return c.json({ succes: false, message: "Organisation non trouvee" }, 400)
  offerService.submit(c.req.param("id"), org.id)
  return c.json({ succes: true, message: "Offre soumise pour publication" })
})

router.post("/entreprise/:id/close", authMiddleware, roleMiddleware("entreprise"), async (c) => {
  const user = c.get("user") as { id: string }
  const org = (await import("../services/organization.service")).getMyOrganization(user.id)
  if (!org) return c.json({ succes: false, message: "Organisation non trouvee" }, 400)
  offerService.close(c.req.param("id"), org.id)
  return c.json({ succes: true, message: "Offre cloturee" })
})

router.delete("/entreprise/:id", authMiddleware, roleMiddleware("entreprise"), async (c) => {
  const user = c.get("user") as { id: string }
  const org = (await import("../services/organization.service")).getMyOrganization(user.id)
  if (!org) return c.json({ succes: false, message: "Organisation non trouvee" }, 400)
  offerService.remove(c.req.param("id"), org.id)
  return c.json({ succes: true, message: "Offre supprimee" })
})

export default router
