import { randomUUID } from "node:crypto"

export function generateId(): string {
  return randomUUID()
}

export function formatDate(date: Date): string {
  return date.toISOString().replace("T", " ").slice(0, 19)
}

export function nowISO(): string {
  return new Date().toISOString()
}

export function paginate(page: number, limit: number) {
  const p = Math.max(1, page)
  const l = Math.min(100, Math.max(1, limit))
  return { offset: (p - 1) * l, limit: l, page: p }
}

export async function hashPassword(password: string): Promise<string> {
  return await Bun.password.hash(password, { algorithm: "bcrypt", cost: 10 })
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await Bun.password.verify(password, hash)
}

export function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 100)
}
