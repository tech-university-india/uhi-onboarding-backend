const abdm = require("../../../util/abdm");
const pkKey = require("../../../util/publicKeyFetcher");
const encrypt = require("../../../util/encryptionUtil");
const HTTPError = require("../../../../src/util/error");
const axios = require('axios');
const urlEndpoint = require('../../../config/User/onboardingEndpoints')

let tokenGlobal = "";
let publicKeyGlobal = "";
let transactionId = "";
let isLinked = false;
let userData = {};

const handleNewUserOnboardingRequest = async (aadhar) => {
  const { token, decoded } = await abdm.getJWTToken();
  if(token===undefined)
    return new HTTPError("Token not found",404);
  tokenGlobal = token;
  publicKeyGlobal = await pkKey.getPublicKey(tokenGlobal);
  const encryptedAadhar = await encrypt.getEncrypted(
    aadhar.toString(),
    publicKeyGlobal
  );
  if(encryptedAadhar===undefined)
    return new HTTPError("Something went wrong",500);
  const responseTxId=await axios.post(urlEndpoint.generateOtpUrl, {
    aadhaar: encryptedAadhar,
  },{
    headers: {
        Authorization: `Bearer ${tokenGlobal}`,
  }
  });
  transactionId = responseTxId.data.txnId;
  return responseTxId.data;
};

const handleUserVerificationRequest = async (otp) => {
  const encryptedOTP = await encrypt.getEncrypted(otp.toString(), publicKeyGlobal);
  if(encryptedOTP===undefined)
    return new HTTPError("Something went wrong",500);
  const txnResponse=await axios.post(urlEndpoint.verifyOtpUrl, {
    "otp": encryptedOTP,
    "txnId": transactionId
  },{
    headers: {
        Authorization: `Bearer ${tokenGlobal}`,
    }
  });
  transactionId = txnResponse.data.txnId;
  userData = txnResponse.data;
  return txnResponse.data;
};

const handleResendOtp = async () => {
  const txnResponse = await axios.post(urlEndpoint.resendOtpUrl, {
    "txnId": transactionId
  }, {
    headers: {
      Authorization: `Bearer ${tokenGlobal}`,
    }
  });
  transactionId = txnResponse.data.txnId;
  return txnResponse.data;
}

const handleCheckAndGenerateMobileOTP = async (mobileNum) => {
  const txnResponse = await axios.post(urlEndpoint.checkAndGenerateMobileOtpUrl, {
    "mobile": mobileNum,
    "txnId": transactionId
},{
  headers:{
    Authorization: `Bearer ${tokenGlobal}`,
  }
});
  transactionId = txnResponse.data.txnId;
  isLinked = txnResponse.data.mobileLinked;
  return isLinked;
};



const verifyMobileOtp = async (otp) => {
  const userOtp = otp;
  const txnResponse = await axios.post(urlEndpoint.verifyMobilOtpUrl, {
    "otp": userOtp,
    "txnId": transactionId
  },{
    headers: {
        Authorization: `Bearer ${tokenGlobal}`,
    }
  });
  transactionId = txnResponse.data.txnId;
  return txnResponse.data;
};

const createHeathIDPreVerifiedNumber = async (userDetails) => {
  const txnResponse = await axios.post(urlEndpoint.createHealthIdUrl, {
    ...userData,
    ...userDetails,
    txnId: transactionId,
},{
  headers:{
    Authorization: `Bearer ${tokenGlobal}`,
  }
});
  return txnResponse.data;
};

module.exports = {
  handleNewUserOnboardingRequest,
  handleUserVerificationRequest,
  handleCheckAndGenerateMobileOTP,
  verifyMobileOtp,
  createHeathIDPreVerifiedNumber,
  handleResendOtp
};
