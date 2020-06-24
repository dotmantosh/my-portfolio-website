const mongoose = require("mongoose");

let personalInfoSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  tel1: String,
  tel2: String,
  h_Education: String,
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});
let PersonalInfo = mongoose.model("PersonalInfo", personalInfoSchema);
module.exports = PersonalInfo;