const Joi = require('@hapi/joi')

const userValidationSchema = Joi.object({
  username: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
})

module.exports = userValidationSchema