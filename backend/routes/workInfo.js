const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const isAutenticated = require("../policies/isAuthenticated");
const WorkInfo = require("../models/WorkInfo");
const User = require("../models/User");

const { upload, storageDir } = require("../storageEngine/workStorageEngine");

// index route, get all works
router.get("/works", isAutenticated, async (req, res) => {
	try {
		const works = await WorkInfo.find({ ownerId: user._id }).sort({ date: -1 });
		res.send(works);
	} catch (err) {
		res.status(400).send(err);
	}
});
router.get("/works/:username", async (req, res) => {
	try {
		const user = await User.findOne({ username: req.params.username });
		if (!user) {
			return res
				.status(404)
				.send({ error: "no user with the username " + req.params.username });
		}
		const works = await WorkInfo.find({ ownerId: user._id });
		res.send(works);
	} catch (err) {
		res.status(400).send(err);
	}
});

// show route, get a particular work
router.get("/works:id/show", isAutenticated, async (req, res) => {
	try {
		const work = WorkInfo.findById(req.params.id);
		res.send(work);
	} catch (err) {
		res.status(400).send(err);
	}
});

// create a work
router.post("/works", isAutenticated, (req, res) => {
	upload(req, res, (err) => {
		if (err) {
			return res.status(400).send(err);
		}
		if (req.file) {
			req.body.workUi = req.file.filename;
		}
		req.body.ownerId = req.user._id;
		WorkInfo.create(req.body)
			.then((work) => {
				res.send(work);
			})
			.catch((err) => {
				res.status(400).send(err);
			});
	});

	/*   try {
    const work = await WorkInfo.create(req.body)
    res.send(work)
  } catch (err) {
    res.status(400).send(err)
  } */
});

// update a work
router.put("/works/:id", isAutenticated, async (req, res) => {
	try {
		const work = await WorkInfo.findOneAndUpdate(
			{ _id: req.params.id, ownerId: req.user._id },
			req.body
		);
		res.send(work);
	} catch (err) {
		res.status(400).send(err);
	}
});

//update work UI
router.put("/works/:id/ui", isAutenticated, (req, res) => {
	upload(req, res, (err) => {
		if (err) {
			return res.status(400).send(err);
		}
		WorkInfo.findById(req.params.id)
			.then((work) => {
				if (req.file) {
					const filePath = path.join(storageDir, work.workUi);
					fs.unlinkSync(filePath);
					work.workUi = req.file.filename;
				}
				work
					.save()
					.then((savedWork) => {
						return res.send(savedWork);
					})
					.catch((err) => {
						return res.status(400).send(err);
					});
			})
			.catch((err) => {
				res.status(400).send(err);
			});
	});
	/* try {
    const work = await WorkInfo.findById(req.params.id)

    if (req.file) {
      
    }
    
  } catch (err) {
    res.status(400).send(err)
  } */
});

//delete a work
router.delete("/works/:id", isAutenticated, async (req, res) => {
	try {
		const work = await WorkInfo.findOne({ _id: req.params.id });
		if (work.workUi) {
			const filePath = path.join(storageDir, work.workUi);
			fs.unlinkSync(filePath);
		}
		const delWork = await WorkInfo.findOneAndDelete({ _id: req.params.id });
		res.send(delWork);
	} catch (err) {
		res.status(400).send(err);
	}
});

module.exports = router;
