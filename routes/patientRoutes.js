const express = require("express");
const router = express.Router();

const Patient = require("../models/patientModel");

const getPatient = async (request, response, next) => {
	let patient;
	try {
		patient = await Patient.findById(request.params.id);
		if (patient === null) {
			return response.status(404).json({
				message: "Patient not found",
			});
		}
	} catch (error) {
		return response.status(500).json({
			message: error.message,
		});
	}
	response.patient = patient;

	next();
};

//? GET All
router.get("/", async (request, response) => {
	try {
		const patients = await Patient.find();
		response.json(patients);
	} catch (error) {
		response.status(500).json({
			message: error.message,
		});
	}
});

//? GET By Id
router.get("/:id", async (req, res) => {
	try {
		const patient = await Patient.findById(req.params.id);
		if (!patient) {
			return res.status(404).json({ message: "Patient not found" });
		}
		res.json(patient);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

router.post("/", async (request, response) => {
	const patient = new Patient({
		name: request.body.name,
		doctor: request.body.doctor,
	});

	try {
		const newPatient = await patient.save();
		response.status(201).json(newPatient);
		console.log("BODY:", request.body);
	} catch (error) {
		response.status(400).json({
			message: error.message,
		});
	}
});

//? PATCH By Id
router.patch("/:id", getPatient, async (request, response) => {
	if (request.body.name != null) {
		response.patient.name = request.body.name;
	}
	if (request.body.doctor != null) {
		response.patient.doctor = request.body.doctor;
	}
	try {
		const updatedPatient = await response.patient.save();
		response.json(updatedPatient);
	} catch (error) {
		response.status(400).json({
			message: error.message,
		});
	}
});

//? DELETE BY Id
router.delete("/:id", async (req, res) => {
	try {
		const patient = await Patient.findByIdAndDelete(req.params.id);
		if (!patient) {
			return res.status(404).json({ message: "Patient not found" });
		}
		res.json({ message: "Patient deleted" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

module.exports = router;
