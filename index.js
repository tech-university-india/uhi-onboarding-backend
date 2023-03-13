require('dotenv').config()
const express = require('express')
const app = express()
const onboardingRoutes = require('./src/routes/onboarding')
require('./src/util/redisClient')

app.use(express.text())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/onboarding', onboardingRoutes)

app.use('/', (request, response) => {
  response.send('Welcome to the backend API')
})

app.listen(9007)
