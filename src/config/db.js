// Memuat file .env
require("dotenv").config();

const { Sequelize } = require("sequelize");

// Membuat koneksi ke database menggunakan variabel dari .env
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
});

// Mengecek koneksi ke database
sequelize
    .authenticate()
    .then(() => {
        console.log("Koneksi ke database berhasil!");
    })
    .catch((err) => {
        console.error("Tidak dapat terhubung ke database:", err);
    });

module.exports = sequelize;
