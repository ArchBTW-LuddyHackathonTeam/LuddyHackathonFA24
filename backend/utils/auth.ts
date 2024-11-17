import { SignJWT, JWTPayload, jwtVerify } from "jose"
import { Person } from '../db-types'
import { Request, Response, NextFunction } from "express"
import { randomBytes } from "crypto"

const jwtSecret = new TextEncoder().encode(process.env.JWTSECRET)

export function createToken(person: Person): Promise<String> {
  return new SignJWT({id: person.id, firstName: person.firstName, lastName: person.lastName} as JWTPayload)
  .setProtectedHeader({ alg: "HS256" })
  .setIssuedAt()
  .setExpirationTime("7d")
  .sign(jwtSecret)
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const tokenCookie: string | undefined = req.cookies.tk
  if (!tokenCookie) {
    res.clearCookie("tk").status(401).json({ error: "Unauthorized" })
    return
  }
  jwtVerify(tokenCookie, jwtSecret)
  .then(_ => next())
  .catch(_ => res.clearCookie("tk").status(401).json({ error: "Unauthorized" }))
}

export function decodeToken(token: string): Promise<Person> {
  return jwtVerify(token, jwtSecret)
  .then(res => res.payload as object as Person)
  .catch(Promise.reject)
}

export function generateSalt(): string {
  return randomBytes(32).toString("hex")
}

export function hashPassword(): Promise<string> {
  return new Promise((_resolve, _reject) => {
  })
}
