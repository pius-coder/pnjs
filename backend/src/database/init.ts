import { readFileSync, existsSync, mkdirSync } from "node:fs"
import { join, dirname } from "node:path"
import { getDb } from "./sqlite"
import { config } from "../config"

export function initializeDatabase(): void {
  mkdirSync(dirname(config.sqlitePath), { recursive: true })
  const db = getDb()

  const migrationPath = join(import.meta.dir, "../../migrations/sqlite/001_initial.sql")
  const sql = readFileSync(migrationPath, "utf-8")
  db.run(sql)

  const seedPath = join(import.meta.dir, "../../migrations/sqlite/002_seed.sql")
  const seedSql = readFileSync(seedPath, "utf-8")
  db.run(seedSql)
}
