import { getDb } from "./sqlite"
import { readFileSync } from "node:fs"
import { join } from "node:path"

export function seedDatabase(): void {
  const db = getDb()

  const existing = db.query("SELECT COUNT(*) as count FROM users").get() as { count: number }
  if (existing.count > 0) {
    console.log("[Seed] Database already has data, skipping seed")
    return
  }

  const seedPath = join(import.meta.dir, "../../migrations/sqlite/002_seed.sql")
  const sql = readFileSync(seedPath, "utf-8")
  db.run(sql)
  console.log("[Seed] Demo data inserted")
}
