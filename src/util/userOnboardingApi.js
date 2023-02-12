const axios = require('axios');
const urlEndpoint = require('../config/User/onboardingEndpoints')


const generateOtp = async (encAadhar, token) => {
    const response = axios.post(urlEndpoint.generateOtpUrl, {
    aadhaar: encAadhar,
  },{
    headers: {
        Authorization: `Bearer ${token}`,
  }
  });
  return response;
}

const verifyOtp = async (encOtp, txnId, token) => {
    const response = await axios.post(urlEndpoint.verifyOtpUrl, {
          "otp": encOtp,
          "txnId": txnId
        },{
          headers: {
              Authorization: `Bearer ${token}`,
          }
        });
    return response;
}

const resendOtp = async (txnId, token) => {
  const response = await axios.post(urlEndpoint.resendOtpUrl, {
    "txnId": txnId
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return response;
}

const checkAndGenerateMobileOTP = async (mobileNum, txnId, token) => {
    const response = await axios.post(urlEndpoint.checkAndGenerateMobileOtpUrl, {
    "mobile": mobileNum,
    "txnId": txnId
},{
  headers:{
    Authorization: `Bearer ${token}`,
  }
});
return response;
}

const verifyMobileOtp = async (otp, txnId, token) => {
    const response = await axios.post(urlEndpoint.verifyMobilOtpUrl, {
      "otp": otp,
      "txnId": txnId
    },{
      headers: {
          Authorization: `Bearer ${token}`,
      }
    });
    return response;
}

const createHealthIdWithPreVerified = async (userData, userDetails, txnId, token) => {
    const response = await axios.post(urlEndpoint.createHealthIdUrl, {
    ...userData,
    ...userDetails,
    txnId: txnId,
},{
  headers:{
    Authorization: `Bearer ${token}`,
  }
});
return response
}

module.exports = { generateOtp, 
    verifyOtp,
    checkAndGenerateMobileOTP,
    verifyMobileOtp,
    createHealthIdWithPreVerified,
    resendOtp
}