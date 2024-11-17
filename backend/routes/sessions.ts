import express from "express"
import { createToken, hashPassword } from "../utils/auth"
import { Person } from "../db-types"
import login from "../utils/loginSchema"
import DBInterface from "../db-interface"

const router = express()

const _db = new DBInterface()


router.post("/", (req, res) => {
  login.validateAsync(req.body)
  .then(body => Promise.all([body.email, body.password, _db.getPeopleByEmail(body.email)]))
  .then(body => {
    if (body[2].length == 0) return Promise.reject({ message: "Invalid E-Mail or Password" })
    else return Promise.all([body[0], body[1], body[2][0]])
  })
  .then(body => Promise.all([body[0], body[1], _db.getUserSaltById(body[2].id)]))
  .then(body => Promise.all([body[0], hashPassword(body[1], body[2])]))
  .then(body => _db.getUserByEmailAndPasswordHash(body[0], body[1]))
  .then(dbResults => {
    if (dbResults.length == 0) return Promise.reject({ message: "Invalid E-Mail or Password" })
    else return dbResults[0]
  })
  .then(body => createToken({ id: body.id, firstName: body.firstName, lastName: body.lastName } as Person))
  .then(token => res.status(200).cookie("tk", token, { maxAge: 604800000, httpOnly: true }).json({ success: true }))
  .catch(message => {
    res.status(401).json({ error: message.message })
  })
})

router.delete("/", (req, res) => {
  if (req.cookies.tk) res.clearCookie("tk").status(200).json({ success: true })
  else res.status(400).json({ success: false })
})

export default router
