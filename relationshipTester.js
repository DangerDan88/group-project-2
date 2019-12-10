/**
 * relationshipTester
 * Running this file adds Heroes to the database. But a user must first be created before running this!
 * 
 * Usage: node relationshipTest.js
 */
var db = require("./models");
//=================================[ Create Artist ]====================================
Create_Artist();
function Create_Artist(){
  db.Artist.findOne({
    where: {
      UserId: 1
    } 
  })
  .then((record) => {
    if(record === null){
      // Create Artist when doesn't exists
      db.Artist.create({
        name: 'admin', image_url: '/img/artist/admin.png', createdAt: db.sequelize.NOW, updatedAt: db.sequelize.NOW, UserId: '1'
      })
      .then((newArtist) => {
        // The get() function allows you to recover only the DataValues of the object
        console.log(newArtist.get());
        Create_Heroes();
      })
      .catch((err) => {
        console.log("Error while artist creation : ", err)
      }); 

    }else{
      console.log(record.dataValues);
      Create_Heroes(false);
    }
  })
  .catch((err) => {
    console.log("Error fetching artist : ", err);
  }); 
}

//=================================[ Create Heroes ]====================================
function Create_Heroes(run=true){
  if(run === true){
    db.Heroes.bulkCreate([
      {
        name: null, 
        description: "Fighters share an unparalleled mastery with weapons and armor, and a thorough knowledge of the skills of combat. They are well acquainted with death, both meting it out and staring it defiantly in the face.", 
        image_url: JSON.stringify({
          "idle":    "/img/heroes/fighter/warrior_idle.gif",
          "prepare": "/img/heroes/fighter/warrior_prepare.gif",
          "walk":    "/img/heroes/fighter/warrior_walk.gif",
          "attack":  "/img/heroes/fighter/warrior_attack.gif",
          "die":     "/img/heroes/fighter/warrior_die.gif"
        }), 
        class: "Fighter", 
        health: "30", 
        attack: "10", 
        defense: "15", 
        experience: "0", 
        enabled: 1, 
        createdAt: db.sequelize.NOW, 
        updatedAt: db.sequelize.NOW, 
        ArtistId: "1"},
      {
        name: null, 
        description: "Wizards are supreme magic-users, defined and united as a class by the spells they cast. Drawing on the subtle weave of magic that permeates the cosmos, wizards cast spells of explosive fire, arcing lightning, subtle deception, brute-force mind control, and much more.", 
        image_url: JSON.stringify({
          "idle":    "/img/heroes/wizard/wizard1_idle.gif",
          "prepare": "/img/heroes/wizard/wizard1_prepare.gif",
          "walk":    "/img/heroes/wizard/wizard1_walk.gif",
          "attack":  "/img/heroes/wizard/wizard1_attack.gif",
          "die":     "/img/heroes/wizard/wizard1_die.gif"
        }), 
        class: "Wizard", 
        health: "30",
        attack: "10", 
        defense: "15", 
        experience: "0", 
        enabled: 1, 
        createdAt: db.sequelize.NOW, 
        updatedAt: db.sequelize.NOW, 
        ArtistId: 1
      },
      {
        name: null, 
        description: "Monks are united in their ability to magically harness the energy that flows in their bodies. Whether channeled as a striking display of combat prowess or a subtler focus of defensive ability and speed, this energy infuses all that a monk does.", 
        image_url: JSON.stringify({
          "idle":    "/img/heroes/monk/cleric_idle.gif",
          "prepare": "/img/heroes/monk/cleric_prepare.gif",
          "walk":    "/img/heroes/monk/cleric_walk.gif",
          "attack":  "/img/heroes/monk/cleric_attack.gif",
          "die":     "/img/heroes/monk/cleric_die.gif"
        }),
        class: "Monk", 
        health: "30", 
        attack: "10", 
        defense: "15", 
        experience: "0", 
        enabled: 1, 
        createdAt: db.sequelize.NOW, 
        updatedAt: db.sequelize.NOW, 
        ArtistId: 1
      },
      {
        name: null, 
        description: "Whether calling on the elemental forces of nature or emulating the creatures of the animal world, druids are an embodiment of nature's resilience, cunning, and fury. They claim no mastery over nature, but see themselves as extensions of nature's indomitable will.", 
        image_url: JSON.stringify({
          "idle":    "/img/heroes/druid/orc1_idle.gif",
          "prepare": "/img/heroes/druid/orc1_prepare.gif",
          "walk":    "/img/heroes/druid/orc1_walk.gif",
          "attack":  "/img/heroes/druid/orc1_attack.gif",
          "die":     "/img/heroes/druid/orc1_die.gif"
        }), 
        class: "Druid", 
        health: "30", 
        attack: "10", 
        defense: "15", 
        experience: "0", 
        enabled: 1, 
        createdAt: db.sequelize.NOW, 
        updatedAt: db.sequelize.NOW, 
        ArtistId: 1
      },
      {
        name: null, 
        description: "Far from the bustle of cities and towns, past the hedges that shelter the most distant farms from the terrors of the wild, amid the dense-packed trees of trackless forests and across wide and empty plains, rangers keep their unending watch.", 
        image_url: JSON.stringify({
          "idle":    "/img/heroes/ranger/ranger_idle.gif",
          "prepare": "/img/heroes/ranger/ranger_prepare.gif",
          "walk":    "/img/heroes/ranger/ranger_walk.gif",
          "attack":  "/img/heroes/ranger/ranger_attack.gif",
          "die":     "/img/heroes/ranger/ranger_die.gif"
        }), 
        class: "Ranger", 
        health: "30", 
        attack: "10", 
        defense: "15", 
        experience: "0", 
        enabled: 1, 
        createdAt: db.sequelize.NOW, 
        updatedAt: db.sequelize.NOW, 
        ArtistId: 1
      },
      {
        name: null, 
        description: "Rogues rely on skill, stealth, and their foes' vulnerabilities to get the upper hand in any situation. They have a knack for finding the solution to just about any problem, demonstrating a resourcefulness and versatility that is the cornerstone of any successful adventuring party.", 
        image_url: JSON.stringify({
          "idle":    "/img/heroes/rogue/rogue_idle.gif",
          "prepare": "/img/heroes/rogue/rogue_prepare.gif",
          "walk":    "/img/heroes/rogue/rogue_walk.gif",
          "attack":  "/img/heroes/rogue/rogue_attack.gif",
          "die":     "/img/heroes/rogue/rogue_die.gif"
        }),
        class: "Rogue", 
        health: "30", 
        attack: "10", 
        defense: "15", 
        experience: "0", 
        enabled: 1, 
        createdAt: db.sequelize.NOW, 
        updatedAt: db.sequelize.NOW, 
        ArtistId: 1
      }
    ])
    .then((newHeroes) => {
      console.log(newHeroes);
      Create_Game_log();
    })
    .catch((err) => {
      console.log("Error while heroes creation: ", err)
    });
  }else{
    Create_Game_log();
  }
}

//=================================[ Create Game_Log ]====================================
function Create_Game_log(){
  db.Game_log.bulkCreate([
    {
      UserId: 1,
      heroesId: 1,
      current_hp: 23,
      hero_exp: 0,
      createdAt: db.sequelize.NOW, 
      updatedAt: db.sequelize.NOW
    }
  ])
  .then((gameLogs) => { 
    console.log("looping results");
    gameLogs.forEach(game => {
      console.log(game.dataValues);
    });

    db.User.findAll({where: {id: [1]}, include: ['games']})
    .then((users) => {
      // For user 1 set the sames gameLogs
      users.forEach(user => {
        user.setGames(gameLogs) // gameLogs is an array (one user hasMany gameLogs)
        .then((joinedUsersgameLogs) => {
          console.log(JSON.stringify(joinedUsersgameLogs))
        })
        .catch((err) => console.log("Error while joining Users and gameLogs : ", err))
      });
    })
    .catch((err) => console.log("Error while Users search : ", err))
  })
  .catch((err) => {
    console.log("Error while gameLogs creation: ", err)
  });
}