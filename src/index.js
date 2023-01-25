const express = require('express');
const app = express();
const onboardingRoutes = require('./routes/onboarding/onboardingRoutes');
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', (request, response) => {
	response.send('Welcome to the backend API');
});

app.use('/onboarding', onboardingRoutes);




app.listen(5000);