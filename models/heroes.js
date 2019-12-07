module.exports = function(sequelize, DataTypes) {
  var Heroes = sequelize.define("Heroes", {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    image_url: DataTypes.TEXT,
    class: DataTypes.TEXT, 
    health: DataTypes.INTEGER,
    attack: DataTypes.INTEGER,
    defense: DataTypes.INTEGER,
    experience: DataTypes.FLOAT,
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