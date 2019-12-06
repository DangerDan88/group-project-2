module.exports = function(sequelize, DataTypes) {
  var Artist = sequelize.define("Artist", {
    name: DataTypes.STRING,
    image_uris: DataTypes.TEXT,
  });

  Artist.associate = function(models){
    Artist.hasMany(models.Heroes, {
      onDelete: "cascade"
    });
  };

  return Artist;
};