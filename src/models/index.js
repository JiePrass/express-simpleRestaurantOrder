const Menu = require("./menu");
const Pesanan = require("./pesanan");
const DetailPesanan = require("./detailPesanan");
const Kasir = require("./user");
const { sequelize } = require("sequelize");

// Relasi antara Pesanan & DetailPesanan (One-to-Many)
Pesanan.hasMany(DetailPesanan, { foreignKey: "id_pesanan" });
DetailPesanan.belongsTo(Pesanan, { foreignKey: "id_pesanan" });

// Relasi antara DetailPesanan & Menu (Many-to-One)
Menu.hasMany(DetailPesanan, { foreignKey: "id_menu" });
DetailPesanan.belongsTo(Menu, { foreignKey: "id_menu" });

// Export semua model
module.exports = { sequelize, Menu, Pesanan, DetailPesanan, Kasir };
