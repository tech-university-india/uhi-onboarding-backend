const userService = require("../../services/onboarding/users/userService");
const HTTPError = require("../../../src/util/error");

const handleNewUserOnboardingRequest = async (request, response) => {
  try{
    let { aadhaar } = request.body;
    const details=await userService.handleNewUserOnboardingRequest(aadhaar);
    console.log("hi")
    console.log(details.res);
    if(details instanceof HTTPError)
      throw details;
    response.status(200).json(details);
  }
  catch(e){
    response.send(e.message);
  }
};

const handleUserVerificationRequest = async (request, response) => {
  try{
    let userOtp = request.body.otp;
    const details=await userService.handleUserVerificationRequest(userOtp);
    console.log(details)
    if(details instanceof HTTPError){
      console.log('error')
      throw new HTTPError("OTP could not be verified",400);
    }
    response.status(200).json(message);
  }
  catch(e){ 
    response.send(e.message);
  }
};

const resendOTP = async (request, response) => {
  try{
    const details=await userService.handleResendOtp();
    if(details instanceof HTTPError)
    throw details;
    response.status(200).json(details);
  }
  catch(e){
    response.send(e.message);
  }
}

const handleCheckAndGenerateMobileOTP = async (request, response) => {
  try{
    const userMobileNum = request.body.mobile;
    const details=await userService.handleCheckAndGenerateMobileOTP(userMobileNum);
    if(details instanceof HTTPError)
    throw details;
    response.status(200).json(details);
  }
  catch(e){
    response.send(e.message);
  }
};

const verifyMobileOTP = async (request, response) => {
  try{
    const userOtp = request.body.otp;
    const details=await userService.verifyMobileOtp(userOtp);
    if(details instanceof HTTPError)
    throw details;
    response.status(200).json(details);
  }
  catch(e){
    response.send(e.message);
  }
};

const createHeathIDPreVerifiedNumber = async (request, response) => {
  try{
    const userDetails = request.body;
    const details=await userService.createHeathIDPreVerifiedNumber(userDetails);
    if(details instanceof HTTPError)
    throw details;
    response.status(200).json(details);
  }
  catch(e){
    response.send(e.message);
  }
};

module.exports = {};
module.exports.handleNewUserOnboardingRequest = handleNewUserOnboardingRequest;
module.exports.handleUserVerificationRequest = handleUserVerificationRequest;
module.exports.handleCheckAndGenerateMobileOTP =
  handleCheckAndGenerateMobileOTP;
module.exports.verifyMobileOTP = verifyMobileOTP;
module.exports.createHeathIDPreVerifiedNumber = createHeathIDPreVerifiedNumber;
module.exports.resendOTP = resendOTP;