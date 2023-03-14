const publicKeyUtil = require('../../util/publicKeyFetcher')

describe('publicKeyUtil', () => {
  it('should return a public key', () => {
    const publicKey = publicKeyUtil.getPublicKey()
    expect(publicKey).not.toBeNull()
  })
})
