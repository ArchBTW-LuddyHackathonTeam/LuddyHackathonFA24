import { SignJWT, JWTPayload, jwtVerify } from "jose"
import { Person } from '../db-types'
import { Request, Response, NextFunction } from "express"
import { randomBytes, pbkdf2 } from "crypto"

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

export function hashPassword(password: string, salt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    pbkdf2(password, salt, 100000, 64, "sha256", (err, derivedKey) => {
      if (err) reject({ message: err })
      else resolve(derivedKey.toString('hex'));  // '3745e48...08d59ae'
    });
  })
}
