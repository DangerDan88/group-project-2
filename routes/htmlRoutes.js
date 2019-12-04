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

