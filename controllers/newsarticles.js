var scrape = require("../scripts/scrape");
var makeDate = require("../scripts/date");

// Article and Comments mongoose models
var Newsarticle = require("../models/NewsArticle");

module.exports = {
  fetch: function (cb) {
    scrape(function (data) {
      var newsarticles = data;
      for (var i = 0; i < newsarticles.length; i++) {
        newsarticles[i].date = makeDate();
        newsarticles[i].saved = false;
      }
      console.log("articles fetched: " + newsarticles.length);
      Newsarticle.insertMany(newsarticles, function (err, docs) {
        console.log(docs);
        console.log(err);
        cb(err, docs);
      });
    });
  },
  delete: function (query, cb) {
    Newsarticle.remove(query, cb);
  },
  get: function (query, cb) {
    console.log(query);
    Newsarticle.find({},function (err, doc) {
        console.log(doc);
        cb(doc);
      });
  },
  update: function (query, cb) {
    Newsarticle.update({ _id: query._id }, {
      $set: query
    }, {}, cb);
  }
}