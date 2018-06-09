var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var newsarticleSchema = new Schema({
  headline: {
    type: String,
    required: true,
    unique: true,
    sparse: true
  },
  summary: {
    type: String,
    required: true
  },
  date: String,
  saved: {
    type: Boolean,
    default: false
  },

  comment: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }
});

var Newsarticle = mongoose.model("Newsarticle", newsarticleSchema);

module.exports = Newsarticle;