const router = require("express").Router();
const fs = require("fs");
const PersonalInfo = require("../models/PersonalInfo");
const User = require("../models/User");
const { upload, storageDir } = require("../storageEngine/cvStorageEngine");
const isAuthenticated = require("../policies/isAuthenticated");

// get personal info of the user
router.get("/personalInfo/:username", async (req, res) => {
	try {
		const user = await User.findOne({ username: req.params.username });
		if (!user) {
			return res
				.status(404)
				.send({ error: "no user with the username " + req.params.username });
		}
		const personalInfo = await PersonalInfo.findOne({ ownerId: user._id });
		res.send(personalInfo);
	} catch (error) {
		res.status(400).send(error);
	}
});

// create personal info of the user
router.post("/personalInfo", isAuthenticated, async (req, res) => {
	req.body.ownerId = req.user._id;
	try {
		const personalInfo = await PersonalInfo.create(req.body);
		res.send(personalInfo);
	} catch (error) {
		res.status(400).send(error);
	}
});

// update personal info of the user
router.put("/personalInfo/:id", isAuthenticated, async (req, res) => {
	try {
		const personalInfo = await PersonalInfo.findByIdAndUpdate(
			req.params.id,
			req.body
		);
		res.send(personalInfo);
	} catch (error) {
		res.status(400).send(error);
	}
});

// update cv of the user
router.put("/personalInfo/:id/cv", isAuthenticated, (req, res) => {
	upload(req, res, (err) => {
		if (err) {
			return res.status(400).send(err);
		}
		if (!req.file) {
			return res
				.status(400)
				.send({ error: "make sure the file field is filled" });
		}
		PersonalInfo.findOne({ ownerId: req.user._id, _id: req.params.id })
			.then((personalInfo) => {
				if (personalInfo.cv) {
					fs.unlink(storageDir + personalInfo.cv);
				}
				personalInfo.cv = req.file.filename;
				personalInfo
					.save()
					.then((updatedPersonalInfo) => {
						res.send(updatedPersonalInfo);
					})
					.catch((err) => {
						res.status(400).send(err);
					});
			})
			.catch((err) => {
				res.status(400).send(err);
			});
	});
});

module.exports = router;
