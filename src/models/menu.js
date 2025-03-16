const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Menu = sequelize.define("Menu", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nama: { type: DataTypes.STRING, allowNull: false },
    deskripsi: { type: DataTypes.TEXT },
    harga: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    kategori: { type: DataTypes.STRING },
    gambar: { type: DataTypes.STRING }, // URL gambar makanan
}, { tableName: "menu", timestamps: false });

module.exports = Menu;
