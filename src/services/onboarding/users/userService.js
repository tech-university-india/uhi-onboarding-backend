const abdm = require('../../../util/abdm')
const pkKey = require('../../../util/publicKeyFetcher')
const encrypt = require('../../../util/encryptionUtil')
const HTTPError = require('../../../../src/util/error')
const axios = require('axios')
const urlEndpoint = require('../../../config/User/onboardingEndpoints')

let tokenGlobal = ''
let publicKeyGlobal = ''
let userData = {}

const handleNewUserOnboardingRequest = async (aadhar) => {
  const { token } = await abdm.getJWTToken()
  if (token === undefined) { return new HTTPError('Token not found', 404) }
  tokenGlobal = token
  publicKeyGlobal = await pkKey.getPublicKey(tokenGlobal)
  const encryptedAadhar = await encrypt.getEncrypted(
    aadhar.toString(),
    publicKeyGlobal
  )
  if (encryptedAadhar === undefined) { return new HTTPError('Something went wrong', 500) }
  const responseTxId = await axios.post(urlEndpoint.generateOtpUrl, {
    aadhaar: encryptedAadhar
  }, {
    headers: {
      Authorization: `Bearer ${tokenGlobal}`
    }
  })
  return responseTxId.data.txnId
}

const handleUserVerificationRequest = async (otp, txnId) => {
  const encryptedOTP = await encrypt.getEncrypted(otp.toString(), publicKeyGlobal)
  if (encryptedOTP === undefined) { return new HTTPError('Something went wrong', 500) }
  const txnResponse = await axios.post(urlEndpoint.verifyOtpUrl, {
    otp: encryptedOTP,
    txnId
  }, {
    headers: {
      Authorization: `Bearer ${tokenGlobal}`
    }
  })
  userData = txnResponse.data
  return txnResponse.data.txnId
}

const handleResendOtp = async (txnId) => {
  const txnResponse = await axios.post(urlEndpoint.resendOtpUrl, {
    txnId
  }, {
    headers: {
      Authorization: `Bearer ${tokenGlobal}`
    }
  })
  return ({
    mobile: txnResponse.data.mobile,
    txnId: txnResponse.data.txnId
  })
}

const handleCheckAndGenerateMobileOTP = async (mobileNum, txnId) => {
  const txnResponse = await axios.post(urlEndpoint.checkAndGenerateMobileOtpUrl, {
    mobile: mobileNum,
    txnId
  }, {
    headers: {
      Authorization: `Bearer ${tokenGlobal}`
    }
  })
  return {
    isLinked: txnResponse.data.mobileLinked,
    txnId: txnResponse.data.txnId
  }
}

const verifyMobileOtp = async (otp, txnId) => {
  const userOtp = otp
  const txnResponse = await axios.post(urlEndpoint.verifyMobilOtpUrl, {
    otp: userOtp,
    txnId
  }, {
    headers: {
      Authorization: `Bearer ${tokenGlobal}`
    }
  })
  return txnResponse.data.txnId
}

const createHeathIDPreVerifiedNumber = async (email, password, txnId) => {
  const txnResponse = await axios.post(urlEndpoint.createHealthIdUrl, {
    ...userData,
    email,
    password,
    txnId
  }, {
    headers: {
      Authorization: `Bearer ${tokenGlobal}`
    }
  })
  const mobile = txnResponse.data.mobile
  const userDetails = {
    userName: txnResponse.data.name,
    healthId: txnResponse.data.healthIdNumber,
    firstName: txnResponse.data.firstName,
    lastName: txnResponse.data.lastName,
    middleName: txnResponse.data.middleName,
    profilePhoto: txnResponse.data.profilePhoto,
    emailId: email,
    phoneNumber: mobile,
    address: `${userData.house} ${userData.locality} ${userData.street} ${userData.landmark === null ? '' : userData.landmark} ${userData.villageTownCity} ${userData.subDistrict === null ? '' : userData.subDistrict} ${userData.district} ${userData.state} ${userData.pinCode}`,
    dateOfBirth: `${txnResponse.data.yearOfBirth}-${txnResponse.data.monthOfBirth}-${txnResponse.data.dayOfBirth}`,
    gender: txnResponse.data.gender
  }
  // make an axios call to create user in the database

  return userDetails.userData.healthId
}

module.exports = {
  handleNewUserOnboardingRequest,
  handleUserVerificationRequest,
  handleCheckAndGenerateMobileOTP,
  verifyMobileOtp,
  createHeathIDPreVerifiedNumber,
  handleResendOtp
}
