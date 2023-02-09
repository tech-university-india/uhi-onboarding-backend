const userService = require("../../services/onboarding/users/userService");

const handleNewUserOnboardingRequest = async (request, response) => {
  let { aadhaar } = request.body;
  await userService.handleNewUserOnboardingRequest(aadhaar);
};

const handleUserVerificationRequest = async (request, response) => {
  let userOtp = request.body.otp;
  // for v2
  await userService.handleUserVerificationRequest(userOtp);
};

const handleCheckAndGenerateMobileOTP = async (request, response) => {
  const userMobileNum = request.body.mobile;
  await userService.handleCheckAndGenerateMobileOTP(userMobileNum);
};

const resendOTP = async (request, response) => {

}

const verifyMobileOTP = async (request, response) => {
  const userOtp = request.body.otp;
  await userService.verifyMobileOtp(userOtp);
};

const createHeathIDPreVerifiedNumber = async (request, response) => {
  const userDetails = request.body;
  await userService.createHeathIDPreVerifiedNumber(userDetails);
};

module.exports = {};
module.exports.handleNewUserOnboardingRequest = handleNewUserOnboardingRequest;
module.exports.handleUserVerificationRequest = handleUserVerificationRequest;
module.exports.handleCheckAndGenerateMobileOTP =
  handleCheckAndGenerateMobileOTP;
module.exports.verifyMobileOTP = verifyMobileOTP;
module.exports.createHeathIDPreVerifiedNumber = createHeathIDPreVerifiedNumber;
module.exports.resendOTP = resendOTP;