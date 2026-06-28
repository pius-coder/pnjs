import { describe, it, expect, beforeAll } from "bun:test";
import { Database } from "bun:sqlite";
import { readFileSync } from "fs";
import { join } from "path";

const SQLITE_UP = readFileSync(join(__dirname, "sqlite/001-create-identity.sql"), "utf8");
const SQLITE_DOWN = readFileSync(join(__dirname, "sqlite/001-create-identity.down.sql"), "utf8");
const MYSQL_UP = readFileSync(join(__dirname, "mysql/001-create-identity.sql"), "utf8");

describe("F00-B01 Identity Migrations", () => {
  let db: Database;

  beforeAll(() => {
    db = new Database(":memory:");
  });

  describe("SQLite up migration", () => {
    beforeAll(() => {
      db.exec(SQLITE_UP);
    });

    it("creates users table with all columns", () => {
      const columns = db.query("PRAGMA table_info(users)").all() as { name: string; type: string; notnull: number; pk: number }[];
      const names = columns.map((c) => c.name);
      expect(names).toContain("id");
      expect(names).toContain("email");
      expect(names).toContain("password_hash");
      expect(names).toContain("role");
      expect(names).toContain("status");
      expect(names).toContain("email_verified_at");
      expect(names).toContain("last_login_at");
      expect(names).toContain("created_at");
      expect(names).toContain("updated_at");
    });

    it("creates sessions table with all columns", () => {
      const columns = db.query("PRAGMA table_info(sessions)").all() as { name: string; type: string }[];
      const names = columns.map((c) => c.name);
      expect(names).toContain("id");
      expect(names).toContain("user_id");
      expect(names).toContain("token_hash");
      expect(names).toContain("expires_at");
      expect(names).toContain("revoked_at");
      expect(names).toContain("ip_address");
      expect(names).toContain("user_agent");
      expect(names).toContain("created_at");
    });

    it("creates audit_logs table with all columns", () => {
      const columns = db.query("PRAGMA table_info(audit_logs)").all() as { name: string; type: string }[];
      const names = columns.map((c) => c.name);
      expect(names).toContain("id");
      expect(names).toContain("actor_user_id");
      expect(names).toContain("action");
      expect(names).toContain("resource_type");
      expect(names).toContain("resource_id");
      expect(names).toContain("metadata");
      expect(names).toContain("ip_address");
      expect(names).toContain("created_at");
    });

    it("creates expected indexes", () => {
      const indexes = db.query("SELECT name FROM sqlite_master WHERE type = 'index' AND name NOT LIKE 'sqlite_%'").all() as { name: string }[];
      const names = indexes.map((i) => i.name);
      expect(names).toContain("idx_sessions_user_id");
      expect(names).toContain("idx_sessions_token_hash");
      expect(names).toContain("idx_sessions_expires");
      expect(names).toContain("idx_audit_logs_actor");
      expect(names).toContain("idx_audit_logs_resource");
      expect(names).toContain("idx_audit_logs_created");
    });

    it("enforces not null constraints", () => {
      expect(() => {
        db.run("INSERT INTO users (id, email, password_hash, role, status) VALUES (?, ?, ?, ?, ?)", ["1", null, "hash", "CANDIDATE", "ACTIVE"]);
      }).toThrow();
      expect(() => {
        db.run("INSERT INTO sessions (id, user_id, token_hash, expires_at, ip_address, user_agent) VALUES (?, ?, ?, ?, ?, ?)", ["1", "1", "hash", "2025-01-01", null, "agent"]);
      }).toThrow();
    });

    it("enforces unique email constraint", () => {
      db.run("INSERT INTO users (id, email, password_hash, role, status) VALUES (?, ?, ?, ?, ?)", ["1", "a@b.com", "hash", "CANDIDATE", "ACTIVE"]);
      expect(() => {
        db.run("INSERT INTO users (id, email, password_hash, role, status) VALUES (?, ?, ?, ?, ?)", ["2", "a@b.com", "hash2", "COMPANY", "ACTIVE"]);
      }).toThrow();
    });
  });

  describe("SQLite down migration", () => {
    beforeAll(() => {
      db.exec(SQLITE_DOWN);
    });

    it("drops all tables", () => {
      const tables = db.query("SELECT name FROM sqlite_master WHERE type = 'table'").all() as { name: string }[];
      expect(tables.length).toBe(0);
    });
  });

  describe("MySQL migration syntax", () => {
    it("contains MySQL-specific types", () => {
      expect(MYSQL_UP).toContain("VARCHAR");
      expect(MYSQL_UP).toContain("DATETIME");
      expect(MYSQL_UP).toContain("JSON");
      expect(MYSQL_UP).toContain("ENGINE=InnoDB");
      expect(MYSQL_UP).toContain("FOREIGN KEY");
    });
  });
});
