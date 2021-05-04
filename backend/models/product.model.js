const { DataTypes } = require('sequelize');
const sequelize = require('../config/mySQL');

const Product = sequelize.define(
  'product',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    ingredients: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    steps: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    timers: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    imageURL: {
      type: DataTypes.STRING,
      defaultValue:
        'https://thatssojenn.files.wordpress.com/2012/09/no-food.jpg',
      allowNull: true,
    },
    originalURL: {
      type: DataTypes.STRING,
      defaultValue:
        'https://thatssojenn.files.wordpress.com/2012/09/no-food.jpg',
      allowNull: true,
    },
  },
  {
    freezeTableName: false,
    tableName: 'Products',
  }
);

module.exports = Product;
