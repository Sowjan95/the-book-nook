"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Friend extends Model {}

  Friend.init(
    {
        username: {
            type: DataTypes.STRING,
            validate: {
                len: [3, 250],
                notEmpty: true,
            },
            unique: true,
            },
            email: {
            type: DataTypes.STRING,
            validate: {
                len: [3, 250],
                notEmpty: true,
                isEmail: true,
            },
            unique: true,
            },
    },
    {
      sequelize,
      modelName: "Friend",
    }
  );

  Friend.associate = (models) => {
    // associations can be defined here
    // Friend.User = models.Friend.belongsTo(models.User);
  };

  return Friend;
};
