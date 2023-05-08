"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {}

  Book.init(
    {
      title: {
        type: DataTypes.STRING,
        validate: {
          len: [3, 250],
          notEmpty: true,
        },
        unique: true,
      },
      author: {
        type: DataTypes.STRING,
        validate: {
          len: [3, 250],
          notEmpty: true,
        },
      },
      pages: {
        type: DataTypes.INTEGER,
        defaultValue: 100
      }
    },
    {
      sequelize,
      modelName: "Book",
    }
  );

  Book.associate = (models) => {
    // associations can be defined here
    models.Book.hasMany(models.MyBook);
  };

  return Book;
};
