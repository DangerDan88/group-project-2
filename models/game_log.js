module.exports = function(sequelize, DataTypes) {
  var Game_log = sequelize.define("Game_log", {
    UserId: DataTypes.INTEGER,
    heroesId: DataTypes.INTEGER,
    current_hp: DataTypes.FLOAT,
    hero_exp: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    hero_level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    wins: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    losses: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    last_opponentId: DataTypes.INTEGER,
    in_game: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    my_turn: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
  });

  Game_log.associate = function(models){ 
    Game_log.belongsToMany(models.User, {
      onDelete: "cascade",
      through: 'Game_stats',
      foreignKey: 'Game_logId',
      as: 'games'
    });
  };

  return Game_log;
};