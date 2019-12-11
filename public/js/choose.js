// Get references to page elements
var $select_character_block = $("#select-character");

// The API object contains methods for each kind of request we'll make
var API = {
  saveGameLog: function(log) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/gamelog", 
      data: JSON.stringify(log)
    });
  }
};

var refreshGame = function(){
  location.reload();
};

var handleChosen = function(){
  var game_log = {
    "UserId": $("#logged_user").data("user_id"),
    "heroesId": $(this).data("id"),
    "current_hp": $(this).data("health"),
    "hero_exp": $(this).data("experience"),
    "createdAt":  Date.now(), 
    "updatedAt":  Date.now()
  };

  console.log("Game Log", game_log); 

  API.saveGameLog(game_log).then(function() {
    refreshGame();
  });
};

// Add event listeners to the choose this hero buttons
$select_character_block.on("click", ".choose-btn", handleChosen);
