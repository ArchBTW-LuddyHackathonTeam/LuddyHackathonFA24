import { SignJWT, JWTPayload } from "jose"
import { Person } from './db-types'

export function forgeJWT(person: Person): Promise<String> {
  return new SignJWT({id: person.id, firstName: person.firstName, lastName: person.lastName} as JWTPayload)
  .setProtectedHeader({ alg: "HS256" })
  .setIssuedAt()
  .setExpirationTime("7d")
  .sign(new TextEncoder().encode(process.env.JWTSECRET))
}
