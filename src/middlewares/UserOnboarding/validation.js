const Joi = require('joi')
// const { calculateJwkThumbprint } = require('jose')

const aadhaarNumberSchema = Joi.object({
  aadhaar: Joi.string()
    .length(12)
    .pattern(/^[0-9]+$/)
    .required()
})

const otpSchema = Joi.object({
  otp: Joi.string()
    .length(6)
    .pattern(/^[0-9]+$/)
    .required(),
  txnId: Joi.string().length(36).required()
})

const mobileNumberSchema = Joi.object({
  mobile: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  txnId: Joi.string().length(36).required()
})

const userEmailPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  // must have lower-case, upper-case, number and special character and minimum 8 characters
  password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required(),
  txnId: Joi.string().length(36).required()
})

const transactionIdSchema = Joi.object({
  txnId: Joi.string().length(36).required()
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
      const { error } = userEmailPasswordSchema.validate(req.body)
      if (error) {
        throw new Error(error)
      }
    } else if (req.body.txnId !== undefined) {
      const { error } = transactionIdSchema.validate(req.body)
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
