const abdm = require("../../../util/abdm");
const pkKey = require("../../../util/publicKeyFetcher");
const encrypt = require("../../../util/encryptionUtil");
const userApis = require("../../../util/userOnboardingApi");
const HTTPError = require("../../../../src/util/error");

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
    return new HTTPError("Aadhaar could not be encrypted",500);
  const responseTxId = await userApis.generateOtp(encryptedAadhar, token);
  if(responseTxId.data===undefined)
    return new HTTPError("OTP not generated",400);
  transactionId = responseTxId.data.txnId;
  return responseTxId.data;
  // console.log(responseTxId)
  // console.log(responseTxId.data);
};

const handleUserVerificationRequest = async (otp) => {
  const encryptedOTP = await encrypt.getEncrypted(otp.toString(), publicKeyGlobal);
  if(encryptedOTP===undefined)
    return new HTTPError("OTP could not be encrypted",500);
  const txnResponse = await userApis.verifyOtp(
    encryptedOTP,
    transactionId,
    tokenGlobal
  );
 
  if(txnResponse.data===undefined)
    return new HTTPError("OTP could not be verified",400);
  userData = txnResponse.data;
  transactionId = txnResponse.data.txnId;
};

const handleResendOtp = async () => {
  const txnResponse = await userApis.resendOtp(transactionId, tokenGlobal);
  if(txnResponse===undefined)
  return new HTTPError("OTP could not be resent",400);
  console.log(txnResponse.data);
  transactionId = txnResponse.data.txnId;
}

const handleCheckAndGenerateMobileOTP = async (mobileNum) => {
  const txnResponse = await userApis.checkAndGenerateMobileOTP(
    mobileNum,
    transactionId,
    tokenGlobal
  );
  if(txnResponse===undefined)
  return new HTTPError("Mobile number could not be checked",400);
  console.log(txnResponse.data);
  transactionId = txnResponse.data.txnId;
  isLinked = txnResponse.data.mobileLinked;
};



const verifyMobileOtp = async (otp) => {
  const userOtp = otp;
  const txnResponse = await userApis.verifyMobileOtp(
    userOtp,
    transactionId,
    tokenGlobal
  );
  if(txnResponse===undefined)
  return new HTTPError("OTP could not be verified",400);
  console.log(txnResponse.data);
  transactionId = txnResponse.data.txnId;
};

const createHeathIDPreVerifiedNumber = async (userDetails) => {
  const txnResponse = await userApis.createHealthIdWithPreVerified(
    userData,
    userDetails,
    transactionId,
    tokenGlobal
  );
  if(txnResponse===undefined)
  return new HTTPError("Health ID could not be created",400);
  console.log(txnResponse.data);
};

module.exports = {
  handleNewUserOnboardingRequest,
  handleUserVerificationRequest,
  handleCheckAndGenerateMobileOTP,
  verifyMobileOtp,
  createHeathIDPreVerifiedNumber,
  handleResendOtp
};
