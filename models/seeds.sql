-- Hero Model Seeds 

use game;
-- Add Artist
insert into artists (name, image_uris, createdAt, updatedAt) values ('admin','/img/artists/admin.png', now(), now());

-- Add Heroes
insert into heroes (name, description, image_uris, class, health, attack, defense, experience, enabled, createdAt, updatedAt, ArtistId)
values ("Batman", "Batman is the superhero protector of Gotham City, a man dressed like a bat who fights against evil and strikes terror into the hearts of criminals everywhere. In his secret identity he is Bruce Wayne, billionaire industrialist and notorious playboy.", "/img/heroes/batman.png", "warrior", "100", "20", "75", "0", 1, now(), now(), "1");