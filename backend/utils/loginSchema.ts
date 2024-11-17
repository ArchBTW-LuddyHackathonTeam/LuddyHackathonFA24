import * as Joi from "joi"

export default Joi.object({
  email: Joi.string().email().required().max(254),
  password: Joi.string().required().max(32)
})
