$(document).ready(function () {
  var articleContainer = $(".article-container");

  $(document).on("click", ".btn.delete", handleArticleDelete);
  $(document).on("click", ".btn.comments", handleArticleComments);
  $(document).on("click", ".btn.comment-delete", handleCommentDelete);

  initPage();

  function initPage() {
    atricleContainer.empty();
    $.get("/api/newsarticles?saved=true").then(function (data) {
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
      articlePanels.push(createPanel(newsarticles[i]));
    }
    articleContainer.append(articlePanels);
  }
  function createPanel(article) {
    var panel =
      $(["<div class = 'panel-default'>",
        "<div class = 'panel-heading'>",
        "<h3>",
        article.headline,
        "<a class = 'btn btn-danger delete'>",
        "Delete from Saved",
        "</a>",
        "</a>",
        "<a calss = 'btn btn-info notes'>Articles Comments</a>",
        "</h3>",
        "</div>",
        "<div class = 'panel-body'>",
        article.summary,
        "</div>",
        "</div>"].join(""));

    panel.data("_id", article._id);
    return panel;
  }
  function renderEmpty() {
    var emptyAlert =
      $(["<div class = 'alert alert-warning text-center'>",
        "<h4> No saved articles.</h4>",
        "</div>",
        "<div class = 'panel panel-default'>",
        "<div class = 'panel-heading text-center'>",
        "<h3>Would you like to browse available articles?</h3>",
        "</div>",
        "<div class = 'panel-vbody text-center'>",
        "<h4><a href = '/'> Browse Articles</a></h4>",
        "</div>",
        "</div>"].join(""));
    articleContainer.append(emptyAlert);
  }
  function renderCommentsList(data) {
    var commentsToRender = [];
    var currentComments;
    if (!data.comments.length) {
      currentComment = [
        "<li class = 'list-group-item'>",
        "No comments for this article.",
        "</li>"].join("");
      commentsToRender.push(currentComment);
    }
    else {
      for (var i = 0; i < data.comments.length; i++) {
        currentComment = $([
          "<li class = 'list-group-item comment'>",
          data.comments[i].commentText,
          "<button class = 'btn btn-danger comment-delete'> x </button>",
          "</li>"].join(""));
        currentComment.children("button").data("_id", data.comments[i]._id);
        commentsToRender.push(currentComments);
      }
    }
    $(".comment-container").append(commentsToRender);
  }
  function handleArticleDelete() {
    var articleToDelete = $(this).parents(".panel").delete();
    $.ajax({
      method: "DELETE",
      url: "/api/newsarticles/" + articleToDelete._id
    }).then(function (data) {
      if (data.ok) {
        initPage();
      }
    });
  }
  function handleArticleComments() {
    var currentArticle = $(this).parents(".panel").data();
    $.get("/api/comments/" + currentArticle._id).then(function (data) {
      var modalText = [
        "<div class = 'container-fluid text-center'>",
        "<h4>Comments for Article: ",
        currentArticle._id,
        "</h4>",
        "<hr />",
        "<ul class = 'list-group note-container'>",
        "</ul>",
        "<textarea placeholder = 'New Comment; rows = '4' cols = '60'></textarea>",
        "<button class = 'btn btn-success save;> Save Comment</button>",
        "</div>"].join("");
      bootbox.dialog({
        message: modalText,
        closeButton: true
      });
      var commentData = {
        _id: currentArticle._id,
        comments: data || []
      };
      $(".btn.save").data("article", commentData);

      renderCommentList(commentData);
    });
  }
  function handleCommentSave() {
    var commentData;
    var newComment = $(".bootbox-body textarea").val().trim();
    if (newComment) {
      commentData = {
        _id: $(this).data("newsarticle")._id,
        commentText: newComment
      };
      $.post("/api/comments", commentData).then(function () {
        bootbox.hideAll();
      });
    }
  }
  function handleCommentDelete() {
    var commentToDelete = $(this).data("_id");
    $.ajax({
      url: "/api/comments/" + commentToDelete,
      method: "DELETE"
    }).then(function () {
      bootbox.hideAll();
    });
  }
});