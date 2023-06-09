"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}

  User.init(
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
        passwordHash: { type: DataTypes.STRING },
        password: {
          type: DataTypes.VIRTUAL,
          validate: {
            isLongEnough: (val) => {
              if (val.length < 7) {
                throw new Error("Please choose a longer password");
              }
            }
          }
        }
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.associate = (models) => {
    // associations can be defined here
    // User.Friend = models.User.belongsToMany(models.Friend, { through: "UserFriends" });
    User.MyBook = models.User.belongsToMany(models.MyBook, { through: "UserMyBook" });

    User.belongsToMany(User, { as: "Friends", through: "UserFriends", foreignKey: "userId"}); // FriendId

    User.belongsToMany(models.Recommendation, { through: "UserRecommendation"}); // what user recommended
    
    // User.belongsToMany(User, { as: 'following', through: 'UserUser', foreignKey: 'userId' });

  };

  User.beforeSave((user, options) => {
    if (user.password) {
      user.passwordHash = bcrypt.hashSync(user.password, 10);
    }
  });

  return User;
};