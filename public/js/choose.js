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