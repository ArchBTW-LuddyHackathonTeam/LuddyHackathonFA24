import express from "express"
import { forgeJWT } from "../auth"
import { Person } from "../db-types"
import sessionCreate from "../schemas/sessionCreate"
import DBInterface from "../db-interface"

const router = express()

const _db = new DBInterface()


router.post("/", (req, res) => {
  sessionCreate.validateAsync(req.body)
  .then(body => _db.getUserByEmailAndPasswordHash(body.email, body.password))
  .then(dbResults => {
    if (dbResults.length == 0) return Promise.reject({ message: "Invalid E-Mail or Password" })
    else return dbResults[0]
  })
  .then(body => forgeJWT({ id: body.id, firstName: body.firstName, lastName: body.lastName } as Person))
  .then(token => res.status(200).cookie("tk", token, { maxAge: 604800000, httpOnly: true }).json({ success: true }))
  .catch(message => {
    res.status(401).json({ error: message.message })
  })
})

export default router
