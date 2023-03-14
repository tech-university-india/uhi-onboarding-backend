const userControllers = require('../../controllers/onboarding/createUser')
const userService = require('../../services/onboarding/users/userService')
jest.mock('../../services/onboarding/users/userService', () => ({
  handleNewUserOnboardingRequest: jest.fn(() => {
    return '123456789012'
  }),
  handleUserVerificationRequest: jest.fn(() => {
    return '123456789012'
  }),
  handleResendOtp: jest.fn(() => {
    return { mobile: '1234567890', txnId: '123456789012' }
  }),
  handleCheckAndGenerateMobileOTP: jest.fn(() => {
    return { isLinked: true, txnId: '123456789012' }
  }),
  verifyMobileOtp: jest.fn(() => {
    return '123456789012'
  }),
  createHeathIDPreVerifiedNumber: jest.fn(() => {
    return '123456783443'
  })
}))
const HTTPError = require('../../util/error')

describe('User Controller', () => {
  describe('handleNewUserOnboardingRequest', () => {
    it('should return 200 status code', async () => {
      const req = {
        body: {
          aadhaar: '123456789012'
        }
      }
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }
      await userControllers.handleNewUserOnboardingRequest(req, res)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({ message: 'OTP sent successfully', txnId: '123456789012' })
    })
    it('should should return an error message', async () => {
      const req = {
        body: {
          aadhaar: '123456789012'
        }
      }
      const res = {
        send: jest.fn()
      }
      userService.handleNewUserOnboardingRequest.mockImplementationOnce(() => {
        throw new Error('Error')
      })
      await userControllers.handleNewUserOnboardingRequest(req, res)
      expect(res.send).toHaveBeenCalledWith('Error')
    })
    it('should return 400 status code', async () => {
      const req = {
        body: {
          aadhaar: '123456789012'
        }
      }
      const res = {
        send: jest.fn()
      }
      userService.handleNewUserOnboardingRequest.mockImplementationOnce(() => {
        return new HTTPError('Error', 400)
      })
      await userControllers.handleNewUserOnboardingRequest(req, res)
      expect(res.send).toHaveBeenCalledWith('Error')
    })
  })
  describe('handleUserVerificationRequest', () => {
    it('should return 200 status code', async () => {
      const req = {
        body: {
          otp: '123456',
          txnId: '123456789012'
        }
      }
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }
      await userControllers.handleUserVerificationRequest(req, res)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({ message: 'OTP verified successfully', txnId: '123456789012' })
    })
    it('should should return an error message', async () => {
      const req = {
        body: {
          otp: '123456',
          txnId: '123456789012'
        }
      }
      const res = {
        send: jest.fn()
      }
      userService.handleUserVerificationRequest.mockImplementationOnce(() => {
        throw new Error('Error')
      })
      await userControllers.handleUserVerificationRequest(req, res)
      expect(res.send).toHaveBeenCalledWith('Error')
    })
    it('should return 400 status code', async () => {
      const req = {
        body: {
          otp: '123456',
          txnId: '123456789012'
        }
      }
      const res = {
        send: jest.fn()
      }
      userService.handleUserVerificationRequest.mockImplementationOnce(() => {
        return new HTTPError('Sample Error', 400)
      })
      await userControllers.handleUserVerificationRequest(req, res)
      expect(res.send).toHaveBeenCalledWith('OTP could not be verified')
    })
  })
  describe('resendOTP', () => {
    it('should return 200 status code', async () => {
      const req = {
        body: {
          txnId: '123456789012'
        }
      }
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }
      await userControllers.resendOTP(req, res)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({ message: 'OTP sent successfully on 1234567890', txnId: '123456789012' })
    })
    it('should should return an error message', async () => {
      const req = {
        body: {
          txnId: '123456789012'
        }
      }
      const res = {
        send: jest.fn()
      }
      userService.handleResendOtp.mockImplementationOnce(() => {
        throw new Error('Error')
      })
      await userControllers.resendOTP(req, res)
      expect(res.send).toHaveBeenCalledWith('Error')
    })
    it('should return 400 status code', async () => {
      const req = {
        body: {
          txnId: '123456789012'
        }
      }
      const res = {
        send: jest.fn()
      }
      userService.handleResendOtp.mockImplementationOnce(() => {
        return new HTTPError('OTP could not be sent', 400)
      })
      await userControllers.resendOTP(req, res)
      expect(res.send).toHaveBeenCalledWith('OTP could not be sent')
    })
  })
  describe('handleCheckAndGenerateMobileOTP', () => {
    it('should return 200 status code when mobile is linked with aadhaar', async () => {
      const req = {
        body: {
          mobile: '1234567890'
        }
      }
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }
      await userControllers.handleCheckAndGenerateMobileOTP(req, res)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({ message: 'Mobile number already linked with aadhaar', txnId: '123456789012' })
    })
    it('should return 200 status code when mobile is not linked with aadhaar', async () => {
      const req = {
        body: {
          mobile: '1234567890'
        }
      }
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }
      userService.handleCheckAndGenerateMobileOTP.mockImplementationOnce(() => {
        return { isLinked: false, txnId: '123456789012' }
      })
      await userControllers.handleCheckAndGenerateMobileOTP(req, res)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({ message: 'OTP sent successfully to this mobile number', txnId: '123456789012' })
    })
    it('should should return an error message', async () => {
      const req = {
        body: {
          mobile: '1234567890'
        }
      }
      const res = {
        send: jest.fn()
      }
      userService.handleCheckAndGenerateMobileOTP.mockImplementationOnce(() => {
        throw new Error('Error')
      })
      await userControllers.handleCheckAndGenerateMobileOTP(req, res)
      expect(res.send).toHaveBeenCalledWith('Error')
    })
  })
  describe('verifyMobileOTP', () => {
    it('should return 200 status code', async () => {
      const req = {
        body: {
          otp: '123456',
          txnId: '123456789012'
        }
      }
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }
      await userControllers.verifyMobileOTP(req, res)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({ message: 'OTP verified successfully', txnId: '123456789012' })
    })
    it('should should return an error message', async () => {
      const req = {
        body: {
          otp: '123456',
          txnId: '123456789012'
        }
      }
      const res = {
        send: jest.fn()
      }
      userService.verifyMobileOtp.mockImplementationOnce(() => {
        throw new Error('Error')
      })
      await userControllers.verifyMobileOTP(req, res)
      expect(res.send).toHaveBeenCalledWith('Error')
    })
    it('should return 400 status code', async () => {
      const req = {
        body: {
          otp: '123456',
          txnId: '123456789012'
        }
      }
      const res = {
        send: jest.fn()
      }
      userService.verifyMobileOtp.mockImplementationOnce(() => {
        return new HTTPError('OTP could not be verified', 400)
      })
      await userControllers.verifyMobileOTP(req, res)
      expect(res.send).toHaveBeenCalledWith('OTP could not be verified')
    })
  })
  describe('createHeathIDPreVerifiedNumber', () => {
    it('should return 200 status code', async () => {
      const req = {
        body: {
          email: 'example@example.com',
          password: 'password',
          healthId: '123456783443',
          txnId: '123456789012'
        }
      }
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }
      await userControllers.createHeathIDPreVerifiedNumber(req, res)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith('ABHA Health ID created successfully. Your ABHA Health ID is 123456783443')
    })
    it('should should return an error message', async () => {
      const req = {
        body: {
          email: 'example@example.com',
          password: 'password',
          healthId: '123456783443',
          txnId: '123456789012'
        }
      }
      const res = {
        send: jest.fn()
      }
      userService.createHeathIDPreVerifiedNumber.mockImplementationOnce(() => {
        throw new Error('Error')
      })
      await userControllers.createHeathIDPreVerifiedNumber(req, res)
      expect(res.send).toHaveBeenCalledWith('Error')
    })
    it('should return 400 status code', async () => {
      const req = {
        body: {
          email: 'example@example.com',
          password: 'password',
          healthId: '123456783443',
          txnId: '123456789012'
        }
      }
      const res = {
        send: jest.fn()
      }
      userService.createHeathIDPreVerifiedNumber.mockImplementationOnce(() => {
        return new HTTPError('ABHA Health ID could not be created', 400)
      })
      await userControllers.createHeathIDPreVerifiedNumber(req, res)
      expect(res.send).toHaveBeenCalledWith('ABHA Health ID could not be created')
    })
  })
})
