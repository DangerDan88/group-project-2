<<<<<<< HEAD
$(document).ready(function(){



$("button").on('click', function(){

    $.post("/api/gamelog/", function(req,res){
    
    where = {
        "UserId": req.body.UserId, 
        "heroesId": req.body.heroesId,
        "current_hp": req.body.current_hp,
        "hero_exp": req.body.hero_exp,
        "createdAt": req.body.createdAt,
        "updatedAt": req.body.updatedAt
      }
    })
      .then(function(result) {
        console.log(result)
        window.location.replace("/challenge/");
      })
      .catch(handleLoginErr);
  
})

});
=======
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
  
}

var handleChosen = function(){
  var game_log = {
    "UserId": $("#logged_user").data("user_id"),
    "heroesId": $(this).data("id"),
    "createdAt":  Date.now(), 
    "updatedAt":  Date.now()
  };

  console.log("Game Log", game_log); 

  API.saveGameLog(game_log).then(function() {
    refreshGame();
  });
}

// Add event listeners to the choose this hero buttons
$select_character_block.on("click", ".choose-btn", handleChosen);
<<<<<<< HEAD
>>>>>>> af446d7a8c1c3230fb90de05201125b9eac57526
=======
>>>>>>> b41cdd463584a12d3eaef48ce49276a4afb69451
