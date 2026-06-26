export const config = {
  port: parseInt(process.env.PORT || "3001", 10),
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
  jwtSecret: process.env.JWT_SECRET || "dev-secret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  dbEngine: process.env.DB_ENGINE || "sqlite",
  sqlitePath: process.env.SQLITE_PATH || "./data/pngs-ie.db",
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE || "5242880", 10),
  uploadDir: process.env.UPLOAD_DIR || "./storage",
} as const
