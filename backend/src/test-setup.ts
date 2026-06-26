import { afterAll, beforeAll } from "bun:test"

const serverUrl = "http://localhost:3001"

let serverProcess: import("bun").Subprocess | null = null

export function getServerUrl(): string {
  return serverUrl
}

beforeAll(async () => {
  const { getDb, initDb, closeDb } = await import("./database/sqlite")
  const { runMigrations } = await import("./database/migrations")
  const db = getDb()
  initDb()
  runMigrations()
  db.exec("DELETE FROM applications")
  db.exec("DELETE FROM conventions")
  db.exec("DELETE FROM offers")
  db.exec("DELETE FROM organizations")
  db.exec("DELETE FROM candidate_profiles")
  db.exec("DELETE FROM users")
  const { seed } = await import("./database/seed")
  seed()
})

afterAll(async () => {
  const { closeDb } = await import("./database/sqlite")
  closeDb()
})
