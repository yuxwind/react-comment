"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var User = require("../controllers/auth");
/**
 * Schema
 */
var CommentSchema = new Schema({
  commentId: { type: Date, default: Date.now },
  //  updated: { type: Date, default: Date.now },
  author: { type: String, required: true },
  text: { type: String, required: true },
});

CommentSchema.pre("save", function(next) {
  this.commentId = new Date();
  this.author = User.getCurrentUser();
  next();
});

mongoose.model("Comment", CommentSchema);
