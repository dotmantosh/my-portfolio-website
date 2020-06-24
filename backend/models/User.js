const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6
  },
  cv: String,
  profilePic: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
})

module.exports = mongoose.model('User', userSchema);