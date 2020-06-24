const router = require("express").Router();
const fs = require("fs");
const path = require("path");

const User = require("../models/User");
const { upload, storageDir } = require("../storageEngine/cvStorageEngine");
const isAuthenticated = require("../policies/isAuthenticated");

router.get("/user/:username/cv", async (req, res) => {
	try {
		const user = await User.findOne({ username: req.params.username });
		if (!user) {
			return res
				.status(404)
				.send({ error: "No such user as " + req.params.username });
		}
		if (!user.cv) {
			return res
				.status(404)
				.send({ error: req.params.username + " has not uploaded a resume" });
		}
		const filePath = path.join(storageDir, user.cv);
		return res.download(filePath, user.cv);
	} catch (error) {
		res.status(404).send(error); // error: "sever error"
	}
});

//upload cv
router.put("/user/cv", isAuthenticated, upload, async (req, res) => {
	try {
		if (!req.file) {
			return res.sendStatus(400);
		}
		const user = await User.findOne({ _id: req.user._id });
		if (user.cv && user.cv.length) {
			const filePath = path.join(storageDir, user.cv);
			fs.unlinkSync(filePath);
		}
		user.cv = req.file.filename;
		const newUser = await user.save();
		res.send(newUser);
	} catch (error) {
		res.status(400).send(error);
	}
});

//delete cv
router.patch("/user/cv", isAuthenticated, async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.user._id });
		if (user.cv && user.cv.length) {
			const filePath = path.join(storageDir, user.cv);
			fs.unlinkSync(filePath);
			user.cv = "";
		}
		const newUser = await user.save();
		res.send(newUser);
	} catch (error) {
		res.status(400).send(error);
	}
});
module.exports = router;
