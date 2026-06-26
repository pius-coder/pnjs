import { Database } from "bun:sqlite"
import { config } from "../config"
import { mkdirSync } from "node:fs"
import { dirname } from "node:path"

let db: Database | null = null

export function getDb(): Database {
  if (!db) {
    mkdirSync(dirname(config.sqlitePath), { recursive: true })
    db = new Database(config.sqlitePath)
    db.run("PRAGMA journal_mode = WAL")
    db.run("PRAGMA foreign_keys = ON")
  }
  return db
}

export function closeDb(): void {
  if (db) {
    db.close()
    db = null
  }
}
