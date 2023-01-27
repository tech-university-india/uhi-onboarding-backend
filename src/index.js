require('dotenv').config()

const express = require('express')
const sequelize = require('./services/database/dbConnection')
const app = express()
const onboardingRoutes = require('./routes/onboarding')
const abdm = require('./util/abdm')

abdm.getJWTToken()

sequelize.authenticate()
  .then(() => console.log('Connection to Database was successful'))
  .catch(console.log)

app.use(express.text())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', (request, response) => {
  response.send('Welcome to the backend API')
})

app.use('/onboarding', onboardingRoutes)

app.listen(9007)
