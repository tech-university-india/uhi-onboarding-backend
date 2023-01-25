const { handleNewDoctorOnboardingRequest } = require('../../functions/onboarding/createDoctor');

const router = require('express').Router();


router.route('/doctor')
	.post(handleNewDoctorOnboardingRequest);

module.exports = router;