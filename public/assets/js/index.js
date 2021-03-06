console.log("sanity index");
$(document).ready(function () {
  var articleContainer = $(".newsarticle-container");

  $(document).on("click", ".btn.save", handleArticleSave);
  $(document).on("click", ".scrape-new", handleArticleScrape);

  initPage();

  function initPage() {
    articleContainer.empty();
    $.get("/api/newsarticles?saved=false").then(function (data) {
      console.log(data);
      if (data && data.length) {
        renderArticles(data);
      } else {
        renderEmpty();
      }
    });
  }
  function renderArticles(articles) {
    var articlePanels = [];

    for (var i = 0; i < newsarticles.length; i++) {
      articleContainer.append(createPanel(newsarticles[i]));
      //articlePanels.push(createPanel(articles[i]));
    }
    //articleContainer.append(articlePanels);
  }
  function createPanel(newsarticle) {
    var panel =
      $(["<div class = 'panel panel-default'>",
        "<div class = 'panel-heading'>",
        "<h3>",
        newsarticle.headline, "<a class ='btn btn-success save'>",
        "Save Article", "</a>",
        "</h3>",
        "</div>",
        "<div class = 'panel-body'>", newsarticle.summary,
        "</div>",
        "</div>"].join(""));
    panel.data("_id", newsarticle._id);
    return panel;
  }

  function renderEmpty() {
    var emptyAlert =
      $(["<div class = 'alert alert-warning text-center'>",
        "<h4> We do not have any new articles.</h4>",
        "</div>", "<div class = 'panel panel-default'>",
        "<div class = 'panel panel-default'>",
        "<div class = 'panel-heading text-center'>",
        "<h3> What would you like to do?</h3>",
        "</div>",
        "<div class = 'panel-body text-center'>",
        "<h4><a class = 'scrape-new'> Try Scraping New Articles</a></h4>",
        "<h4><a href ='/saved'>Go to Saved Articles</a></h4>",
        "</div>",
        "</div>"].join(""));
    articleContainer.append(emptyAlert);
  }
  function handleArticleSave() {
    var articleToSave = $(this).parents(".panel").data();
    articleToSave.saved = true;

    $.ajax({
      method: "PATCH",
      url: "/api/newsarticles",
      data: articleToSave
    })
      .then(function (data) {
        if (data.ok) {
          initPage();
        }
      });
  }
  function handleArticleScrape() {
    console.log("Button Click is working")
    $.get("/api/fetch").then(function (data) {
      console.log(data);
      initPage();
      bootbox.alert("<h3 class = 'test-center m-top-80'>" + data.message + "<h3>");
    });
  }
});