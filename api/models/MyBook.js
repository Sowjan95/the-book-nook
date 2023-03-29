"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class MyBook extends Model {}

  MyBook.init(
    {
      title: {
        type: DataTypes.STRING,
        validate: {
          len: [3, 250],
          notEmpty: true,
        },
      },
      author: {
        type: DataTypes.STRING,
        validate: {
          len: [3, 250],
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: "MyBook",
    }
  );

  MyBook.associate = (models) => {
    // associations can be defined here
    MyBook.User = models.MyBook.belongsTo(models.User);
    // models.MyBook.belongsTo(models.Book); // MyBook taken from Book api
  };

  return MyBook;
};
