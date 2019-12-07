'use strict';
module.exports = function(sequelize, DataTypes) {
  var Game_log = sequelize.define("Game_log", {
    UserId: DataTypes.INTEGER,
    Game_statId: DataTypes.INTEGER,
  }, {});

  Game_log.associate = function(models){
    Game_log.belongsTo(models.User, {foreignKey: 'UserId'})
    Game_log.belongsTo(models.Game_stats, {foreignKey: 'Game_statId'})
  };

  return Game_log;
};
