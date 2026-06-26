import { describe, expect, test, beforeAll } from "bun:test"
import { existsSync, unlinkSync } from "node:fs"
import { config } from "../config"

let app: { fetch: (req: Request) => Promise<Response> }
let tokens: Record<string, string> = {}

function j(r: Response): Promise<any> {
  return r.json()
}

async function api(path: string, options: RequestInit = {}): Promise<Response> {
  return app.fetch(new Request(`http://localhost:3001${path}`, options))
}

async function login(email: string): Promise<string> {
  const r = await api("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, mot_de_passe: "password123" }),
  })
  const data = await j(r)
  return data.donnees?.token || ""
}

beforeAll(async () => {
  const dbPath = config.sqlitePath
  if (existsSync(dbPath)) unlinkSync(dbPath)

  const mod = await import("../index")
  app = mod.default

  tokens.admin = await login("admin@pngs-ie.sn")
  tokens.candidat = await login("fatou.diop@email.sn")
  tokens.entreprise = await login("contact@orange-sn.sn")
  tokens.etablissement = await login("contact@esp.sn")
})

function auth(role: string): Record<string, string> {
  return { Authorization: `Bearer ${tokens[role]}`, "Content-Type": "application/json" }
}

describe("AC1: Health", () => {
  test("GET /api/health returns 200", async () => {
    const r = await api("/api/health")
    expect(r.status).toBe(200)
    const data = await j(r)
    expect(data.succes).toBe(true)
  })
})

describe("AC2: Auth", () => {
  test("Register new candidate", async () => {
    const r = await api("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prenom: "Test",
        nom: "User",
        email: "test-auth@test.sn",
        mot_de_passe: "test1234",
        confirmation: "test1234",
        role: "candidat",
      }),
    })
    expect(r.status).toBe(201)
  })

  test("Login returns JWT with user", async () => {
    const r = await api("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "admin@pngs-ie.sn", mot_de_passe: "password123" }),
    })
    expect(r.status).toBe(200)
    const data = await j(r)
    expect(data.succes).toBe(true)
    expect(data.donnees.token).toBeDefined()
    expect(data.donnees.user.role).toBe("admin")
  })

  test("Wrong password returns 401", async () => {
    const r = await api("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "admin@pngs-ie.sn", mot_de_passe: "wrongpass" }),
    })
    expect(r.status).toBe(401)
  })

  test("Protected route rejects unauthenticated", async () => {
    const r = await api("/api/candidates/me")
    expect(r.status).toBe(401)
  })
})

describe("AC3: Roles", () => {
  test("Candidate access /me", async () => {
    const r = await api("/api/auth/me", { headers: auth("candidat") })
    expect(r.status).toBe(200)
  })

  test("Enterprise blocked from candidate route", async () => {
    const r = await api("/api/candidates/me", { headers: auth("entreprise") })
    expect(r.status).toBe(403)
  })

  test("Admin stats accessible", async () => {
    const r = await api("/api/admin/statistics", { headers: auth("admin") })
    expect(r.status).toBe(200)
  })

  test("Non-admin blocked from stats", async () => {
    const r = await api("/api/admin/statistics", { headers: auth("candidat") })
    expect(r.status).toBe(403)
  })
})

describe("AC4: Offers", () => {
  test("Public list shows only published", async () => {
    const r = await api("/api/offers")
    const data = await j(r)
    expect(data.succes).toBe(true)
    expect(data.donnees.length).toBeGreaterThanOrEqual(3)
    expect(data.donnees.every((o: any) => o.statut === "publiee")).toBe(true)
  })

  test("Enterprise can list own offers", async () => {
    const r = await api("/api/offers/entreprise/mine", { headers: auth("entreprise") })
    const data = await j(r)
    expect(data.succes).toBe(true)
    expect(data.donnees.length).toBeGreaterThanOrEqual(1)
  })

  test("Candidate can view offer detail", async () => {
    const r = await api("/api/offers/offre-001", { headers: auth("candidat") })
    expect(r.status).toBe(200)
    const data = await j(r)
    expect(data.donnees.titre).toBeDefined()
  })
})

describe("AC5: Applications", () => {
  test("Candidate can apply", async () => {
    const r = await api("/api/applications?offre_id=offre-002", {
      method: "POST",
      headers: auth("candidat"),
      body: JSON.stringify({ message: "Test candidature" }),
    })
    expect(r.status).toBe(201)
  })

  test("Duplicate returns 409", async () => {
    const r = await api("/api/applications?offre_id=offre-001", {
      method: "POST",
      headers: auth("candidat"),
      body: JSON.stringify({ message: "Double" }),
    })
    expect(r.status).toBe(409)
  })

  test("Candidate sees their apps", async () => {
    const r = await api("/api/applications/mine", { headers: auth("candidat") })
    const data = await j(r)
    expect(data.succes).toBe(true)
    expect(data.donnees.length).toBeGreaterThanOrEqual(1)
  })

  test("Enterprise sees received apps", async () => {
    const r = await api("/api/applications/received", { headers: auth("entreprise") })
    const data = await j(r)
    expect(data.succes).toBe(true)
  })
})

describe("AC6: Conventions", () => {
  test("Can read convention", async () => {
    const r = await api("/api/conventions/conv-001", { headers: auth("entreprise") })
    const data = await j(r)
    expect(data.succes).toBe(true)
    expect(data.donnees.statut).toBe("validee_etablissement")
  })

  test("Enterprise cannot validate from wrong status", async () => {
    const r = await api("/api/conventions/conv-001/validate", {
      method: "POST",
      headers: auth("entreprise"),
    })
    const data = await j(r)
    expect(data.succes).toBe(false)
    expect(data.message).toContain("creee")
  })
})

describe("AC7: Security", () => {
  test("F02: body.role ignored in validate", async () => {
    const r = await api("/api/conventions/conv-001/validate", {
      method: "POST",
      headers: { ...auth("entreprise"), "Content-Type": "application/json" },
      body: JSON.stringify({ role: "admin" }),
    })
    const data = await j(r)
    expect(data.succes).toBe(false)
    expect(data.message).toContain("creee")
  })

  test("F03: statut blocked in org update", async () => {
    const r = await api("/api/organizations/org-001", {
      method: "PATCH",
      headers: auth("entreprise"),
      body: JSON.stringify({ nom: "TestName", statut: "inactif" }),
    })
    expect(r.status).toBe(200)
    const r2 = await api("/api/organizations/org-001", { headers: auth("entreprise") })
    const data = await j(r2)
    expect(data.donnees.nom).toBe("TestName")
    expect(data.donnees.statut).not.toBe("inactif")
  })

  test("F04: statut blocked in offer update via draft", async () => {
    const create = await api("/api/offers/entreprise", {
      method: "POST",
      headers: auth("entreprise"),
      body: JSON.stringify({
        titre: "Draft Offer",
        type: "stage_academique",
        description: "Test description for draft offer",
      }),
    })
    expect(create.status).toBe(201)
    const created = await j(create)
    const offerId = created.donnees.id
    const r = await api(`/api/offers/entreprise/${offerId}`, {
      method: "PATCH",
      headers: auth("entreprise"),
      body: JSON.stringify({ titre: "Updated", statut: "cloturee" }),
    })
    expect(r.status).toBe(200)
    const r2 = await api(`/api/offers/${offerId}`, { headers: auth("candidat") })
    const data = await j(r2)
    expect(data.donnees.titre).toBe("Updated")
    expect(data.donnees.statut).toBe("brouillon")
  })

  test("F05: statut blocked in convention update", async () => {
    const r = await api("/api/conventions/conv-001", {
      method: "PATCH",
      headers: auth("entreprise"),
      body: JSON.stringify({ missions: "F05-Test-missions", statut: "finalisee" }),
    })
    const r2 = await api("/api/conventions/conv-001", { headers: auth("entreprise") })
    const data = await j(r2)
    expect(data.donnees.missions).not.toContain("F05-Test-missions")
    expect(data.donnees.statut).not.toBe("finalisee")
  })

  test("F07: other org cannot change app status", async () => {
    const tokenOther = await login("rh@sonatel.sn")
    const r = await api("/api/applications/app-001/status", {
      method: "PATCH",
      headers: { Authorization: `Bearer ${tokenOther}`, "Content-Type": "application/json" },
      body: JSON.stringify({ statut: "en_etude" }),
    })
    expect(r.status).toBe(403)
  })

  test("F09: own org status change + history", async () => {
    const r = await api("/api/applications/app-002/status", {
      method: "PATCH",
      headers: auth("entreprise"),
      body: JSON.stringify({ statut: "en_etude", commentaire: "test" }),
    })
    const data = await j(r)
    expect(data.succes).toBe(true)
    const rh = await api("/api/applications/app-002/history", { headers: auth("entreprise") })
    const hist = await j(rh)
    expect(hist.donnees.length).toBeGreaterThanOrEqual(2)
  })

  test("F07bis: history blocked for unrelated user", async () => {
    const tokenOther = await login("rh@sonatel.sn")
    const r = await api("/api/applications/app-001/history", {
      headers: { Authorization: `Bearer ${tokenOther}` },
    })
    expect(r.status).toBe(403)
  })
})

describe("AC8: Stats", () => {
  test("Admin stats has all fields", async () => {
    const r = await api("/api/admin/statistics", { headers: auth("admin") })
    const data = await j(r)
    expect(data.succes).toBe(true)
    const s = data.donnees
    expect(typeof s.utilisateurs).toBe("number")
    expect(typeof s.offres_publiees).toBe("number")
    expect(Array.isArray(s.stages_par_mois)).toBe(true)
    expect(Array.isArray(s.stages_par_region)).toBe(true)
    expect(Array.isArray(s.repartition_candidatures)).toBe(true)
  })
})
