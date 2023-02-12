const axios = require('axios');
const urlEndpoint = require('../config/User/onboardingEndpoints')

const getPublicKey = async(token) => {
    const CERT_URL = urlEndpoint.getPublicKeyUrl;
    const publicKey = await axios.get(CERT_URL,{
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    console.log(publicKey.data);
    return publicKey.data;
}

module.exports = { 
    getPublicKey }