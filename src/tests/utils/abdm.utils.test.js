const abdmUtils = require('../../util/abdm')
const fs = require('fs')
const jose = require('jose')

describe('abdm utils', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should return a token when token length is not zero and it has not expired', async () => {
    const spyExistsSync = jest.spyOn(fs, 'existsSync')
    spyExistsSync.mockReturnValue(true)
    const spyReadFile = jest.spyOn(fs, 'readFile')
    spyReadFile.mockImplementation((path, encoding, callback) => {
      callback(null, 'token')
    })
    const spyDecodeJwt = jest.spyOn(jose, 'decodeJwt')
    spyDecodeJwt.mockReturnValue({ exp: 100000000 })
    const spyDateNow = jest.spyOn(Date, 'now')
    spyDateNow.mockReturnValue(10000)
    const token = await abdmUtils.getJWTToken()
    expect(token).toEqual({ token: 'token', decoded: { exp: 100000000 } })
    expect(spyExistsSync).toHaveBeenCalled()
    expect(spyReadFile).toHaveBeenCalled()
    expect(spyDecodeJwt).toHaveBeenCalled()
    expect(spyDateNow).toHaveBeenCalled()
  })
  it('should return a new token when token length is not zero but it has expired', async () => {
    const spyExistsSync = jest.spyOn(fs, 'existsSync')
    spyExistsSync.mockReturnValue(true)
    const spyReadFile = jest.spyOn(fs, 'readFile')
    spyReadFile.mockImplementation((path, encoding, callback) => {
      callback(null, 'token')
    })
    const spyDateNow = jest.spyOn(Date, 'now')
    spyDateNow.mockReturnValue(10000)
    const spyFetch = jest.spyOn(global, 'fetch')
    spyFetch.mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve({ text: () => 'new token' })
      })
    })
    const spyWriteFile = jest.spyOn(fs, 'writeFile')
    spyWriteFile.mockImplementation((path, data, options, callback) => {
      callback(null)
    })
    const spyDecodeJwt = jest.spyOn(jose, 'decodeJwt')
    spyDecodeJwt
      .mockReturnValueOnce({ exp: 0 })
      .mockReturnValueOnce({ exp: 100000000 })
    const token = await abdmUtils.getJWTToken()
    expect(token).toEqual({ token: 'new token', decoded: { exp: 100000000 } })
    expect(spyExistsSync).toHaveBeenCalled()
    expect(spyReadFile).toHaveBeenCalled()
    expect(spyDateNow).toHaveBeenCalled()
    expect(spyFetch).toHaveBeenCalled()
    expect(spyWriteFile).toHaveBeenCalled()
    expect(spyDecodeJwt).toHaveBeenCalledTimes(2)
  })
  it('should return a new token when token length is zero', async () => {
    const spyExistsSync = jest.spyOn(fs, 'existsSync')
    spyExistsSync.mockReturnValue(false)
    const spyFetch = jest.spyOn(global, 'fetch')
    spyFetch.mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve({ text: () => 'new token' })
      })
    })
    const spyWriteFile = jest.spyOn(fs, 'writeFile')
    spyWriteFile.mockImplementation((path, data, options, callback) => {
      callback(null)
    })
    const spyDecodeJwt = jest.spyOn(jose, 'decodeJwt')
    spyDecodeJwt.mockReturnValue({ exp: 100000000 })
    const token = await abdmUtils.getJWTToken()
    expect(token).toEqual({ token: 'new token', decoded: { exp: 100000000 } })
    expect(spyExistsSync).toHaveBeenCalled()
    expect(spyFetch).toHaveBeenCalled()
    expect(spyWriteFile).toHaveBeenCalled()
    expect(spyDecodeJwt).toHaveBeenCalled()
  })
  it('should return an error when token length is not zero and it has not expired but readFile fails', async () => {
    const spyExistsSync = jest.spyOn(fs, 'existsSync')
    spyExistsSync.mockReturnValue(true)
    const spyReadFile = jest.spyOn(fs, 'readFile')
    spyReadFile.mockImplementation((path, encoding, callback) => {
      callback(new Error('error'))
    })
    await expect(abdmUtils.getJWTToken()).rejects.toEqual(new Error('error'))
    expect(spyExistsSync).toHaveBeenCalled()
    expect(spyReadFile).toHaveBeenCalled()
  })
  it('should return an error when token length is not zero but it has expired and writeFile fails', async () => {
    const spyExistsSync = jest.spyOn(fs, 'existsSync')
    spyExistsSync.mockReturnValue(true)
    const spyReadFile = jest.spyOn(fs, 'readFile')
    spyReadFile.mockImplementation((path, encoding, callback) => {
      callback(null, 'token')
    })
    const spyDateNow = jest.spyOn(Date, 'now')
    spyDateNow.mockReturnValue(10000)
    const spyFetch = jest.spyOn(global, 'fetch')
    spyFetch.mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve({ text: () => 'new token' })
      })
    })
    const spyWriteFile = jest.spyOn(fs, 'writeFile')
    spyWriteFile.mockImplementation((path, data, options, callback) => {
      callback(new Error('error'))
    })
    const spyDecodeJwt = jest.spyOn(jose, 'decodeJwt')
    spyDecodeJwt.mockReturnValue({ exp: 0 })
    await expect(abdmUtils.getJWTToken()).rejects.toEqual(new Error('error'))
    expect(spyExistsSync).toHaveBeenCalled()
    expect(spyReadFile).toHaveBeenCalled()
    expect(spyDateNow).toHaveBeenCalled()
    expect(spyFetch).toHaveBeenCalled()
    expect(spyWriteFile).toHaveBeenCalled()
    expect(spyDecodeJwt).toHaveBeenCalled()
  })
})
