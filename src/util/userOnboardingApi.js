const axios = require('axios');



const generateOtp = async (encAadhar, token) => {
    const response = axios.post('https://healthidsbx.abdm.gov.in/api/v2/registration/aadhaar/generateOtp', {
    aadhaar: encAadhar,
  },{
    headers: {
        Authorization: `Bearer ${token}`,
  }
  });
  return response;
}

const verifyOtp = async (encOtp, txnId, token) => {
    const response = await axios.post('https://healthidsbx.abdm.gov.in/api/v2/registration/aadhaar/verifyOTP', {
        // if v2 use encryptedOTP
          "otp": encOtp,//userOtp,
          "txnId": txnId
        },{
          headers: {
              Authorization: `Bearer ${token}`,
          }
        });
    return response;
}

const checkAndGenerateMobileOTP = async (mobileNum, txnId, token) => {
    const response = await axios.post('https://healthidsbx.abdm.gov.in/api/v2/registration/aadhaar/checkAndGenerateMobileOTP', {
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
    const response = await axios.post('https://healthidsbx.abdm.gov.in/api/v1/registration/aadhaar/verifyMobileOTP', {
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
    const response = await axios.post('https://healthidsbx.abdm.gov.in/api/v1/registration/aadhaar/createHealthIdWithPreVerified', {
    // "mobile": userMobileNum,
    // "txnId": transactioId
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
    createHealthIdWithPreVerified
}