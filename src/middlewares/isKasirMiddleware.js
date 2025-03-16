const jwt = require("jsonwebtoken");

const isKasir = (req, res, next) => {
    // Ambil token dari header Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token tidak ditemukan atau tidak valid!" });
    }

    const token = authHeader.split(" ")[1]; // Ambil token setelah "Bearer "
    
    try {
        // Verifikasi token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Cek apakah role adalah admin
        if (decoded.role !== "kasir") {
            return res.status(403).json({ message: "Akses ditolak! Hanya Kasir yang bisa mengakses ini." });
        }

        // Simpan data user ke req.user untuk digunakan di middleware lain jika diperlukan
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token tidak valid!", error });
    }
};

module.exports = isKasir;
