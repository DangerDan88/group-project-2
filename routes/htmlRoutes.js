var db = require("../models");

// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Heroes.findAll({}).then(function(dbHeroes) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbHeroes
      });
    });
  });

  // Login
  app.get("/login", function(req, res) {
    if (req.user) {
      res.redirect("/choose-hero");
    }
    res.render("login", {msg: "Login Form"});
  });

  // Register
  app.get("/register", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/choose-hero");
    }
    res.render("register", {msg: "Sign Up Form"});
    
  });

  // Choose Hero
  app.get("/choose-hero/", isAuthenticated, function(req, res) {
    db.Heroes.findAll({}).then(function(AllHeroes){
      res.render("choose-hero", { msg: "Choose a hero", all_heroes: AllHeroes });
    });
  });

  // Challenge
  app.get("/challenge", function(req, res) {
    res.render("challenge", { msg: "Challenge a Player!" });
  });

  // Game Play
  app.get("/play", function(req, res) {
    res.render("play", { msg: "Fight!" });
  });

  // Load example page and pass in an example by id
  app.get("/hero/:id", function(req, res) {
    db.Heroes.findOne({ where: { id: req.params.id } }).then(function(dbHero) {
      res.render("hero", {
        example: dbHero
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};