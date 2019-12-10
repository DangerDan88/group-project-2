-- Hero Model Seeds 

use game;
-- Add Artist
insert into artists (name, image_url, createdAt, updatedAt) values ('admin','/img/artists/admin.png', now(), now());

-- Add Heroes
insert into heroes (name, description, image_url, class, health, attack, defense, experience, enabled, createdAt, updatedAt, ArtistId)
values 
("null", "Fighters share an unparalleled mastery with weapons and armor, and a thorough knowledge of the skills of combat. They are well acquainted with death, both meting it out and staring it defiantly in the face.", '{"idle":"/img/heroes/fighter/warrior_idle.gif","prepare":"/img/heroes/fighter/warrior_prepare.gif","walk":"/img/heroes/fighter/warrior_walk.gif","attack":"/img/heroes/fighter/warrior_attack.gif","die":"/img/heroes/fighter/warrior_die.gif"}', "Fighter", "30", "10", "15" ,"0", 1, now(), now(), "1"),
("null", "Wizards are supreme magic-users, defined and united as a class by the spells they cast. Drawing on the subtle weave of magic that permeates the cosmos, wizards cast spells of explosive fire, arcing lightning, subtle deception, brute-force mind control, and much more.", '{"idle":"/img/heroes/wizard/wizard1_idle.gif","prepare":"/img/heroes/wizard/wizard1_prepare.gif","walk":"/img/heroes/wizard/wizard1_walk.gif","attack":"/img/heroes/wizard/wizard1_attack.gif","die":"/img/heroes/wizard/wizard1_die.gif"}',"Wizard", "30", "10", "15", "0", 1, now(), now(), 1),
("null", "Clerics are intermediaries between the mortal world and the distant planes of the gods. As varied as the gods they serve, clerics strive to embody the handiwork of their deities. No ordinary priest, a cleric is imbued with divine magic.", '{"idle":"/img/heroes/monk/cleric_idle.gif","prepare":"/img/heroes/monk/cleric_prepare.gif","walk":"/img/heroes/monk/cleric_walk.gif","attack":"/img/heroes/monk/cleric_attack.gif","die":"/img/heroes/monk/cleric_die.gif"}', "Cleric", "30", "10", "15", "0", 1, now(), now(), 1),
("null", "Whether calling on the elemental forces of nature or emulating the creatures of the animal world, druids are an embodiment of nature's resilience, cunning, and fury. They claim no mastery over nature, but see themselves as extensions of nature's indomitable will.", '{"idle":"/img/heroes/druid/orc2_idle.gif","prepare":"/img/heroes/druid/orc2_prepare.gif","walk":"/img/heroes/druid/orc2_walk.gif","attack":"/img/heroes/druid/orc2_attack.gif","die":"/img/heroes/druid/orc2_die.gif"}', "Druid", "30", "10", "15", "0", 1, now(), now(), 1),
("null", "Far from the bustle of cities and towns, past the hedges that shelter the most distant farms from the terrors of the wild, amid the dense-packed trees of trackless forests and across wide and empty plains, rangers keep their unending watch.", '{"idle":"/img/heroes/ranger/ranger_idle.gif","prepare":"/img/heroes/ranger/ranger_prepare.gif","walk":"/img/heroes/ranger/ranger_walk.gif","attack":"/img/heroes/ranger/ranger_attack.gif","die":"/img/heroes/ranger/ranger_die.gif"}', "Ranger", "30", "10", "15", "0" ,1, now(), now(), 1),
("null", "Rogues rely on skill, stealth, and their foes' vulnerabilities to get the upper hand in any situation. They have a knack for finding the solution to just about any problem, demonstrating a resourcefulness and versatility that is the cornerstone of any successful adventuring party.", '{"idle":"/img/heroes/rogue/rogue_idle.gif","prepare":"/img/heroes/rogue/rogue_prepare.gif","walk":"/img/heroes/rogue/rogue_walk.gif","attack":"/img/heroes/rogue/rogue_attack.gif","die":"/img/heroes/rogue/rogue_die.gif"}', "Rogue", "30", "10", "15", "0", 1, now(), now(),1);

-- Update Heroes
UPDATE heroes 
   SET 
      name="null",
      description="Fighters share an unparalleled mastery with weapons and armor, and a thorough knowledge of the skills of combat. They are well acquainted with death, both meting it out and staring it defiantly in the face.", 
      image_url='{"idle":"/img/heroes/fighter/warrior_idle.gif","prepare":"/img/heroes/fighter/warrior_prepare.gif","walk":"/img/heroes/fighter/warrior_walk.gif","attack":"/img/heroes/fighter/warrior_attack.gif","die":"/img/heroes/fighter/warrior_die.gif"}', 
      class="Fighter", 
      health="30", 
      attack="10", 
      defense="15" ,
      experience="0", 
      enabled=1, 
      createdAt=now(), 
      updatedAt=now(), 
      ArtistId="1"
   WHERE id=1