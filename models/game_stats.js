module.exports = function(sequelize, DataTypes) {
  var Game_stats = sequelize.define("Game_stats", {
    heroesId: DataTypes.INTEGER,
    current_hp: DataTypes.FLOAT,
    hero_exp: DataTypes.FLOAT,
    hero_level: DataTypes.INTEGER,
    wins: DataTypes.INTEGER,
    losses: DataTypes.INTEGER,
    last_opponentId: DataTypes.INTEGER,
    in_game: DataTypes.BOOLEAN,
    my_turn: DataTypes.BOOLEAN,
  });

  Game_stats.associate = function(models){ 
    Game_stats.belongsToMany(models.User, {
      onDelete: "cascade",
      through: 'Game_log',
      foreignKey: 'Game_statId',
      as: 'games'
    });
  };

  return Game_stats;
};