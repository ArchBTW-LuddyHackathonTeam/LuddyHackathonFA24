import { Router } from "express"

const router = Router()

router.post("/", (_req, res) => {
  // TODO: insert SQL query here
  if (false /* Invalid Login */) {
    res.status(401).json({
      message: "Invalid Login"
    })
  }
  res.json({})
})

export default router
