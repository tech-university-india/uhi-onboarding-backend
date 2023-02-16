const crypto = require('crypto')

const getEncrypted = async (data, publicKey) => {
  return crypto.publicEncrypt({
    key: publicKey,
    padding: crypto.constants
      .RSA_PKCS1_PADDING
  }, Buffer.from(data, 'utf-8')).toString('base64')
}

module.exports = { getEncrypted }
