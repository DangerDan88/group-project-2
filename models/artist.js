module.exports = function(sequelize, DataTypes) {
  var Artist = sequelize.define("Artist", {
    name: DataTypes.STRING,
    image_url: DataTypes.TEXT,
  });

  Artist.associate = function(models){
    Artist.belongsTo(models.User, { foreignKey: { allowNull: false }});
    Artist.hasMany(models.Heroes, { onDelete: "cascade" });
  };

  return Artist;
};