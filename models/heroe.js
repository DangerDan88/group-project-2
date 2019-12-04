module.exports = function(sequelize, DataTypes) {
  var Heroes = sequelize.define("Heroes", {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    image_uris: DataTypes.TEXT,
    type_line: DataTypes.TEXT, 
    power: DataTypes.INTEGER,
    toughness: DataTypes.INTEGER,
    color: DataTypes.STRING,
    enabled: DataTypes.BOOLEAN
  });

  Heroes.associate = function(models){
    Heroes.belongsTo(models.Artist, {
      foreignKey: {
        allowNull: false 
      }
    });
  };

  return Heroes;
};
