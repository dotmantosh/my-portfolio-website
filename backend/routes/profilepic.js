const router = require("express").Router();
const fs = require("fs");
const User = require("../models/User");
const {
	upload,
	storageDir,
} = require("../storageEngine/profilePicStorageEngine");
const isAuthenticated = require("../policies/isAuthenticated");

// upload profilePic
router.put("/user/profilepic", isAuthenticated, (req, res) => {
	upload(req, res, (err) => {
		if (err) {
			return res.status(400).send(err);
		}
		if (!req.file) {
			return res.status(400).send({ error: "file field must not be empty" });
		}
		User.findOne({ _id: req.user._id })
			.then((user) => {
				if (user.profilePic && user.profilePic.length) {
					fs.unlinkSync(storageDir + user.profilePic);
				}
				user.profilePic = req.file.filename;
				user
					.save()
					.then((user) => {
						res.send(user);
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

// remove profilePic
router.patch("/user/profilepic", isAuthenticated, async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.user._id });
		if (user.profilePic && user.profilePic.length) {
			fs.unlinkSync(storageDir + user.profilePic);
		}
		user.profilePic = "";
		const newUser = await user.save();
		res.send(newUser);
	} catch (error) {
		res.status(400).send(error);
	}
});

module.exports = router;
