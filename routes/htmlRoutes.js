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
        use_tailwind: true,
        logged_in: false,
        msg: "Welcome! Prepare for Battle!",
        heroes: dbHeroes
      });
    });
  });

  // Login
  app.get("/login", function(req, res) {
    if (req.user) {
      res.redirect("/choose-hero");
    }
    res.render("login", {
      layout: 'sub', 
      page_title: 'Login', 
      use_tailwind: false,
      logged_in: false, 
      msg: "Login Form"
    });
  });

  // Register
  app.get("/register", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/choose-hero");
    }
    res.render("register", {
      layout: 'sub', 
      page_title: 'Register', 
      use_tailwind: false,
      logged_in: false, 
      msg: "Sign Up Form"
    });
  });

  // Choose Hero
  app.get("/choose-hero", isAuthenticated, function(req, res) {
    db.Heroes.findAll({}).then(function(AllHeroes){
      var user_data = { 
        id: req.user.id, 
        email: req.user.email,
        user_groups: req.user.user_groups,
      }

      res.render("choose-hero", {
        layout: 'sub', 
        page_title: 'Choose', 
        use_tailwind: true,
        logged_in: true, 
        logged_user: user_data,
        msg: "CHOOSE A HERO!", 
        all_heroes: AllHeroes 
      });
    });
  });

  // Challenge 
  app.get("/challenge", isAuthenticated, function(req, res) {
    res.render("challenge", {layout: 'sub', page_title: 'Challenge', logged_in: true, msg: "Challenge a Player!" });
  });

  // Game Play
  app.get("/play", isAuthenticated, function(req, res) {
    res.render("play", {
      layout: 'sub', 
      page_title: 'Play', 
      use_tailwind: false,
      logged_in: true, 
      msg: "Fight!" 
    });
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
    res.render("404", {
      layout: 'sub', 
      page_title: '404', 
      use_tailwind: false,
      logged_in: false 
    });
  });
};
