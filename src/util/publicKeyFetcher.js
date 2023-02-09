const axios = require('axios');

const getPublicKey = async() => {
    const CERT_URL = 'https://healthidsbx.abdm.gov.in/api/v1/auth/cert'
    const publicKey = await axios.get(CERT_URL);
    return publicKey.data;
}

module.exports = { 
    getPublicKey }