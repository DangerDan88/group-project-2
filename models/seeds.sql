-- Hero Model Seeds 

use game;
-- Add Artist
insert into artists (name, image_uris, createdAt, updatedAt) values ('admin','/img/artists/admin.png', now(), now());

-- Add Heroes
insert into heroes (name, description, image_uris, class, health, attack, defense, experience, enabled, createdAt, updatedAt, ArtistId)
values 

("null", "Fighters share an unparalleled mastery with weapons and armor, and a thorough knowledge of the skills of combat. They are well acquainted with death, both meting it out and staring it defiantly in the face.", "/img/heroes/placeholder-200x200.jpg", "Fighter", "30", "10", "15" ,"0", 1, now(), now(), "1"),
("null", "Wizards are supreme magic-users, defined and united as a class by the spells they cast. Drawing on the subtle weave of magic that permeates the cosmos, wizards cast spells of explosive fire, arcing lightning, subtle deception, brute-force mind control, and much more.", "/img/heroes/placeholder-200x200.jpg","Wizard", "30", "10", "15", "0", 1, now(), now(), 1),
("null", "Monks are united in their ability to magically harness the energy that flows in their bodies. Whether channeled as a striking display of combat prowess or a subtler focus of defensive ability and speed, this energy infuses all that a monk does.", "/img/heroes/placeholder-200x200.jpg", "Monk", "30", "10", "15", "0", 1, now(), now(), 1),
("null", "Whether calling on the elemental forces of nature or emulating the creatures of the animal world, druids are an embodiment of nature's resilience, cunning, and fury. They claim no mastery over nature, but see themselves as extensions of nature's indomitable will.", "/img/heroes/placeholder-200x200.jpg,Druid", "30", "10", "15", "0", 1, now(), now(), 1),
("null", "Far from the bustle of cities and towns, past the hedges that shelter the most distant farms from the terrors of the wild, amid the dense-packed trees of trackless forests and across wide and empty plains, rangers keep their unending watch.", "/img/heroes/placeholder-200x200.jpg", "Ranger", "30", "10", "15", "0" ,1, now(), now(), 1),
("null", "Rogues rely on skill, stealth, and their foes' vulnerabilities to get the upper hand in any situation. They have a knack for finding the solution to just about any problem, demonstrating a resourcefulness and versatility that is the cornerstone of any successful adventuring party.", "/img/heroes/placeholder-200x200.jpg", "Rogue", "30", "10", "15", "0", 1, now(), now(),1);