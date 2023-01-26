const { Sequelize } = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'postgres' 
});
async function Connection(){
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
}
Connection();