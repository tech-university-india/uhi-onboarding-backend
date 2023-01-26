const { Model, DataTypes } = require('sequelize');
class Patient extends Model {}
Patient.init({
	id: {
		autoIncrement: true,
		type: DataTypes.INTEGER,
	},
	firstname: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	lastname: {
		type: DataTypes.STRING,
	},
	aadharNumber: {
		type: DataTypes.STRING,
	},
	mobileNumber: {
		type: DataTypes.STRING,
	},
});

Patient.sync({force: true}).then(console.log('Successfully Synchornized the Database with Patient table')).catch(console.log);

module.exports = Patient;
