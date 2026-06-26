import { Hono } from "hono"
import { createOrgSchema, updateOrgSchema } from "../schemas/organization.schema"
import * as orgService from "../services/organization.service"
import { authMiddleware } from "../middlewares/auth.middleware"
import { roleMiddleware } from "../middlewares/role.middleware"

const router = new Hono()

router.use("*", authMiddleware)

router.get("/mine", async (c) => {
  const user = c.get("user") as { id: string }
  const org = orgService.getMyOrganization(user.id)
  return c.json({ succes: true, donnees: org })
})

router.post("/", async (c) => {
  const body = await c.req.json()
  const parsed = createOrgSchema.safeParse(body)
  if (!parsed.success) {
    return c.json({ succes: false, message: "Donnees invalides", erreurs: parsed.error.flatten().fieldErrors }, 422)
  }
  const user = c.get("user") as { id: string; role: string }
  const org = orgService.create({ ...parsed.data, proprietaireId: user.id })
  return c.json({ succes: true, donnees: org, message: "Organisation creee" }, 201)
})

router.patch("/:id", async (c) => {
  const body = await c.req.json()
  const parsed = updateOrgSchema.safeParse(body)
  if (!parsed.success) {
    return c.json({ succes: false, message: "Donnees invalides", erreurs: parsed.error.flatten().fieldErrors }, 422)
  }
  const user = c.get("user") as { id: string }
  orgService.update(c.req.param("id"), user.id, parsed.data)
  return c.json({ succes: true, message: "Organisation mise a jour" })
})

router.get("/:id", async (c) => {
  const org = orgService.getOrganization(c.req.param("id"))
  return c.json({ succes: true, donnees: org })
})

export default router
