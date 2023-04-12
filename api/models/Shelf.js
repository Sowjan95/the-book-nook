"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Shelf extends Model {}

  Shelf.init(
    {
        type: {
            type: DataTypes.STRING,
            validate: {
              len: [3, 250],
              notEmpty: true,
            },
            unique: true,
          },
    },
    {
      sequelize,
      modelName: "Shelf",
    }
  );
  
  Shelf.associate = (models) => {
    // associations can be defined here
    Shelf.MyBooks = models.Shelf.belongsToMany(models.MyBook, { through: "ShelfMyBook" });
  };

  return Shelf;
};