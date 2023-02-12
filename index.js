const express = require('express')
const sequelize = require('./src/services/database/dbConnection')
const app = express()
const onboardingRoutes = require('./src/routes/onboarding')

app.use(express.text())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/onboarding', onboardingRoutes)

app.use('/', (request, response) => {
  response.send('Welcome to the backend API')
})

app.listen(9007)
