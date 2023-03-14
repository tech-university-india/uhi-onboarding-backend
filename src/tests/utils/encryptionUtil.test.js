const encryptionUtil = require('../../util/encryptionUtil')
const crypto = require('crypto')

describe('encryptionUtil', () => {
  it('should encrypt data', async () => {
    const data = 'test'
    const publicKey = '-----BEGIN PUBLIC KEY-----\npublicKey\n-----END PUBLIC KEY-----'
    const spy = jest.spyOn(crypto, 'publicEncrypt')
    spy.mockImplementation(() => 'test')
    const encrypted = await encryptionUtil.getEncrypted(data, publicKey)
    expect(encrypted).toEqual('test')
  })
})
