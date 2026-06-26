import { Hono } from "hono"
import { corsMiddleware } from "./middlewares/cors.middleware"
import { errorMiddleware } from "./middlewares/error.middleware"
import { initializeDatabase } from "./database/init"
import { config } from "./config"
import authRoutes from "./routes/auth.routes"
import userRoutes from "./routes/users.routes"
import candidateRoutes from "./routes/candidates.routes"
import organizationRoutes from "./routes/organizations.routes"
import offerRoutes from "./routes/offers.routes"
import applicationRoutes from "./routes/applications.routes"
import conventionRoutes from "./routes/conventions.routes"
import statisticsRoutes from "./routes/statistics.routes"
import adminRoutes from "./routes/admin.routes"

const app = new Hono()

app.use("*", corsMiddleware)
app.onError(errorMiddleware)

initializeDatabase()

app.get("/api/health", (c) => {
  return c.json({ succes: true, message: "API PNGS-IE operationnelle", version: "1.0.0" })
})

app.route("/api/auth", authRoutes)
app.route("/api/users", userRoutes)
app.route("/api/candidates", candidateRoutes)
app.route("/api/organizations", organizationRoutes)
app.route("/api/offers", offerRoutes)
app.route("/api/applications", applicationRoutes)
app.route("/api/conventions", conventionRoutes)
app.route("/api/statistics", statisticsRoutes)
app.route("/api/admin", adminRoutes)

console.log(`[PNGS-IE] Backend demarre sur le port ${config.port}`)

export default {
  port: config.port,
  fetch: app.fetch,
}
