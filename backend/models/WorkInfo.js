const mongoose = require("mongoose");

let workSchema = new mongoose.Schema({
  workTitle: String,
  workLink1: String,
  workLink2: String,
  workLink3: String,
  workLink4: String,
  workDescription: String,
  workUi: String,
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  created: { type: Date, default: Date.now }
});

let WorkInfo = mongoose.model("WorkInfo", workSchema);
module.exports = WorkInfo;