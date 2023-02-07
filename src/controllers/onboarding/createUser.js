const axios = require('axios')
const crypto = require('crypto')
const abdm = require('../../util/abdm')


let transactioId = '';
let tokenGlobal = '';

const handleNewUserOnboardingRequest = async (request, response) => {
  //console.log(token);
  //console.log(request.body)
    const { token, decoded } = await abdm.getJWTToken();
    tokenGlobal = token;
    const aadhar = request.body.aadhaar.toString();
    const CERT_URL = 'https://healthidsbx.abdm.gov.in/api/v1/auth/cert'
    const publicKey = await axios.get(CERT_URL);
  console.log(publicKey.data);
  const encryptedAadhar = crypto.publicEncrypt({ key: publicKey.data, padding: crypto.constants.RSA_PKCS1_PADDING }, Buffer.from(aadhar, 'utf-8')).toString('base64')
   // const encryptedAadhar = crypto.publicEncrypt({key: publicKey.data},  Buffer.from(aadhar));
   // console.log(encryptedAadhar.toString('base64'));
  const responseTxId = await axios.post('https://healthidsbx.abdm.gov.in/api/v2/registration/aadhaar/generateOtp', {
    aadhaar: encryptedAadhar,
  },{
    headers: {
        Authorization: `Bearer ${token}`,
  }
  });

  // transactioID
  // send transaction id with redirect

  response.redirect('/users/verify');
};





const handleUserVerificationRequest = async (request, response) => {
  // request should contain opt and transaction id
  const userOtp = request.body.otp;
  // const userMobile = request.body.mobile;
  console.log('this is verify user');
  const responseTxnId = await axios.post('https://healthidsbx.abdm.gov.in/api/v1/registration/aadhaar/verifyOTP', {
      "otp": userOtp,
      "txnId": transactioId
    },{
      headers: {
          Authorization: `Bearer ${tokenGlobal}`,
      }
    });

    console.log(responseTxnId.data);

    response.redirect('');
}

const handleCheckAndGenerateMobileOTP = async (request, response) => {
  const userMobileNum = request.body.mobile;
  const responseTxnId = await axios.post('https://healthidsbx.abdm.gov.in/api/v2/registration/aadhaar/checkAndGenerateMobileOTP', {
    "mobile": userMobileNum,
    "txnId": transactioId
},{
  headers:{
    Authorization: `Bearer ${tokenGlobal}`,
  }
});

console.log(responseTxnId.data);
}

const verifyMobileOTP = async (request, response) => {
  const userOtp = request.body.otp;
  // const userMobile = request.body.mobile;
  console.log('this is verify Mobile OTP');
  const responseTxnId = await axios.post('https://healthidsbx.abdm.gov.in/api/v1/registration/aadhaar/verifyOTP', {
      "otp": userOtp,
      "txnId": transactioId
    },{
      headers: {
          Authorization: `Bearer ${tokenGlobal}`,
      }
    });

    console.log(responseTxnId.data);
}

const createHeathIDPreVerifiedNumber = async (request, response) => {

  const responseTxnId = await axios.post('https://healthidsbx.abdm.gov.in/api/v1/registration/aadhaar/createHealthIdWithPreVerified', {
    // "mobile": userMobileNum,
    // "txnId": transactioId
    ...request.body,
    txnId: transactioId,
},{
  headers:{
    Authorization: `Bearer ${tokenGlobal}`,
  }
});

console.log(responseTxnId.data);
}





module.exports = {}
module.exports.handleNewUserOnboardingRequest = handleNewUserOnboardingRequest
module.exports.handleUserVerificationRequest = handleUserVerificationRequest
module.exports.handleCheckAndGenerateMobileOTP = handleCheckAndGenerateMobileOTP
module.exports.verifyMobileOTP = verifyMobileOTP
module.exports.createHeathIDPreVerifiedNumber = createHeathIDPreVerifiedNumber