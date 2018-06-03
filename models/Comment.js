var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var commentSchema = new Schema({
  _newsarticleId: {
      type: Schema.Types.ObjectId,
      ref: "Newsarticle"
  },
  date: String,
  commentText: String
});

var Newsarticle = mongoose.model("Comment", commentSchema);

module.exports = Comment;