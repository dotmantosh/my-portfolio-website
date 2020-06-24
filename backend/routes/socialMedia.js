const router = require('express').Router()

const SocialMedia = require('../models/SocialMedia')
const User = require('../models/User')
const isAuthenticated = require('../policies/isAuthenticated')


router.get('/socialmedia/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
    if (!user) {
      return res.status(404).send({ error: "no user with the username " + req.params.username })
    }
    const socialMedia = await SocialMedia.findOne({ ownerId: user._id })
    if (!socialMedia) {
      return res.status(404).send({ error: 'couldn"t find social media' })
    }
    res.send(socialMedia)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.post('/socialmedia', isAuthenticated, async (req, res) => {
  req.body.ownerId = req.user._id
  try {
    const socialMedia = await SocialMedia.create(req.body)
    res.send(socialMedia)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.put('/socialmedia/:id', isAuthenticated, async (req, res) => {
  try {
    const socialMedia = await SocialMedia.findOneAndUpdate({ _id: req.params.id, ownerId: req.user._id }, req.body)
    res.send(socialMedia)
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router