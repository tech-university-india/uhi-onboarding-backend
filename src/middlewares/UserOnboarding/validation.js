const Joi = require('joi')
// const { calculateJwkThumbprint } = require('jose')

const aadhaarNumberSchema = Joi.object({
  aadhaar: Joi.string().length(12).pattern(/^[0-9]+$/).required()
})

const otpSchema = Joi.object({
  otp: Joi.string().length(6).pattern(/^[0-9]+$/).required()
})

const mobileNumberSchema = Joi.object({
  mobile: Joi.string().length(10).pattern(/^[0-9]+$/).required()
})

const userEmailSchema = Joi.object({
  email: Joi.string().email().required()
})

const Validator = async (req, res, next) => {
  try {
    if (req.body.aadhaar !== undefined) {
      const { error } = aadhaarNumberSchema.validate(req.body)
      if (error) {
        throw new Error(error)
      }
    } else if (req.body.otp !== undefined) {
      const { error } = otpSchema.validate(req.body)
      if (error) {
        throw new Error(error)
      }
    } else if (req.body.mobile !== undefined) {
      const { error } = mobileNumberSchema.validate(req.body)
      if (error) {
        throw new Error(error)
      }
    } else if (req.body.email !== undefined) {
      const { error } = userEmailSchema.validate(req.body)
      if (error) {
        throw new Error(error)
      }
    }
    next()
  } catch (e) {
    res.status(400).send(e.message)
  }
}

module.exports = { Validator }
