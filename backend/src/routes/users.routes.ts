import { Hono } from "hono"
import * as userService from "../services/user.service"
import { authMiddleware } from "../middlewares/auth.middleware"

const router = new Hono()

router.get("/me", authMiddleware, async (c) => {
  const user = c.get("user") as { id: string }
  const me = userService.getUser(user.id)
  return c.json({ succes: true, donnees: me })
})

router.patch("/me", authMiddleware, async (c) => {
  const body = await c.req.json()
  const user = c.get("user") as { id: string }
  userService.updateProfile(user.id, body)
  return c.json({ succes: true, message: "Profil mis a jour" })
})

export default router
