const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Pesanan = require("./pesanan");
const Menu = require("./menu");

const DetailPesanan = sequelize.define("DetailPesanan", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_pesanan: { 
        type: DataTypes.INTEGER, 
        references: { model: Pesanan, key: "id" },
        onDelete: "CASCADE"
    },
    id_menu: { 
        type: DataTypes.INTEGER, 
        references: { model: Menu, key: "id" },
        onDelete: "CASCADE"
    },
    jumlah: { type: DataTypes.INTEGER, allowNull: false },
    harga_satuan: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    total_harga: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
}, { tableName: "detail_pesanan", timestamps: false });

module.exports = DetailPesanan;
