var db = require("../models");

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

  // Login/Register
  app.get("/login/", function(req, res) {
    res.render("login", {msg: "Login"});
  });

  // Choose Hero
  app.get("/choose-hero/", function(req, res) {
    db.Heroes.findAll({}).then(function(AllHeroes){
      res.render("choose-hero", { msg: "CHOOSE A HERO!", all_heroes: AllHeroes });
    });
  });

  // Challenge
  app.get("/challenge/", function(req, res) {
    res.render("challenge", { msg: "Challenge a Player!" });
  });

  // Game Play
  app.get("/play/", function(req, res) {
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
