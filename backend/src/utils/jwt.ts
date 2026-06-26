import { SignJWT, jwtVerify, type JWTPayload } from "jose"
import { config } from "../config"
import type { AuthUser } from "../types"

const secret = new TextEncoder().encode(config.jwtSecret)

export async function signToken(user: AuthUser): Promise<string> {
  return await new SignJWT({ ...user } as unknown as JWTPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(config.jwtExpiresIn)
    .sign(secret)
}

export async function verifyToken(token: string): Promise<AuthUser> {
  const { payload } = await jwtVerify(token, secret)
  return payload as unknown as AuthUser
}
