'use strict';
module.exports = function(sequelize, DataTypes) {
  var Game_stats = sequelize.define("Game_stats", {
    UserId: DataTypes.INTEGER,
    Game_logId: DataTypes.INTEGER
  });

  Game_stats.associate = function(models){
    Game_stats.belongsTo(models.User, {foreignKey: 'UserId'})
    Game_stats.belongsTo(models.Game_log, {foreignKey: 'Game_logId'})
  };

  return Game_stats;
};
