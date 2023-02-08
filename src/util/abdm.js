// This parses the the token fetched from the sandbox
// and saves it to a local file
// If the token expires then a new token will be fetched and parsed.

const jose = require('jose')
const fs = require('fs')
const FILE_NAME = 'fetchedToken.txt'
const tokenFileExists = () =>
  fs.existsSync(FILE_NAME)

const parseJWT = (jwt) => jose.decodeJwt(jwt)

const fetchJWTFromServer = async () => {
  //console.log(process.env.SANDBOXURL)
  const response = await fetch('https://gjgew5guy33vice6fauegfokme0dyaxy.lambda-url.us-east-1.on.aws/?code=krkedikhayenge')
  const token = await response.text()
  return token
}

const writeTokenFileWithNewToken = (token) => new Promise((resolve, reject) => {
  fs.writeFile(FILE_NAME, token, { flag: 'w' }, (error) => {
    if (error) { reject(error) }
    resolve(true)
  })
})

const readTokenFile = () => {
  if (tokenFileExists()) {
    return new Promise((resolve, reject) => {
      fs.readFile(FILE_NAME, 'utf-8', (error, data) => {
        error ? reject(error) : resolve(data)
      })
    })
  }
  return '' // File do not exist
}

const getJWTToken = async () => {
 const token = await readTokenFile()
  if (token.length === 0 || (token.length > 0 && parseJWT(token).exp * 1000 < Date.now())) {
    const newToken = await fetchJWTFromServer()
   await writeTokenFileWithNewToken(newToken)
    return { token: newToken, decoded: parseJWT(newToken) }
 }
 return { token, decoded: parseJWT(token) }
}

module.exports = { getJWTToken }
