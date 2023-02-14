const getPublicKeyUrl = 'https://healthidsbx.abdm.gov.in/api/v2/auth/cert'
const baseUrl='https://healthidsbx.abdm.gov.in/api/';


const generateOtpUrl = `${baseUrl}v2/registration/aadhaar/generateOtp`
const verifyOtpUrl = `${baseUrl}v2/registration/aadhaar/verifyOTP`
const resendOtpUrl = `${baseUrl}v1/registration/aadhaar/resendAadhaarOtp`
const checkAndGenerateMobileOtpUrl = `${baseUrl}v2/registration/aadhaar/checkAndGenerateMobileOTP`
const verifyMobilOtpUrl = `${baseUrl}v1/registration/aadhaar/verifyMobileOTP`
const createHealthIdUrl = `${baseUrl}v1/registration/aadhaar/createHealthIdWithPreVerified`

module.exports = {
    generateOtpUrl,
    verifyOtpUrl,
    resendOtpUrl,
    checkAndGenerateMobileOtpUrl,
    verifyMobilOtpUrl,
    createHealthIdUrl,
    getPublicKeyUrl
}