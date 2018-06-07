var scrape = require("../scripts/scrape");

var newsarticleController = require("../controller/newsarticles");
var commentsController = require("../controller/comments");

module.exports = function (router) {
  router.get("/", function (req, res) {
    res.render("home");
  });

  router.get("/saved", function (req, res) {
    res.render("saved");
  });

  router.get("/api/fetch", function (req, res) {
    newsarticlesController.fetch(function (err, docs) {
      if (!docs || docs.insertedCount === 0) {
        res.json({
          message: "No new articles today."
        });
      }
      else {
        res.json({
          message: "Added" + docs.insertedCount + " new articles."
        });
      }
    });
  });
  router.get("/api/newsarticles", function (req, res) {
    var query = {};
    if (req.query.saved) {
      query = req.query;
    }
    newsarticleController.get(query, function (data) {
      res.json(data);
    });
  });
  router.delete("/api/newsarticles/:id", function (req, res) {
    var query = {};
    query._id = req.params.id;
    newsarticlesController.delete(query, function (err, data) {
      res.json(data);
    });
  });
  router.patch("/api/newsarticles", function (req, res) {
    newsarticlesController.update(req.boy, function (err, data) {
      res.json(data);
    });
  });
  router.get("/api/comments/:newsarticles_id?", function (req, res) {
    var query = {};
    if (req.params.newsarticles_id) {
      query._id = req.params.newsarticles_id;
    }
    commentsController.get(query, function (err, data) {
      res.json(data);
    });
  });
  router.delete("/api/comments/:id", function (req, res) {
    var query = {};
    query._id = req.params.id;
    commentsController.delete(query, function (err, data) {
      res.json(data);
    });
  });
  router.post("/api/comments", function(req, res){
    commentsController.save(req.body, function(data){
      res.json(data);
    });
  });
}