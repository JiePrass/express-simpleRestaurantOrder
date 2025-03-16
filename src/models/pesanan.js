const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Pesanan = sequelize.define("Pesanan", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nomor_meja: { type: DataTypes.INTEGER, allowNull: false },
    total_harga: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    status: {
        type: DataTypes.ENUM("Menunggu Pembayaran", "Diproses", "Selesai"),
        allowNull: false,
        defaultValue: "Menunggu Pembayaran",
    },
    waktu_pemesanan: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    }, { tableName: "pesanan", timestamps: false });

module.exports = Pesanan;
