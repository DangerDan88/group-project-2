/**
 * @package game
 * @subpackage server
 * @author Tyler Webb, Christopher Collins, Matthew Ayrton, Daniel Osornio
 * @version 1.1.1
/* ===============[ Dependencies  ]========================*/
require("dotenv").config();
var express = require("express");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");
var express_handlebars = require("express-handlebars");

/* ===============[ Express Config ]=======================*/
var PORT = process.env.PORT || 3000;
var db = require("./models");
var app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

// Serve static content for the app from the "public" directory.
app.use(express.static("public")); 

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Handlebars
app.engine(
  "handlebars",
  express_handlebars({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
