const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const user = sequelize.define("user", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, { tableName: "user", timestamps: false });

module.exports = user;
