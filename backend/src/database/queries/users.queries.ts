import { allQuery, oneQuery, runQuery } from "../database"
import type { User, UserPublic } from "../../types"

const userPublicColumns = "id, prenom, nom, email, telephone, role, actif, date_creation, date_modification"
const userColumns = `${userPublicColumns}, mot_de_passe`

export function findByEmail(email: string): User | null {
  return oneQuery<User>(`SELECT ${userColumns} FROM users WHERE email = ?`, [email])
}

export function findById(id: string): UserPublic | null {
  return oneQuery<UserPublic>(`SELECT ${userPublicColumns} FROM users WHERE id = ?`, [id])
}

export function findByEmailFull(email: string): User | null {
  return oneQuery<User>(`SELECT ${userColumns} FROM users WHERE email = ?`, [email])
}

export function createUser(user: Omit<User, "date_creation" | "date_modification">): void {
  runQuery(
    `INSERT INTO users (id, prenom, nom, email, telephone, mot_de_passe, role, actif, date_creation, date_modification)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [user.id, user.prenom, user.nom, user.email, user.telephone, user.mot_de_passe, user.role, user.actif ? 1 : 0, user.date_creation, user.date_modification]
  )
}

export function updateUser(id: string, data: Partial<Pick<User, "prenom" | "nom" | "telephone">>): void {
  const sets: string[] = []
  const params: unknown[] = []
  if (data.prenom !== undefined) { sets.push("prenom = ?"); params.push(data.prenom) }
  if (data.nom !== undefined) { sets.push("nom = ?"); params.push(data.nom) }
  if (data.telephone !== undefined) { sets.push("telephone = ?"); params.push(data.telephone) }
  if (sets.length === 0) return
  sets.push("date_modification = ?")
  params.push(new Date().toISOString())
  params.push(id)
  runQuery(`UPDATE users SET ${sets.join(", ")} WHERE id = ?`, params)
}

export function updatePassword(id: string, hash: string): void {
  runQuery("UPDATE users SET mot_de_passe = ?, date_modification = ? WHERE id = ?", [hash, new Date().toISOString(), id])
}

export function setUserActive(id: string, actif: boolean): void {
  runQuery("UPDATE users SET actif = ?, date_modification = ? WHERE id = ?", [actif ? 1 : 0, new Date().toISOString(), id])
}

export function findAllUsers(page: number, limit: number): { users: UserPublic[]; total: number } {
  const total = oneQuery<{ count: number }>("SELECT COUNT(*) as count FROM users")
  const users = allQuery<UserPublic>(
    `SELECT ${userPublicColumns} FROM users ORDER BY date_creation DESC LIMIT ? OFFSET ?`,
    [limit, (page - 1) * limit]
  )
  return { users, total: total?.count ?? 0 }
}
