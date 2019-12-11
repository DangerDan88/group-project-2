var db = require("../models");

// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

function unpackArray(dataObject){

  if(typeof (dataObject) == 'object'){
    for(var property in dataObject){
      if(dataObject.hasOwnProperty(property)){
        try {
          dataObject[property] = JSON.parse(dataObject[property]);
        }catch(e){
          continue;
        }
      }
    }
  }

  return dataObject;
}

function current_user_gamestats(request_user){
  if(request_user.user){
    db.Game_stats.findOne({
      attributes: ['Game_logId'],
      where: {
        UserId: request_user.user.id
      }
    }).then(function(dbGameStats){
      console.log("Get game log id: ", dbGameStats.Game_logId);
      db.Game_log.findOne({
        where: {
          id: dbGameStats.Game_logId
        }
      }).then(function(UserGameLog){
        var current_user = {
          id: request_user.user.id,
          email: request_user.user.email,
          groups: request_user.user.user_groups
        }

        current_user.heroesId = UserGameLog.dataValues.heroesId,
        current_user.hero_exp = UserGameLog.dataValues.hero_exp,
        current_user.hero_level = UserGameLog.dataValues.hero_level,
        current_user.wins = UserGameLog.dataValues.wins,
        current_user.losses = UserGameLog.dataValues.losses,
        current_user.last_opponentId = UserGameLog.dataValues.last_opponentId,
        current_user.in_game = UserGameLog.dataValues.in_game,
        current_user.my_turn = UserGameLog.dataValues.my_turn;
        console.log("current_user",current_user);
        return current_user;
      });
    });
  }else{
    var current_user = {
      id: "",
      email: "",
      groups: "",
      heroesId: "",
      hero_exp: 0,
      hero_level: 1,
      wins: 0,
      losses: 0,
      last_opponentId: "",
      in_game: false,
      my_turn: false
    }
  }

  return current_user;
}

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    current_user = current_user_gamestats(req);

    db.Heroes.findAll({}).then(function(dbHeroes) {
      dbHeroes = dbHeroes.filter(unpackArray);

      res.render("index", {
        use_fullwidth: true,
        logged_in: (req.user) ? true : false,
        logged_user: current_user,
        msg: "Welcome! Prepare for Battle!",
        heroes: dbHeroes
      });
    });
  });

  // Login
  app.get("/login", function(req, res) {
    current_user = current_user_gamestats(req);

    res.render("login", {
      layout: 'sub', 
      page_title: 'Login', 
      use_fullwidth: false,
      logged_in: false, 
      logged_user: current_user,
      msg: "Login Form"
    });
  });

  // Register
  app.get("/register", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/choose-hero");
    }

    current_user = current_user_gamestats(req);

    res.render("register", {
      layout: 'sub', 
      page_title: 'Register', 
      use_fullwidth: false,
      logged_in: false, 
      logged_user: current_user,
      logged_user_id: current_user.id,
      logged_user_groups: current_user.groups,
      logged_user_email: current_user.email,
      msg: "Sign Up Form"
    });
  });

  // Choose Hero
  app.get("/choose-hero", isAuthenticated, function(req, res) {
    var current_user = current_user_gamestats(req);
    if(typeof current_user.id === undefined){
      current_user = {
        id: "",
        email: "",
        groups: "",
        heroesId: "",
        hero_exp: 0,
        hero_level: 1,
        wins: 0,
        losses: 0,
        last_opponentId: "",
        in_game: false,
        my_turn: false
      }
    }

    db.Heroes.findAll({}).then(function(AllHeroes){
      AllHeroes = AllHeroes.filter(unpackArray);
      res.render("choose-hero", {
        layout: 'sub', 
        page_title: 'Choose', 
        use_fullwidth: true, 
        logged_in: true, 
        logged_user: current_user,
        logged_user_id: current_user.id,
        logged_user_groups: current_user.groups,
        logged_user_email: current_user.email,
        msg: "CHOOSE A HERO!", 
        all_heroes: AllHeroes
      });
    });
  });

  // Challenge
  app.get("/challenge", isAuthenticated, function(req, res) {
    current_user = current_user_gamestats(req);

    db.User.findAll({attributes: ['id', 'email']}).then(function(dbUsers) {
      res.render("challenge", {
        layout: 'sub', 
        page_title: 'Challenge', 
        use_fullwidth: true, 
        logged_in: true, 
        logged_user: current_user,
        logged_user_id: current_user.id,
        logged_user_groups: current_user.groups,
        logged_user_email: current_user.email,
        msg: "Challenge a Player!", 
        // my_hero: 
        players: dbUsers
      });
    });
  });

  // Game Play
  app.get("/play", isAuthenticated, function(req, res) {
    current_user = current_user_gamestats(req);

    res.render("play", {
      layout: 'sub', 
      page_title: 'Play', 
      use_fullwidth: false,
      logged_in: true, 
      logged_user: current_user,
      logged_user_id: current_user.id,
      logged_user_groups: current_user.groups,
      logged_user_email: current_user.email,
      msg: "Fight!" 
    });
  });

  // Load example page and pass in an example by id
  app.get("/hero/:id", function(req, res) {
    db.Heroes.findOne({ where: { id: req.params.id } }).then(function(dbHero) {
      dbHero = dbHero.filter(unpackArray);
      res.render("hero", {
        example: dbHero
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    current_user = current_user_gamestats(req);

    res.render("404", {
      layout: 'sub', 
      page_title: '404', 
      use_fullwidth: true,
      logged_in: (req.user) ? true : false,
      logged_user: current_user,
      logged_user_id: current_user.id,
      logged_user_groups: current_user.groups,
      logged_user_email: current_user.email,
    });
  });
};