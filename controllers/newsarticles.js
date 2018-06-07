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
        articles[i].saved = false;
      }
      newsarticles.collection.insertMany(newsarticles, { ordered: false }, function (err, docs) {
        cb(err, docs);
      });
    });
  },
  delete: function (query, cb) {
    Newsarticle.remove(query, cb);
  },
  get: function (query, cb) {
    Newsarticle.find(query).sort({
      _id: -1
    })
      .exec(function (err, doc) {
        cd(doc);
      });
  },
  update: function (query, cb) {
    Newsarticle.update({ _id: query._id }, {
      $set: query
    }, {}, cb);
  }
}