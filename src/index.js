require('dotenv').config()

const express = require('express')
const sequelize = require('./database/dbConnection')
const app = express()
const onboardingRoutes = require('./routes/onboarding/doctor')

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

app.listen(5000)
