"use strict";
var Router = require("koa-router");

var countController = require("../src/controllers/count");
var indexController = require("../src/controllers/index");
var authController = require("../src/controllers/auth");
var commentController = require("../src/controllers/comment");

var secured = function *(next) {
  if (this.isAuthenticated()) {
    yield next;
  } else {
    this.status = 401;
  }
};

module.exports = function(app, passport) {
  // register functions
  var router = new Router();

  router.use(function *(next) {
    console.log("before router.use");
    this.type = "json";
    yield next;
    console.log("after router.use");
  });


  router.get("/", function *() {
    this.type = "html";
    console.log("before router.get(/)");
    yield indexController.index.apply(this);
    console.log("after router.get(/)");
  });


  console.log("before router.get(/auth)");
  router.get("/auth", authController.getCurrentUser);
  router.post("/auth", authController.signIn);

  console.log("before router.all(/signout)");
  router.all("/signout", authController.signOut);
  router.post("/signup", authController.createUser);
  
  router.get("/comment", secured, commentController.refreshCommentList);
  router.post("/comment", commentController.createComment);

  // secured routes
  router.get("/value", secured, countController.getCount);
  router.get("/inc", secured, countController.increment);
  router.get("/dec", secured, countController.decrement);
  app.use(router.routes());
};
