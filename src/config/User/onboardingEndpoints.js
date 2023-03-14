require('dotenv').config()

const getPublicKeyUrl = 'https://healthidsbx.abdm.gov.in/api/v2/auth/cert'
const baseUrl = 'https://healthidsbx.abdm.gov.in/api/'

const generateOtpUrl = `${baseUrl}v2/registration/aadhaar/generateOtp`
const verifyOtpUrl = `${baseUrl}v2/registration/aadhaar/verifyOTP`
const resendOtpUrl = `${baseUrl}v1/registration/aadhaar/resendAadhaarOtp`
const checkAndGenerateMobileOtpUrl = `${baseUrl}v2/registration/aadhaar/checkAndGenerateMobileOTP`
const verifyMobilOtpUrl = `${baseUrl}v1/registration/aadhaar/verifyMobileOTP`
const createHealthIdUrl = `${baseUrl}v1/registration/aadhaar/createHealthIdWithPreVerified`
const userServiceUrl = `http://${process.env.USER_SERVICE_HOST}:${process.env.USER_SERVICE_PORT}/user`

module.exports = {
  generateOtpUrl,
  verifyOtpUrl,
  resendOtpUrl,
  checkAndGenerateMobileOtpUrl,
  verifyMobilOtpUrl,
  createHealthIdUrl,
  getPublicKeyUrl,
  userServiceUrl
}
