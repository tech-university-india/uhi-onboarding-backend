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

module.exports = Patient;
