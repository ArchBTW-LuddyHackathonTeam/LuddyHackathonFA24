import { SignJWT, JWTPayload, jwtVerify } from "jose"
import { Person } from '../db-types'
import { Request, Response, NextFunction } from "express"

const jwtSecret = new TextEncoder().encode(process.env.JWTSECRET)

export function forgeJWT(person: Person): Promise<String> {
  return new SignJWT({id: person.id, firstName: person.firstName, lastName: person.lastName} as JWTPayload)
  .setProtectedHeader({ alg: "HS256" })
  .setIssuedAt()
  .setExpirationTime("7d")
  .sign(jwtSecret)
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const tokenCookie: string | undefined = req.cookies.tk
  if (!tokenCookie) {
    res.clearCookie("tk").sendStatus(401)
    return
  }
  jwtVerify(tokenCookie, jwtSecret)
  .then(next)
  .catch(_ => res.clearCookie("tk").status(401).json({ error: "Unauthorized" }))
}

export function generateSalt(): string {
  return randomBytes(32).toString("hex")
}

export function hashPassword(): Promise<string> {
  return new Promise((_resolve, _reject) => {
  })
}
