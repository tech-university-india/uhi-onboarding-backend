// This parses the the token fetched from the sandbox
// and saves it to a local file
// If the token expires then a new token will be parsed.

const jose = require('jose')

/**
 *
 * @param {String} token
 */

const parseJWT = async () => {
  const response = await fetch(process.env.SANDBOXURL)
  const token = await response.text()
  jose.decodeJwt(token)
}

module.exports = { parseJWT }
