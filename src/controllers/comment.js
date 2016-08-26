"use strict";

var Comment = require("mongoose").model("Comment");

exports.createComment = function *() {
  if (!this.request.body) {
    this.throw("The body is empty", 400);
  }

  if (!this.request.body.comment) {
    this.throw("Missing comment", 400);
  }

  try {
    var comment = new Comment({ commentId: this.request.body.commentId, author: this.request.body.author, text: this.request.body.text });
    comment = yield comment.save();
  } catch (err) {
    this.throw(err);
  }

  this.status = 200;
  this.body = { data: this.body.data };
  var commentList = yield Comment.find().sort("-commentId").exec();
  if (!commentList) {
    this.body = { data: commentList };
  }
};

exports.refreshCommentList = function *() {
  var commentList = yield Comment.find().sort("-commentId").exec();
  if (!commentList) {
    this.body = { data: commentList };
  }
};
