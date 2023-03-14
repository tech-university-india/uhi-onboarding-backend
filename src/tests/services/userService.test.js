const userServices = require('../../services/onboarding/users/userService')
const abdm = require('../../util/abdm')
const pbkKey = require('../../util/publicKeyFetcher')
const encrypt = require('../../util/encryptionUtil')
const axios = require('axios')

jest.mock('../../util/redisClient', () => {
  return {
    redisClient: {
      set: jest.fn(),
      get: jest.fn(),
      del: jest.fn()
    },
    setKeyValuePairRedis: jest.fn(),
    getValueFromKeyRedis: jest.fn(),
    deleteKeyRedis: jest.fn()
  }
})

describe('User Services', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  describe('handleNewUserOnboardingRequest', () => {
    it('should return a transaction id', async () => {
      const spyGetJWTToken = jest.spyOn(abdm, 'getJWTToken')
      spyGetJWTToken.mockResolvedValue({ token: 'token' })
      const spyGetPublicKey = jest.spyOn(pbkKey, 'getPublicKey')
      spyGetPublicKey.mockResolvedValue('publicKey')
      const spyGetEncrypted = jest.spyOn(encrypt, 'getEncrypted')
      spyGetEncrypted.mockResolvedValue('encryptedAadhar')
      const spyAxios = jest.spyOn(axios, 'post')
      spyAxios.mockResolvedValue({ data: { txnId: 'txnId' } })
      const response = await userServices.handleNewUserOnboardingRequest('aadhar')
      expect(response).toEqual('txnId')
    })
    it('should return an error if token is not found', async () => {
      const spyGetJWTToken = jest.spyOn(abdm, 'getJWTToken')
      spyGetJWTToken.mockResolvedValue({ token: undefined })
      const response = await userServices.handleNewUserOnboardingRequest('aadhar')
      expect(response.message).toEqual('Token not found')
    })
    it('should return an error if encryptedAadhar is not found', async () => {
      const spyGetJWTToken = jest.spyOn(abdm, 'getJWTToken')
      spyGetJWTToken.mockResolvedValue({ token: 'token' })
      const spyGetPublicKey = jest.spyOn(pbkKey, 'getPublicKey')
      spyGetPublicKey.mockResolvedValue('publicKey')
      const spyGetEncrypted = jest.spyOn(encrypt, 'getEncrypted')
      spyGetEncrypted.mockResolvedValue(undefined)
      const response = await userServices.handleNewUserOnboardingRequest('aadhar')
      expect(response.message).toEqual('Something went wrong')
    })
  })
  describe('handleUserVerificationRequest', () => {
    it('should return a transaction id', async () => {
      const spyGetJWTToken = jest.spyOn(abdm, 'getJWTToken')
      spyGetJWTToken.mockResolvedValue({ token: 'token' })
      const spyGetPublicKey = jest.spyOn(pbkKey, 'getPublicKey')
      spyGetPublicKey.mockResolvedValue('publicKey')
      const spyGetEncrypted = jest.spyOn(encrypt, 'getEncrypted')
      spyGetEncrypted.mockResolvedValue('encryptedOTP')
      const spyAxios = jest.spyOn(axios, 'post')
      spyAxios.mockResolvedValue({ data: { txnId: 'txnId' } })
      const response = await userServices.handleUserVerificationRequest('otp', 'txnId')
      expect(response).toEqual('txnId')
    })
    it('should return an error if token is not found', async () => {
      const spyGetJWTToken = jest.spyOn(abdm, 'getJWTToken')
      spyGetJWTToken.mockResolvedValue({ token: undefined })
      const response = await userServices.handleUserVerificationRequest('otp', 'txnId')
      expect(response.message).toEqual('Token not found')
    })
    it('should return an error if encryptedOTP is not found', async () => {
      const spyGetJWTToken = jest.spyOn(abdm, 'getJWTToken')
      spyGetJWTToken.mockResolvedValue({ token: 'token' })
      const spyGetPublicKey = jest.spyOn(pbkKey, 'getPublicKey')
      spyGetPublicKey.mockResolvedValue('publicKey')
      const spyGetEncrypted = jest.spyOn(encrypt, 'getEncrypted')
      spyGetEncrypted.mockResolvedValue(undefined)
      const response = await userServices.handleUserVerificationRequest('otp', 'txnId')
      expect(response.message).toEqual('Something went wrong')
    })
  })
  describe('handleResendOtp', () => {
    it('should return mobile number and transaction id', async () => {
      const spyGetJWTToken = jest.spyOn(abdm, 'getJWTToken')
      spyGetJWTToken.mockResolvedValue({ token: 'token' })
      const spyAxios = jest.spyOn(axios, 'post')
      spyAxios.mockResolvedValue({ data: { txnId: 'txnId', mobile: '123456' } })
      const response = await userServices.handleResendOtp('txnId')
      expect(response).toEqual({ txnId: 'txnId', mobile: '123456' })
    })
    it('should return an error if token is not found', async () => {
      const spyGetJWTToken = jest.spyOn(abdm, 'getJWTToken')
      spyGetJWTToken.mockResolvedValue({ token: undefined })
      const response = await userServices.handleResendOtp('txnId')
      expect(response.message).toEqual('Token not found')
    })
  })
  describe('handleCheckAndGenerateMobileOTP', () => {
    it('should return mobile number and transaction id', async () => {
      const spyGetJWTToken = jest.spyOn(abdm, 'getJWTToken')
      spyGetJWTToken.mockResolvedValue({ token: 'token' })
      const spyAxios = jest.spyOn(axios, 'post')
      spyAxios.mockResolvedValue({ data: { txnId: 'txnId', mobileLinked: '123456' } })
      const response = await userServices.handleCheckAndGenerateMobileOTP('mobile', 'txnId')
      expect(response).toEqual({ txnId: 'txnId', isLinked: '123456' })
    })
    it('should return an error if token is not found', async () => {
      const spyGetJWTToken = jest.spyOn(abdm, 'getJWTToken')
      spyGetJWTToken.mockResolvedValue({ token: undefined })
      const response = await userServices.handleCheckAndGenerateMobileOTP('mobile', 'txnId')
      expect(response.message).toEqual('Token not found')
    })
  })
  describe('verifyMobileOtp', () => {
    it('should return a transaction id', async () => {
      const spyGetJWTToken = jest.spyOn(abdm, 'getJWTToken')
      spyGetJWTToken.mockResolvedValue({ token: 'token' })
      const spyAxios = jest.spyOn(axios, 'post')
      spyAxios.mockResolvedValue({ data: { txnId: 'txnId' } })
      const response = await userServices.verifyMobileOtp('otp', 'txnId')
      expect(response).toEqual('txnId')
    })
    it('should return an error if token is not found', async () => {
      const spyGetJWTToken = jest.spyOn(abdm, 'getJWTToken')
      spyGetJWTToken.mockResolvedValue({ token: undefined })
      const response = await userServices.verifyMobileOtp('otp', 'txnId')
      expect(response.message).toEqual('Token not found')
    })
  })
  describe('createHeathIDPreVerifiedNumber', () => {
    it('should return a health id number', async () => {
      const spyGetJWTToken = jest.spyOn(abdm, 'getJWTToken')
      spyGetJWTToken.mockResolvedValue({ token: 'token' })
      const spyParse = jest.spyOn(JSON, 'parse')
      spyParse.mockResolvedValue({
        aadhaar: '123456789',
        house: 'house',
        locality: 'locality',
        street: 'street',
        landmark: 'landmark',
        villageTownCity: 'villageTownCity',
        subDistrict: 'subDistrict',
        district: 'district',
        state: 'state',
        pinCode: 'pinCode'
      })
      const spyAxios = jest.spyOn(axios, 'post')
      spyAxios.mockResolvedValue({
        data: {
          name: 'name',
          mobile: '1234567890',
          healthIdNumber: '4354353456',
          firstName: 'firstName',
          lastName: 'lastName',
          middleName: 'middleName',
          profilePhoto: 'profilePhoto',
          email: 'example@example.com',
          yearOfBirth: '2000',
          monthOfBirth: '01',
          dayOfBirth: '01',
          gender: 'gender'
        }
      })
      const response = await userServices.createHeathIDPreVerifiedNumber('example@example.com', 'password', '1234', 'txnId')
      expect(response).toEqual('4354353456')
    })
    it('should return a health id number if landmark, sub district are not defined', async () => {
      const spyGetJWTToken = jest.spyOn(abdm, 'getJWTToken')
      spyGetJWTToken.mockResolvedValue({ token: 'token' })
      const spyParse = jest.spyOn(JSON, 'parse')
      spyParse.mockImplementation(() => {
        return {
          aadhaar: '123456789',
          house: 'house',
          locality: 'locality',
          street: 'street',
          landmark: null,
          villageTownCity: 'villageTownCity',
          subDistrict: null,
          district: 'district',
          state: 'state',
          pinCode: 'pinCode'
        }
      })
      const spyAxios = jest.spyOn(axios, 'post')
      spyAxios.mockResolvedValue({
        data: {
          name: 'name',
          mobile: '1234567890',
          healthIdNumber: '4354353456',
          firstName: 'firstName',
          lastName: 'lastName',
          middleName: 'middleName',
          profilePhoto: 'profilePhoto',
          email: 'example@example.com',
          yearOfBirth: '2000',
          monthOfBirth: '01',
          dayOfBirth: '01',
          gender: 'gender'
        }
      })
      const response = await userServices.createHeathIDPreVerifiedNumber('example@example.com', 'password', '1234', 'txnId')
      expect(response).toEqual('4354353456')
    })
    it('should return an error if token is not found', async () => {
      const spyGetJWTToken = jest.spyOn(abdm, 'getJWTToken')
      spyGetJWTToken.mockResolvedValue({ token: undefined })
      const response = await userServices.createHeathIDPreVerifiedNumber('example@example.com', 'password', '1234', 'txnId')
      expect(response.message).toEqual('Token not found')
    })
  })
})
