const fs = require("fs");
const Menu = require("../models/menu");
const path = require("path");

// Mendapatkan daftar menu
exports.getMenus = async (req, res) => {
    try {
        const menus = await Menu.findAll();
        res.json(menus);
    } catch (error) {
        res.status(500).json({ message: "Gagal mendapatkan menu", error });
    }
};

// Menambahkan menu baru dengan upload gambar
exports.createMenu = async (req, res) => {
    try {
        const { nama, deskripsi, harga, kategori } = req.body;
        const gambar = req.file ? `/uploads/${req.file.filename}` : null; // Simpan path gambar

        console.log(nama, harga)
        if (!nama || !harga) {
            return res.status(400).json({ message: "Nama dan harga wajib diisi!" });
        }

        const menu = await Menu.create({ nama, deskripsi, harga, kategori, gambar });
        res.status(201).json({ message: "Menu berhasil ditambahkan!", menu });
    } catch (error) {
        res.status(500).json({ message: "Gagal menambahkan menu", error });
    }
};

exports.updateMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama, deskripsi, harga, kategori } = req.body;
        const menu = await Menu.findByPk(id);

        if (!menu) {
            return res.status(404).json({ message: "Menu tidak ditemukan!" });
        }

        let gambar = menu.gambar; // Gunakan gambar lama sebagai default
        if (req.file) {
            // Hapus gambar lama jika ada
            if (menu.gambar) {
                const oldImagePath = path.join(__dirname, "..", "..", "uploads", path.basename(menu.gambar));
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }

            // Simpan gambar baru
            gambar = `/uploads/${req.file.filename}`;
        }

        // Update menu dengan data baru
        await menu.update({ nama, deskripsi, harga, kategori, gambar });

        res.json({ message: "Menu berhasil diperbarui!", menu });
    } catch (error) {
        res.status(500).json({ message: "Gagal memperbarui menu", error });
    }
};


exports.deleteMenu = async (req, res) => {
    try {
        const menu = await Menu.findByPk(req.params.id);

        if (!menu) {
            return res.status(404).json({ message: "Menu tidak ditemukan!" });
        }

        // Hapus gambar jika ada
        if (menu.gambar) {
            const imagePath = path.join(__dirname, "..", "..", "uploads", path.basename(menu.gambar)); // Path gambar
            console.log("Menghapus file:", imagePath);

            if (fs.existsSync(imagePath)) {
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error("Gagal menghapus file:", err);
                    } else {
                        console.log("File berhasil dihapus:", imagePath);
                    }
                });
            } else {
                console.log("File tidak ditemukan:", imagePath);
            }
        }

        // Hapus menu dari database
        await menu.destroy();

        res.json({ message: "Menu berhasil dihapus!" });
    } catch (error) {
        console.error("Error saat menghapus menu:", error);
        res.status(500).json({ message: "Gagal menghapus menu", error });
    }
};
