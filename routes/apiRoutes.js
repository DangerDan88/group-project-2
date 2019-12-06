var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/heroes", function(req, res) {
    db.Heroes.findAll({}).then(function(dbHeroes) {
      res.json(dbHeroes);
    });
  });

  // Create a new example
  app.post("/api/heroes", function(req, res) {
    db.Heroes.create(req.body).then(function(dbHeroes) {
      res.json(dbHeroes);
    });
  });
 
  // Delete an example by id
  app.delete("/api/heroes/:id", function(req, res) {
    db.Heroes.destroy({ where: { id: req.params.id } }).then(function(dbHeroes) {
      res.json(dbHeroes);
    });
  }); 
};
 