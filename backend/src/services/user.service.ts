import { findById, updateUser, findAllUsers, setUserActive } from "../database/queries/users.queries"
import { HTTPError } from "../middlewares/error.middleware"
import type { UserPublic } from "../types"

export function getUser(id: string): UserPublic {
  const user = findById(id)
  if (!user) throw new HTTPError(404, "Utilisateur non trouve")
  return user
}

export function updateProfile(id: string, data: { prenom?: string; nom?: string; telephone?: string }): void {
  updateUser(id, data)
}

export function listUsers(page: number, limit: number) {
  return findAllUsers(page, limit)
}

export function toggleUserActive(id: string, actif: boolean): void {
  const user = findById(id)
  if (!user) throw new HTTPError(404, "Utilisateur non trouve")
  setUserActive(id, actif)
}
