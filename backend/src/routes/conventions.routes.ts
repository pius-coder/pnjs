import { Hono } from "hono"
import { updateConventionSchema } from "../schemas/convention.schema"
import * as conventionService from "../services/convention.service"
import { authMiddleware } from "../middlewares/auth.middleware"

const router = new Hono()

router.use("*", authMiddleware)

router.get("/", async (c) => {
  const user = c.get("user") as { id: string; role: string }
  const convs = conventionService.listByUser(user.id, user.role)
  return c.json({ succes: true, donnees: convs })
})

router.get("/:id", async (c) => {
  const conv = conventionService.getConvention(c.req.param("id"))
  return c.json({ succes: true, donnees: conv })
})

router.patch("/:id", async (c) => {
  const body = await c.req.json()
  const parsed = updateConventionSchema.safeParse(body)
  if (!parsed.success) {
    return c.json({ succes: false, message: "Donnees invalides", erreurs: parsed.error.flatten().fieldErrors }, 422)
  }
  const user = c.get("user") as { id: string }
  conventionService.updateDetails(c.req.param("id"), user.id, parsed.data)
  return c.json({ succes: true, message: "Convention mise a jour" })
})

router.post("/:id/validate", async (c) => {
  const user = c.get("user") as { id: string; role: string }
  conventionService.validate(c.req.param("id"), user.id, user.role)
  return c.json({ succes: true, message: "Convention validee" })
})

router.post("/:id/set-etablissement", async (c) => {
  const body = await c.req.json()
  conventionService.setEtablissement(c.req.param("id"), body.etablissement_id)
  return c.json({ succes: true, message: "Etablissement defini" })
})

router.post("/:id/generate-pdf", async (c) => {
  const path = await conventionService.generatePdfForConvention(c.req.param("id"))
  return c.json({ succes: true, donnees: { chemin: path }, message: "PDF genere" })
})

export default router
