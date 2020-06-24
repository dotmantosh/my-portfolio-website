const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const User = require('../models/User')
const userValidaitonSchema = require('../validations/validation')

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: ONE_WEEK })
}

router.get('/user/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
    if (!user) {
      return res.status(404).send({ error: "404 Page not found" })
    }
    const newUser = {
      _id: user._id,
      email: user.email,
      username: user.username,
      cv: user.cv ? user.cv : null,
      profilePic: user.profilePic ? user.profilePic : null
    }

    res.send(newUser)
  } catch (error) {
    res.status(500).send({ error: 'An error occured trying to fetch data' })
  }

})

router.post('/signup', async (req, res) => {
  // Validate the data
  const { error } = userValidaitonSchema.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  // check if the user already exist
  const emailExist = await User.findOne({ email: req.body.email })
  if (emailExist) {
    return res.status(400).send({ error: 'email already exist' })
  }
  const isUsernameExist = await User.findOne({ username: req.body.username })
  if (isUsernameExist) {
    return res.status(400).send({ error: 'username has been taken' })
  }

  //hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)


  //create a new user
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword
  })

  try {
    const savedUser = await user.save()
    const token = jwtSignUser({ _id: user._id })
    const authUser = {
      _id: savedUser._id,
      email: savedUser.email,
      username: savedUser.username
    }
    res.send({
      user: authUser,
      token: token
    });
  } catch (err) {
    res.status(500).send({ error: 'An error occured trying to log in' })
  }
})

router.post('/login', async (req, res) => {
  // Check if email exists
  const user = await User.findOne({ username: req.body.username })
  if (!user) {
    return res.status(403).send({ error: 'Username is wrong' })
  }

  // Check if password is correct
  const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
  if (!isPasswordValid) {
    return res.status(403).send('Invalid password')
  }

  //create and assign a token
  const token = jwtSignUser({ _id: user._id })
  const authUser = {
    _id: user._id,
    username: user.username,
    username: user.username,
    email: user.email,
    profilePic: user.profilePic,
    cv: user.cv
  }

  res.send({
    user: authUser,
    token: token
  });
})

// Forgot password Email check and send link to reset password
router.post('/forgot', async (req, res)=>{
  try{
    const user = await User.findOne({email: req.body.email})
  if (!user) {
    return res.status(404).send({error: 'No account with that email address'})
  }

  const token = crypto.randomBytes(20).toString('hex')
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000 // 1 hour
  await user.save()
  const smptTransport = nodemailer.createTransport({
    service: 'gmail',
    /* host: 'localhost',
    port: 587,
    secure: false, */
    auth: {
      user: 'dotmantosh@gmail.com',
      pass: 'isratosh'
    }/* ,
    tls: {
      rejectUnauthorized: false
    } */
  })
  const mailOptions = {
    to: user.email,
    from: 'dotmantosh@gmail.com',
    subject: 'MPW Reset password',
    html: `<p>You recieved this email from us because you (or someone) requested to reset your MPW account       password.</p>
    <p> Please click on the link below to complete the process.</p>
    <p>If you did not request this, please ignore this email and your password will remain unchanged</p>
    <a href="http://localhost:8080/resetpassword/${token}">http://localhost:8080/resetpassword/${token}</a>
    `
  }
  smptTransport.sendMail(mailOptions)
  res.json({success: true, message: `An email has been sent to ${user.email} with further instructions`})
  } catch(error){
    res.status(500).send({ error: 'An error occured on the server' })
  }
  
})

router.post('/resetpassword/:token', async(req, res)=>{
  try{
    const user = await User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now()}})
    if(!user){
      return res.status(401).send({error: 'Password reset token is invalid or has expired'})
    }

    if(req.body.password !== req.body.password2){
      return res.status(400).send({error: 'Password do not match'})
    } else  {
       //hash password
       const salt = await bcrypt.genSalt(10)
       const hashedPassword = await bcrypt.hash(req.body.password, salt)
       user.password = hashedPassword
       user.resetPasswordToken = undefined
       user.resetPasswordExpires = undefined
       user.save()
       const smptTransport = nodemailer.createTransport({
         service: 'Gmail',
         auth: {
           user: process.env.GMAILEMAIL,
           pass: process.env.GMAILPW
         }
       })
       const mailOptions = {
         to: user.email,
         from: '"MPW" <dotmantosh@gmail.com>',
         subject: 'MPW Reset password',
         text: `Hello ${user.username},
               This is a confirmation that the password for your account ${user.email} has just been changed`
       }
       smptTransport.sendMail(mailOptions)
       res.json({success: true, message: 'Password changed successfully'})
    }
  }catch(error){
    res.status(500).send({error: 'An error occured on the server'})
  }
})

module.exports = router;