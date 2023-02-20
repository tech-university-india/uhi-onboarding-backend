const userService = require('../../services/onboarding/users/userService')
const HTTPError = require('../../../src/util/error')

const handleNewUserOnboardingRequest = async (request, response) => {
  try {
    const { aadhaar } = request.body
    const details = await userService.handleNewUserOnboardingRequest(aadhaar)
    if (details instanceof HTTPError) throw details
    response.status(200).json('OTP sent successfully')
  } catch (e) {
    response.send(e.message)
  }
}

const handleUserVerificationRequest = async (request, response) => {
  try {
    const userOtp = request.body.otp
    const details = await userService.handleUserVerificationRequest(userOtp)
    if (details instanceof HTTPError) {
      throw new HTTPError('OTP could not be verified', 400)
    }
    response.status(200).json('OTP verified successfully')
  } catch (e) {
    response.send(e.message)
  }
}

const resendOTP = async (request, response) => {
  try {
    const details = await userService.handleResendOtp()
    if (details instanceof HTTPError) throw details
    response.status(200).json('OTP sent successfully')
  } catch (e) {
    response.send(e.message)
  }
}

const handleCheckAndGenerateMobileOTP = async (request, response) => {
  try {
    const userMobileNum = request.body.mobile
    const isLinked = await userService.handleCheckAndGenerateMobileOTP(
      userMobileNum
    )
    if (isLinked === true) { response.status(200).json('Mobile number already linked with aadhaar') } else { response.status(200).json('OTP sent successfully to this mobile number') }
  } catch (e) {
    response.send(e.message)
  }
}

const verifyMobileOTP = async (request, response) => {
  try {
    const userOtp = request.body.otp
    const details = await userService.verifyMobileOtp(userOtp)
    if (details instanceof HTTPError) throw details
    response.status(200).json('OTP verified successfully')
  } catch (e) {
    response.send(e.message)
  }
}

const createHeathIDPreVerifiedNumber = async (request, response) => {
  try {
    const userDetails = request.body
    const details = await userService.createHeathIDPreVerifiedNumber(
      userDetails
    )
    if (details instanceof HTTPError) throw details
    response
      .status(200)
      .json(
        `ABHA Health ID created successfully. Your ABHA Health ID is ${details.userData.healthId}`
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
