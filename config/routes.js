var scrape = require("../scripts/scrape");

var newsarticleController = require("../controllers/newsarticles");
var commentsController = require("../controllers/comments");

module.exports = function (router) {
  router.get("/", function (req, res) {
    res.render("home");
  });

  router.get("/saved", function (req, res) {
    res.render("saved");
  });

  router.get("/api/fetch", function (req, res) {
    newsarticleController.fetch(function (err, docs) {
      console.log("hhhhhhh");
      if (!docs || docs.length === 0) {
        res.json({
          message: "No new articles today."
        });
      }
      else {
        res.json({
          message: "Added " + docs.length + " new articles."
        });
      }
    });
  });
  router.get("/api/newsarticles", function (req, res) {
    var query = {};
    console.log(req.query);
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
    newsarticleController.delete(query, function (err, data) {
      res.json(data);
    });
  });
  router.patch("/api/newsarticles", function (req, res) {
    newsarticleController.update(req.boy, function (err, data) {
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