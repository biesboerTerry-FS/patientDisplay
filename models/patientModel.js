const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	doctor: {
		type: String,
		required: true,
	},
	created_at: {
		type: Date,
		required: true,
		default: Date.now,
	},
});

module.exports = mongoose.model("Patient", patientSchema);
