const axios = require("axios");
const crypto = require("crypto");
const abdm = require("../../../util/abdm");
const pkKey = require("../../../util/publicKeyFetcher");
const encrypt = require("../../../util/encryptionUtil");
const userApis = require("../../../util/userOnboardingApi");

let tokenGlobal = "";
let publicKeyGlobal = "";
let transactionId = "";
let isLinked = false;
let userData = {};

const handleNewUserOnboardingRequest = async (aadhar) => {
  const { token, decoded } = await abdm.getJWTToken();
  tokenGlobal = token;
  publicKeyGlobal = await pkKey.getPublicKey();
  const encryptedAadhar = await encrypt.getEncrypted(
    aadhar.toString(),
    publicKeyGlobal
  );
  const responseTxId = await userApis.generateOtp(encryptedAadhar, token);
  console.log(responseTxId.data);
  transactionId = responseTxId.data.txnId;

  // transactioID
  // send transaction id with redirect
  //response.redirect('/users/verify');
};

const handleUserVerificationRequest = async (otp) => {
  const encryptedOTP = await encrypt.getEncrypted(otp.toString(), publicKeyGlobal);
  const txnResponse = await userApis.verifyOtp(
    encryptedOTP,
    transactionId,
    tokenGlobal
  );

  userData = txnResponse.data;
  console.log(txnResponse.data);
  transactionId = txnResponse.data.txnId;
  console.log(transactionId);
};

const handleCheckAndGenerateMobileOTP = async (mobileNum) => {
  //const encryptedMobile = encrypt.getEncrypted(mobileNum.toString(), publicKeyGlobal);
  const txnResponse = await userApis.checkAndGenerateMobileOTP(
    mobileNum,
    transactionId,
    tokenGlobal
  );
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
  console.log(txnResponse.data);
};

module.exports = {
  handleNewUserOnboardingRequest,
  handleUserVerificationRequest,
  handleCheckAndGenerateMobileOTP,
  verifyMobileOtp,
  createHeathIDPreVerifiedNumber,
};
