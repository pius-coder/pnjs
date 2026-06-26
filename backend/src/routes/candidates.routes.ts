import { Hono } from "hono"
import { profileSchema, educationSchema, skillSchema, languageSchema, experienceSchema } from "../schemas/candidate.schema"
import * as candidateService from "../services/candidate.service"
import { authMiddleware } from "../middlewares/auth.middleware"
import { roleMiddleware } from "../middlewares/role.middleware"

const router = new Hono()

router.use("*", authMiddleware, roleMiddleware("candidat"))

router.get("/profile", async (c) => {
  const user = c.get("user") as { id: string }
  const profile = candidateService.getProfile(user.id)
  return c.json({ succes: true, donnees: profile })
})

router.put("/profile", async (c) => {
  const body = await c.req.json()
  const parsed = profileSchema.safeParse(body)
  if (!parsed.success) {
    return c.json({ succes: false, message: "Donnees invalides", erreurs: parsed.error.flatten().fieldErrors }, 422)
  }
  const user = c.get("user") as { id: string }
  candidateService.saveProfile(user.id, parsed.data)
  return c.json({ succes: true, message: "Profil enregistre" })
})

router.post("/educations", async (c) => {
  const body = await c.req.json()
  const parsed = educationSchema.safeParse(body)
  if (!parsed.success) {
    return c.json({ succes: false, message: "Donnees invalides", erreurs: parsed.error.flatten().fieldErrors }, 422)
  }
  const user = c.get("user") as { id: string }
  candidateService.addEducation(user.id, parsed.data)
  return c.json({ succes: true, message: "Formation ajoutee" }, 201)
})

router.delete("/educations/:id", async (c) => {
  const user = c.get("user") as { id: string }
  candidateService.removeEducation(user.id, c.req.param("id"))
  return c.json({ succes: true, message: "Formation supprimee" })
})

router.post("/skills", async (c) => {
  const body = await c.req.json()
  const parsed = skillSchema.safeParse(body)
  if (!parsed.success) {
    return c.json({ succes: false, message: "Donnees invalides", erreurs: parsed.error.flatten().fieldErrors }, 422)
  }
  const user = c.get("user") as { id: string }
  candidateService.addSkill(user.id, parsed.data)
  return c.json({ succes: true, message: "Competence ajoutee" }, 201)
})

router.delete("/skills/:id", async (c) => {
  const user = c.get("user") as { id: string }
  candidateService.removeSkill(user.id, c.req.param("id"))
  return c.json({ succes: true, message: "Competence supprimee" })
})

router.post("/languages", async (c) => {
  const body = await c.req.json()
  const parsed = languageSchema.safeParse(body)
  if (!parsed.success) {
    return c.json({ succes: false, message: "Donnees invalides", erreurs: parsed.error.flatten().fieldErrors }, 422)
  }
  const user = c.get("user") as { id: string }
  candidateService.addLanguage(user.id, parsed.data)
  return c.json({ succes: true, message: "Langue ajoutee" }, 201)
})

router.delete("/languages/:id", async (c) => {
  const user = c.get("user") as { id: string }
  candidateService.removeLanguage(user.id, c.req.param("id"))
  return c.json({ succes: true, message: "Langue supprimee" })
})

router.post("/experiences", async (c) => {
  const body = await c.req.json()
  const parsed = experienceSchema.safeParse(body)
  if (!parsed.success) {
    return c.json({ succes: false, message: "Donnees invalides", erreurs: parsed.error.flatten().fieldErrors }, 422)
  }
  const user = c.get("user") as { id: string }
  candidateService.addExperience(user.id, parsed.data)
  return c.json({ succes: true, message: "Experience ajoutee" }, 201)
})

router.delete("/experiences/:id", async (c) => {
  const user = c.get("user") as { id: string }
  candidateService.removeExperience(user.id, c.req.param("id"))
  return c.json({ succes: true, message: "Experience supprimee" })
})

export default router
