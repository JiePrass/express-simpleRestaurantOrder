const multer = require("multer");
const path = require("path");

// Konfigurasi penyimpanan gambar
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Simpan gambar di folder 'uploads'
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nama unik untuk setiap file
    },
});

// Filter jenis file (hanya gambar)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        return cb(new Error("Hanya gambar dengan format JPEG, JPG, atau PNG yang diperbolehkan!"), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
