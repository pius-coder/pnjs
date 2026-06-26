import { getDb, closeDb } from "./sqlite"
import type { Database } from "bun:sqlite"
export { closeDb }

export function getDbClient(): Database {
  return getDb()
}

export function runQuery(sql: string, params: unknown[] = []): { changes: number; lastInsertRowid: number | bigint } {
  const stmt = getDb().prepare(sql)
  const result = stmt.run(...params)
  return result
}

export function allQuery<T>(sql: string, params: unknown[] = []): T[] {
  const stmt = getDb().prepare(sql)
  return stmt.all(...params) as T[]
}

export function oneQuery<T>(sql: string, params: unknown[] = []): T | null {
  const stmt = getDb().prepare(sql)
  return stmt.get(...params) as T | null
}

export function transaction<T>(fn: () => T): T {
  const db = getDb()
  const tx = db.transaction(fn)
  return tx()
}
