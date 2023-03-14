const redis = require('redis')

const config = {
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  }
}

const redisClient = redis.createClient(config)
redisClient
  .on('error', (error) => {
    console.log('Redis error: ', error)
  })
  .connect().then(() => {
    console.log('Redis connected')
  })

async function setKeyValuePairRedis (key, value) {
  return redisClient.set(key, value)
}

async function getValueFromKeyRedis (key) {
  return redisClient.get(key)
}
async function deleteKeyRedis (key) {
  redisClient.del(key)
}

module.exports = {
  redisClient,
  setKeyValuePairRedis,
  getValueFromKeyRedis,
  deleteKeyRedis
}
