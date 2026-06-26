import { findByEmail, createUser, findById, updatePassword } from "../database/queries/users.queries"
import { signToken } from "../utils/jwt"
import { hashPassword, verifyPassword, generateId, nowISO } from "../utils"
import { HTTPError } from "../middlewares/error.middleware"
import type { AuthUser, User } from "../types"

export async function register(data: {
  prenom: string
  nom: string
  email: string
  mot_de_passe: string
  role: "candidat" | "entreprise" | "etablissement"
}): Promise<{ user: AuthUser; token: string }> {
  const existing = findByEmail(data.email)
  if (existing) {
    throw new HTTPError(409, "Cette adresse email est deja utilisee")
  }

  const now = nowISO()
  const passwordHash = await hashPassword(data.mot_de_passe)

  const user: User = {
    id: generateId(),
    prenom: data.prenom,
    nom: data.nom,
    email: data.email,
    telephone: null,
    mot_de_passe: passwordHash,
    role: data.role,
    actif: true,
    date_creation: now,
    date_modification: now,
  }

  createUser(user)

  const authUser: AuthUser = {
    id: user.id,
    email: user.email,
    role: user.role,
    prenom: user.prenom,
    nom: user.nom,
  }

  const token = await signToken(authUser)
  return { user: authUser, token }
}

export async function login(email: string, password: string): Promise<{ user: AuthUser; token: string }> {
  const user = findByEmail(email)
  if (!user) {
    throw new HTTPError(401, "Email ou mot de passe incorrect")
  }

  if (!user.actif) {
    throw new HTTPError(403, "Ce compte est desactive")
  }

  const valid = await verifyPassword(password, user.mot_de_passe)
  if (!valid) {
    throw new HTTPError(401, "Email ou mot de passe incorrect")
  }

  const authUser: AuthUser = {
    id: user.id,
    email: user.email,
    role: user.role,
    prenom: user.prenom,
    nom: user.nom,
  }

  const token = await signToken(authUser)
  return { user: authUser, token }
}

export function getCurrentUser(userId: string) {
  const user = findById(userId)
  if (!user) {
    throw new HTTPError(404, "Utilisateur non trouve")
  }
  return user
}

export async function changePassword(userId: string, oldPassword: string, newPassword: string): Promise<void> {
  const user = findByEmail((findById(userId) as { email: string } | null)?.email || "")
  if (!user) {
    throw new HTTPError(404, "Utilisateur non trouve")
  }

  const valid = await verifyPassword(oldPassword, user.mot_de_passe)
  if (!valid) {
    throw new HTTPError(400, "Ancien mot de passe incorrect")
  }

  const newHash = await hashPassword(newPassword)
  updatePassword(userId, newHash)
}
