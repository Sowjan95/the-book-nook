"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Recommendation extends Model {}

  Recommendation.init(
    {
    },
    {
      sequelize,
      modelName: "Recommendation",
    }
  );

  Recommendation.associate = (models) => {
    models.Recommendation.belongsTo(models.User, {foreignKey: "FriendId"}); // Association with recommender // id
    Recommendation.User = models.Recommendation.belongsTo(models.User); // Association with who you're recommending to // UserId
    models.Recommendation.belongsTo(models.Book); // BookId
  };

  return Recommendation;
};
