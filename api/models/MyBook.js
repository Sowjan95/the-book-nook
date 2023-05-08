"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class MyBook extends Model {}

  MyBook.init(
    {
       rating: {
        type: DataTypes.INTEGER,
       },
       review: {
        type: DataTypes.STRING,
       },
       like: {
        type: DataTypes.BOOLEAN,
       },
       pages_read: {
        type: DataTypes.INTEGER,
       },
       date_started: {
        type: DataTypes.DATEONLY,
        validate: { isDate: true },
       },
       date_ended: {
        type: DataTypes.DATEONLY,
        validate: { isDate: true },
       }
    },
    {
      sequelize,
      modelName: "MyBook",
    }
  );

  MyBook.associate = (models) => {
    models.MyBook.belongsTo(models.Book);
    MyBook.User = models.MyBook.belongsTo(models.User);
    models.MyBook.belongsTo(models.Shelf);
  };

  return MyBook;
};
