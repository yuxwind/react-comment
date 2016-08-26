"use strict";
const path = require("path");
const serve = require("koa-static-cache");
const session = require("koa-generic-session");
const MongoStore = require("koa-sess-mongo-store");
const responseTime = require("koa-response-time");
const logger = require("koa-logger");
const views = require("co-views");
const compress = require("koa-compress");
const errorHandler = require("koa-error");
const bodyParser = require("koa-bodyparser");

const STATIC_FILES_MAP = {};
const SERVE_OPTIONS = { maxAge: 365 * 24 * 60 * 60 };

module.exports = function(app, config, passport) {
  if (!config.app.keys) { throw new Error("Please add session secret key in the config file!"); }
  app.keys = config.app.keys;

  if (config.app.env !== "test") {
    app.use(logger());
  }

  console.log("in koa, before app.use(errorHandler())");
  app.use(errorHandler());

  if (config.app.env === "production") {
    console.log("in koa, before app.use(serve(path.join");
    app.use(serve(path.join(config.app.root, "build", "public"), SERVE_OPTIONS, STATIC_FILES_MAP));
  } else {
    console.log("in koa, before app.use(require");
    app.use(require("koa-proxy")({
      host: "http://localhost:2992",
      match: /^\/_assets\//,
    }));
  }

  console.log("in koa, before app.use(session");
  app.use(session({
    key: "koareactfullexample.sid",
    store: new MongoStore({ url: config.mongo.url }),
  }));

  console.log("in koa, before app.use(bodyParser())");
  app.use(bodyParser());
  app.use(passport.initialize());
  app.use(passport.session());

  console.log("in koa, before app.use(function *(next)");
  app.use(function *(next) {
    this.render = views(config.app.root + "/src/views", {
      map: { html: "swig" },
      cache: config.app.env === "development" ? "memory" : false,
    });
    yield next;
  });

  console.log("in koa, before app.use(compress())");
  app.use(compress());
  console.log("in koa, before app.use(responseTime())");
  app.use(responseTime());
};
