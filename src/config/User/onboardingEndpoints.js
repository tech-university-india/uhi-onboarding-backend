
const generateOtpUrl = 'https://healthidsbx.abdm.gov.in/api/v2/registration/aadhaar/generateOtp'
const verifyOtpUrl = 'https://healthidsbx.abdm.gov.in/api/v2/registration/aadhaar/verifyOTP'
const resendOtpUrl = 'https://healthidsbx.abdm.gov.in/api/v1/registration/aadhaar/resendAadhaarOtp'
const checkAndGenerateMobileOtpUrl = 'https://healthidsbx.abdm.gov.in/api/v2/registration/aadhaar/checkAndGenerateMobileOTP'
const verifyMobilOtpUrl = 'https://healthidsbx.abdm.gov.in/api/v1/registration/aadhaar/verifyMobileOTP'
const createHealthIdUrl = 'https://healthidsbx.abdm.gov.in/api/v1/registration/aadhaar/createHealthIdWithPreVerified'

module.exports = {
    generateOtpUrl,
    verifyOtpUrl,
    resendOtpUrl,
    checkAndGenerateMobileOtpUrl,
    verifyMobilOtpUrl,
    createHealthIdUrl
}