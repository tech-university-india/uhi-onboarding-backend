const userService = require('../../services/onboarding/users/userService')
const HTTPError = require('../../../src/util/error')

const handleNewUserOnboardingRequest = async (request, response) => {
  try {
    const { aadhaar } = request.body
    const details = await userService.handleNewUserOnboardingRequest(aadhaar)
    if (details instanceof HTTPError) throw details
    response.status(200).json({ message: 'OTP sent successfully', txnId: details })
  } catch (e) {
    response.send(e.message)
  }
}

const handleUserVerificationRequest = async (request, response) => {
  try {
    const userOtp = request.body.otp
    const txnId = request.body.txnId
    const details = await userService.handleUserVerificationRequest(userOtp, txnId)
    if (details instanceof HTTPError) {
      throw new HTTPError('OTP could not be verified', 400)
    }
    response.status(200).json({ message: 'OTP verified successfully', txnId: details })
  } catch (e) {
    response.send(e.message)
  }
}

const resendOTP = async (request, response) => {
  try {
    const { txnId } = request.body
    const details = await userService.handleResendOtp(txnId)
    if (details instanceof HTTPError) throw details
    response.status(200).json({ message: `OTP sent successfully on ${details.mobile}`, txnId: details.txnId })
  } catch (e) {
    response.send(e.message)
  }
}

const handleCheckAndGenerateMobileOTP = async (request, response) => {
  try {
    const userMobileNum = request.body.mobile
    const { txnId } = request.body
    const linked = await userService.handleCheckAndGenerateMobileOTP(
      userMobileNum, txnId
    )
    if (linked.isLinked === true) {
      response.status(200).json({
        message: 'Mobile number already linked with aadhaar',
        txnId: linked.txnId
      })
    } else {
      response.status(200).json({
        message: 'OTP sent successfully to this mobile number',
        txnId: linked.txnId
      })
    }
  } catch (e) {
    response.send(e.message)
  }
}

const verifyMobileOTP = async (request, response) => {
  try {
    const userOtp = request.body.otp
    const { txnId } = request.body
    const details = await userService.verifyMobileOtp(userOtp, txnId)
    if (details instanceof HTTPError) throw details
    response.status(200).json({ message: 'OTP verified successfully', txnId: details })
  } catch (e) {
    response.send(e.message)
  }
}

const createHeathIDPreVerifiedNumber = async (request, response) => {
  try {
    const userEmail = request.body.email
    const userPassword = request.body.password
    const healthId = request.body.healthId
    const { txnId } = request.body
    const details = await userService.createHeathIDPreVerifiedNumber(
      userEmail, userPassword, healthId, txnId
    )
    if (details instanceof HTTPError) throw details
    response
      .status(200)
      .json(
        `ABHA Health ID created successfully. Your ABHA Health ID is ${details}`
      )
  } catch (e) {
    response.send(e.message)
  }
}

module.exports = {}
module.exports.handleNewUserOnboardingRequest = handleNewUserOnboardingRequest
module.exports.handleUserVerificationRequest = handleUserVerificationRequest
module.exports.handleCheckAndGenerateMobileOTP =
  handleCheckAndGenerateMobileOTP
module.exports.verifyMobileOTP = verifyMobileOTP
module.exports.createHeathIDPreVerifiedNumber = createHeathIDPreVerifiedNumber
module.exports.resendOTP = resendOTP
