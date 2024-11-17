import * as Joi from "joi"

export default Joi.object({
  firstName: Joi.string().max(50).required(),
  lastName: Joi.string().max(50).required(),
  email: Joi.string().email().max(254).required(),
  username: Joi.string().max(32).required(),
  locationId: Joi.number().min(0),
  title: Joi.string().max(50),
  phoneNumber: Joi.string().max(50)
})
