/**
 * @package game
 * @subpackage server
 * @author Tyler Webb, Christopher Collins, Matthew Ayrton, Daniel Osornio
 * @version 1.1.1
/* ===============[ Dependencies  ]========================*/
require("dotenv").config();
var express = require("express");
var express_handlebars = require("express-handlebars");

var db = require("./models");

/* ===============[ Express Config ]=======================*/
var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); 

// Serve static content for the app from the "public" directory.
app.use(express.static("public")); 

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