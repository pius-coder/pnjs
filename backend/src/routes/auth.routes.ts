import { Hono } from "hono"
import { registerSchema, loginSchema, changePasswordSchema } from "../schemas/auth.schema"
import * as authService from "../services/auth.service"
import { authMiddleware } from "../middlewares/auth.middleware"

const router = new Hono()

router.post("/register", async (c) => {
  const body = await c.req.json()
  const parsed = registerSchema.safeParse(body)
  if (!parsed.success) {
    return c.json({ succes: false, message: "Donnees invalides", erreurs: parsed.error.flatten().fieldErrors }, 422)
  }

  const result = await authService.register(parsed.data)
  return c.json({ succes: true, donnees: result.user, message: "Inscription reussie" }, 201)
})

router.post("/login", async (c) => {
  const body = await c.req.json()
  const parsed = loginSchema.safeParse(body)
  if (!parsed.success) {
    return c.json({ succes: false, message: "Donnees invalides", erreurs: parsed.error.flatten().fieldErrors }, 422)
  }

  const result = await authService.login(parsed.data.email, parsed.data.mot_de_passe)
  return c.json({ succes: true, donnees: result })
})

router.post("/logout", async (c) => {
  return c.json({ succes: true, message: "Deconnexion reussie" })
})

router.get("/me", authMiddleware, async (c) => {
  const user = c.get("user") as { id: string }
  const me = authService.getCurrentUser(user.id)
  return c.json({ succes: true, donnees: me })
})

router.post("/change-password", authMiddleware, async (c) => {
  const body = await c.req.json()
  const parsed = changePasswordSchema.safeParse(body)
  if (!parsed.success) {
    return c.json({ succes: false, message: "Donnees invalides", erreurs: parsed.error.flatten().fieldErrors }, 422)
  }

  const user = c.get("user") as { id: string }
  await authService.changePassword(user.id, parsed.data.ancien_mot_de_passe, parsed.data.nouveau_mot_de_passe)
  return c.json({ succes: true, message: "Mot de passe modifie avec succes" })
})

export default router
