const mongoose = require("mongoose");
let socialMediaSchema = new mongoose.Schema({
  facebook: String,
  instagram: String,
  linkedin: String,
  twitter: String,
  youtube: String,
  github: String,
  tumblr: String,
  reddit: String,
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});
let SocialMedia = mongoose.model("SocialMedia", socialMediaSchema);
module.exports = SocialMedia;