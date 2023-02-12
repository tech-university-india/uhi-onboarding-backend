const userService = require("../../services/onboarding/users/userService");

const handleNewUserOnboardingRequest = async (request, response) => {
  let { aadhaar } = request.body;
  const {status,message}=await userService.handleNewUserOnboardingRequest(aadhaar);
  response.status(status).json(message);
};

const handleUserVerificationRequest = async (request, response) => {
  let userOtp = request.body.otp;
  const {status,message}=await userService.handleUserVerificationRequest(userOtp);
};

const resendOTP = async (request, response) => {
  const {status,message}=await userService.handleResendOtp();
}

const handleCheckAndGenerateMobileOTP = async (request, response) => {
  const userMobileNum = request.body.mobile;
  const {status,message}=await userService.handleCheckAndGenerateMobileOTP(userMobileNum);
};

const verifyMobileOTP = async (request, response) => {
  const userOtp = request.body.otp;
  const {status,message}=await userService.verifyMobileOtp(userOtp);
};

const createHeathIDPreVerifiedNumber = async (request, response) => {
  const userDetails = request.body;
  const {status,message}=await userService.createHeathIDPreVerifiedNumber(userDetails);
};

module.exports = {};
module.exports.handleNewUserOnboardingRequest = handleNewUserOnboardingRequest;
module.exports.handleUserVerificationRequest = handleUserVerificationRequest;
module.exports.handleCheckAndGenerateMobileOTP =
  handleCheckAndGenerateMobileOTP;
module.exports.verifyMobileOTP = verifyMobileOTP;
module.exports.createHeathIDPreVerifiedNumber = createHeathIDPreVerifiedNumber;
module.exports.resendOTP = resendOTP;