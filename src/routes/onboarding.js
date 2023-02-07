const { handleNewDoctorOnboardingRequest } = require('../controllers/onboarding/createDoctor')
const user = require('../controllers/onboarding/createUser')

const router = require('express').Router()

router.route('/doctors')
  .post(handleNewDoctorOnboardingRequest)

router.route('/users')
  .post(user.handleNewUserOnboardingRequest)

router.post('/users/verifyOTP', user.handleUserVerificationRequest)

//router.post('/')


module.exports = router
