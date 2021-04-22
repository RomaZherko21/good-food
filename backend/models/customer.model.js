const { DataTypes } = require('sequelize');
const sequelize = require('../config/mySQL');

const Customer = sequelize.define(
  'customer',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    base32: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: false, //table name = "Customer" will be "Customer" in a database (not "Customers")
    tableName: 'Customers', // You can simply tell DataTypes the name of the table directly
  }
);

module.exports = Customer;
