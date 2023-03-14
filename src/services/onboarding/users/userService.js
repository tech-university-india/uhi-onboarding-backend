const abdm = require('../../../util/abdm')
const pkKey = require('../../../util/publicKeyFetcher')
const encrypt = require('../../../util/encryptionUtil')
const HTTPError = require('../../../../src/util/error')
const axios = require('axios')
const urlEndpoint = require('../../../config/User/onboardingEndpoints')
const { redisClient, setKeyValuePairRedis, getValueFromKeyRedis, deleteKeyRedis } = require('../../../util/redisClient')

const handleNewUserOnboardingRequest = async (aadhar) => {
  const { token } = await abdm.getJWTToken()
  if (token === undefined) { return new HTTPError('Token not found', 404) }

  const publicKey = await pkKey.getPublicKey(token)

  const encryptedAadhar = await encrypt.getEncrypted(
    aadhar.toString(),
    publicKey
  )

  if (encryptedAadhar === undefined) { return new HTTPError('Something went wrong', 500) }
  const responseTxId = await axios.post(urlEndpoint.generateOtpUrl, {
    aadhaar: encryptedAadhar
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  await setKeyValuePairRedis(responseTxId.data.txnId, aadhar)

  return responseTxId.data.txnId
}

const handleUserVerificationRequest = async (otp, txnId) => {
  const { token } = await abdm.getJWTToken()

  if (token === undefined) { return new HTTPError('Token not found', 404) }

  const publicKey = await pkKey.getPublicKey(token)

  const encryptedOTP = await encrypt.getEncrypted(otp.toString(), publicKey)

  if (encryptedOTP === undefined) { return new HTTPError('Something went wrong', 500) }
  const txnResponse = await axios.post(urlEndpoint.verifyOtpUrl, {
    otp: encryptedOTP,
    txnId
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  let userData = txnResponse.data
  userData = { ...userData, aadhaar: await redisClient.get(txnId) }

  await deleteKeyRedis(txnId)

  await setKeyValuePairRedis(txnId, JSON.stringify(userData))

  return txnResponse.data.txnId
}

const handleResendOtp = async (txnId) => {
  const { token } = await abdm.getJWTToken()
  if (token === undefined) { return new HTTPError('Token not found', 404) }
  const txnResponse = await axios.post(urlEndpoint.resendOtpUrl, {
    txnId
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return ({
    mobile: txnResponse.data.mobile,
    txnId: txnResponse.data.txnId
  })
}

const handleCheckAndGenerateMobileOTP = async (mobileNum, txnId) => {
  const { token } = await abdm.getJWTToken()
  if (token === undefined) { return new HTTPError('Token not found', 404) }
  const txnResponse = await axios.post(urlEndpoint.checkAndGenerateMobileOtpUrl, {
    mobile: mobileNum,
    txnId
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return {
    isLinked: txnResponse.data.mobileLinked,
    txnId: txnResponse.data.txnId
  }
}

const verifyMobileOtp = async (otp, txnId) => {
  const { token } = await abdm.getJWTToken()
  if (token === undefined) { return new HTTPError('Token not found', 404) }
  const userOtp = otp
  const txnResponse = await axios.post(urlEndpoint.verifyMobilOtpUrl, {
    otp: userOtp,
    txnId
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return txnResponse.data.txnId
}

const createHeathIDPreVerifiedNumber = async (email, password, healthId, txnId) => {
  const { token } = await abdm.getJWTToken()
  if (token === undefined) { return new HTTPError('Token not found', 404) }

  let userData = await getValueFromKeyRedis(txnId)
  userData = JSON.parse(userData)
  const aadhaar = userData.aadhaar
  delete userData.aadhaar

  const txnResponse = await axios.post(urlEndpoint.createHealthIdUrl, {
    ...userData,
    email,
    password,
    healthId,
    txnId
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const mobile = txnResponse.data.mobile
  const userDetails = {
    userName: txnResponse.data.name,
    healthIdNumber: txnResponse.data.healthIdNumber,
    firstName: txnResponse.data.firstName,
    lastName: txnResponse.data.lastName,
    middleName: txnResponse.data.middleName,
    profilePhoto: txnResponse.data.profilePhoto,
    emailId: email,
    phoneNumber: mobile,
    address: `${userData.house} ${userData.locality} ${userData.street} ${userData.landmark === null ? '' : userData.landmark} ${userData.villageTownCity} ${userData.subDistrict === null ? '' : userData.subDistrict} ${userData.district} ${userData.state} ${userData.pinCode}`,
    dateOfBirth: `${txnResponse.data.yearOfBirth}-${txnResponse.data.monthOfBirth}-${txnResponse.data.dayOfBirth}`,
    gender: txnResponse.data.gender,
    aadhaar
  }

  // make an axios call to create user in the database
  await axios.post(urlEndpoint.userServiceUrl, {
    ...userDetails
  })

  return userDetails.healthIdNumber
}

module.exports = {
  handleNewUserOnboardingRequest,
  handleUserVerificationRequest,
  handleCheckAndGenerateMobileOTP,
  verifyMobileOtp,
  createHeathIDPreVerifiedNumber,
  handleResendOtp
}
