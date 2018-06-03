var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var newsarticleSchema = new Schema({
  newsarticles: {
    type: String,
    required: true,
    unique: true
  },
  summary: {
    type: String,
    required: true
  },
  date: String,
  saved: {
    type: Boolean,
    default: false
  }
});

var Newsarticle = mongoose.model("Newsarticle", newsarticleSchema);

module.exports = Newsarticle;