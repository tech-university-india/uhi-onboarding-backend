const user = require("../controllers/onboarding/createUser");
const router = require("express").Router();
const Validation=require("../middlewares/UserOnboarding/validation");

router.post("/users",Validation.Validator,user.handleNewUserOnboardingRequest);

router.post("/users/resendAadhaarOtp",Validation.Validator, user.resendOTP);

router.post("/users/verifyOTP", Validation.Validator,user.handleUserVerificationRequest);

router.post("/users/checkAndGenerateMobileOTP",Validation.Validator,user.handleCheckAndGenerateMobileOTP );

router.post('/users/verifyMobileOTP', Validation.Validator,user.verifyMobileOTP);

router.post('/users/createHeathIDPreVerifiedNumber', Validation.Validator,user.createHeathIDPreVerifiedNumber);

module.exports = router;
