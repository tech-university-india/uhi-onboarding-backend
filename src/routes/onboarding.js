const user = require("../controllers/onboarding/createUser");
const router = require("express").Router();

const {handleNewDoctorOnboardingRequest,} = require("../controllers/onboarding/createDoctor");

router.route("/doctors").post(handleNewDoctorOnboardingRequest);

router.route("/users").post(user.handleNewUserOnboardingRequest);

router.post("/users/resendAadhaarOtp", user.resendOTP);

router.post("/users/verifyOTP", user.handleUserVerificationRequest);

router.post("/users/checkAndGenerateMobileOTP",user.handleCheckAndGenerateMobileOTP );

router.post('/users/verifyMobileOTP', user.verifyMobileOTP);

router.post('/users/createHeathIDPreVerifiedNumber', user.createHeathIDPreVerifiedNumber);

module.exports = router;
