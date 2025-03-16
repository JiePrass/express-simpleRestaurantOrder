const { Pesanan, DetailPesanan, Menu } = require("../models");
const { Sequelize } = require("sequelize");

exports.createOrder = async (req, res) => {
    const { nomor_meja, items } = req.body; // items = [{ id_menu, jumlah }]

    if (!nomor_meja || !items || items.length === 0) {
        return res.status(400).json({ message: "Nomor meja dan item pesanan wajib diisi!" });
    }

    const transaction = await Pesanan.sequelize.transaction();

    try {
        const menuIds = items.map(item => item.id_menu);
        const menus = await Menu.findAll({ where: { id: menuIds } });

        if (menus.length !== menuIds.length) {
            return res.status(404).json({ message: "Satu atau lebih menu tidak ditemukan!" });
        }

        let total_harga = items.reduce((total, item) => {
            const menu = menus.find(m => m.id === item.id_menu);
            return total + (menu.harga * item.jumlah);
        }, 0);

        // Tambahkan pajak 10%
        const pajak = 10 / 100;
        total_harga = total_harga * (1 + pajak);

        const pesanan = await Pesanan.create(
            { nomor_meja, total_harga, status: "Menunggu Pembayaran" },
            { transaction }
        );

        const detailPesananData = items.map(item => {
            const menu = menus.find(m => m.id === item.id_menu);
            return {
                id_pesanan: pesanan.id,
                id_menu: item.id_menu,
                jumlah: item.jumlah,
                harga_satuan: menu.harga,
                total_harga: menu.harga * item.jumlah,
            };
        });

        await DetailPesanan.bulkCreate(detailPesananData, { transaction });

        await transaction.commit();

        res.status(201).json({ message: "Pesanan berhasil dibuat!", pesanan });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ message: "Gagal membuat pesanan", error });
    }
};

// Hanya menampilkan pesanan yang BELUM selesai
exports.getOrders = async (req, res) => {
    try {
        const orders = await Pesanan.findAll({
            where: { status: { [Sequelize.Op.not]: "Selesai" } }, // Filter pesanan yang belum selesai
            attributes: ["id", "nomor_meja", "total_harga", "status", "waktu_pemesanan"],
            order: [["waktu_pemesanan", "DESC"]],
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Gagal mendapatkan pesanan", error });
    }
};

// Menampilkan RIWAYAT pesanan yang SUDAH selesai
exports.getOrdersHistory = async (req, res) => {
    try {
        const orders = await Pesanan.findAll({
            where: { status: "Selesai" }, // Hanya pesanan yang sudah selesai
            attributes: ["id", "nomor_meja", "total_harga", "status", "waktu_pemesanan"],
            order: [["waktu_pemesanan", "DESC"]],
        });
        console.log(orders)
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Gagal mendapatkan riwayat pesanan", error });
    }
};

// Mendapatkan detail pesanan dengan semua informasi menu
exports.getOrderDetails = async (req, res) => {
    const { id_pesanan } = req.params;

    try {
        const orderDetails = await DetailPesanan.findAll({
            where: { id_pesanan },
            include: [{ model: Menu }], // Mengambil semua informasi menu
        });

        if (!orderDetails || orderDetails.length === 0) {
            return res.status(404).json({ message: "Detail pesanan tidak ditemukan!" });
        }

        res.json(orderDetails);
    } catch (error) {
        res.status(500).json({ message: "Gagal mendapatkan detail pesanan", error });
    }
};

// Update status pesanan
exports.updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ message: "Status pesanan wajib diisi!" });
    }

    try {
        const pesanan = await Pesanan.findByPk(id);
        if (!pesanan) {
            return res.status(404).json({ message: "Pesanan tidak ditemukan!" });
        }

        pesanan.status = status;
        await pesanan.save();
        res.json({ message: "Status pesanan diperbarui!", pesanan });
    } catch (error) {
        res.status(500).json({ message: "Gagal memperbarui status pesanan", error });
    }
};

exports.deleteOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const pesanan = await Pesanan.findByPk(id);
        if (!pesanan) {
            return res.status(404).json({ message: "Pesanan tidak ditemukan!" });
        }

        // Hapus semua detail pesanan terkait terlebih dahulu
        await DetailPesanan.destroy({ where: { id_pesanan: id } });

        // Hapus pesanan utama
        await pesanan.destroy();

        res.json({ message: "Pesanan berhasil dihapus!" });
    } catch (error) {
        console.error("❌ ERROR saat menghapus pesanan:", error);
        res.status(500).json({ message: "Gagal menghapus pesanan", error });
    }
};
