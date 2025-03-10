const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Claim = sequelize.define("Claim", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  claimType: {
    type: DataTypes.ENUM("Medical", "Property", "Travel", "Other"),
    allowNull: false,
  },
  claimAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 100,
      max: 1000000,
    },
  },
  claimDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  documentUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Claim;
