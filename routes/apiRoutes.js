/**
 * @package battleheroes
 * @subpackage apiRoutes
 * @version 1.0.0
 * 
 * CRUD manipulation for the models: user, artist, heroes, game_log/game_stats
 * -----------------------------------------------------
 * TABLE OF CONTENTS
 * 0.0 Dependencies
 * 
 * 1.0 API Routes
 *   1.1 User API
 *   2.1 Artist API
 *   3.1 Heroes API
 *   4.1 Game_Logs joined with Game Stats
 *-------------------------------------------------------*/
/* ===============[ 0.0 Dependencies ]========================*/
var db = require("../models");
var passport = require("../config/passport");

/* ===============[ 1.0 API Routes ]===========================*/
/**
 * 1.1 User API
 * POST: /api/login, /api/signup, 
 * GET: /logout, /api/user_data
 */
module.exports = function(app) {
  /**
   * Using the passport.authenticate middleware with our local strategy.
   * If the user has valid login credentials, send them to the members page.
   * Otherwise the user will be sent an error 
   */
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  /**
   * Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
   * how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
   * otherwise send back an error
  */
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  app.get("/api/all_user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {

      db.User.findAll({attributes: ['id', 'email']}).then(function(dbUsers) {
        res.json(dbUsers);
      });
    }
  });

  /**
   * 2.1 Artist API
   *   GET /api/artist, /api/artist/:id
   *   POST /api/artist/
   *   PUT /api/artist/:id
   *   DELETE /api/artist/:id
   */
  // Get all artist
  app.get("/api/artist", function(req, res) {
    db.Artist.findAll({}).then(function(dbArtists) {
      res.json(dbArtists);
    });
  });

  // Get single artist
  app.get("/api/artist/:id", function(req, res) {
    db.Artist.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbArtist) {
      console.log(dbArtist);
      res.json(dbArtist);
    });
  });

  // Create a new artist
  app.post("/api/artist", function(req, res) {
    db.Artist.create(req.body).then(function(dbArtist) {
      res.json(dbArtist);
    });
  });

  // PUT route for updating artist
  app.put("/api/artist/:id", function(req, res) {
    db.Artist.update(
      req.body,
      {
        where: {
          id: req.params.id
        }
      }).then(function(dbArtist) {
        res.json(dbArtist);
    });
  });

  // DELETE route for deleting Artist
  app.delete("/api/artist/:id", function(req, res) {
    db.Artist.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbArtist) {
      res.json(dbArtist);
    });
  });

  /**
   * 3.1 Heroes API
   *   GET /api/heroes/, /api/heroes/:id
   *   POST /api/heroes/
   *   PUT /api/heroes/:id
   *   DELETE /api/heroes/:id
   */
  // Get all Heroes
  app.get("/api/heroes", function(req, res) {
    db.Heroes.findAll({}).then(function(dbHeroes) {
      res.json(dbHeroes);
    });
  });

  // Get single heroes
  app.get("/api/heroes/:id", function(req, res) {
    db.Heroes.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbHeroes) {
      console.log(dbHeroes);
      res.json(dbHeroes);
    });
  });

  // Create a new heroes
  app.post("/api/heroes", function(req, res) {
    db.Heroes.create(req.body).then(function(dbHeroes) {
      res.json(dbHeroes);
    });
  });

  // PUT route for updating heroes
  app.put("/api/heroes/:id", function(req, res) {
    db.Heroes.update(
      req.body,
      {
        where: {
          id: req.params.id
        }
      }).then(function(dbHeroes) {
        res.json(dbHeroes);
    });
  });

  // DELETE route for deleting heroes
  app.delete("/api/heroes/:id", function(req, res) {
    db.Heroes.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbHeroes) {
      res.json(dbHeroes);
    });
  });

  /**
   * 4.1 Game_Logs joined with Game Stats
   *   GET /api/gamelog/:id
   *   POST /api/gamelog/ and update game_stats
   *   PUT /api/gamelog/:id and update game_stats
   *   DELETE /api/gamelog/:id and auto delete game_stats 
   */
   // Create a new game_log
   app.post("/api/gamelog", function(req, res) {
    db.Game_log.create(req.body).then(function(gameLogs) {
      console.log(gameLogs.dataValues);

      db.User.findAll({where: {id: gameLogs.dataValues.UserId}, include: ['games']})
      .then((users) => {
        console.log(users);
        // For each user found set the sames gameLogs
        users.forEach(user => {
          return user.setGames(gameLogs) // gameLogs is an array (one user hasMany gameLogs)
          .then((joinedUsersgameLogs) => {
            console.log(JSON.stringify(joinedUsersgameLogs));
          })
          //.catch((err) => console.log("Error while joining Users and gameLogs : ", err))
        }); 
      })
      .catch((err) => console.log("Error while Users search : ", err))
    });
  });
};