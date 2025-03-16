const express = require("express");
const { createOrder, getOrders, getOrderDetails, updateOrderStatus, getOrdersHistory, deleteOrder } = require("../controllers/pesananController");
const isKasir = require("../middlewares/isKasirMiddleware");

const router = express.Router();

router.get("/riwayat", isKasir, getOrdersHistory);
router.get("/", isKasir, getOrders);
router.get("/:id_pesanan", isKasir, getOrderDetails);
router.post("/", createOrder);
router.put("/:id", isKasir, updateOrderStatus);
router.delete("/:id", isKasir, deleteOrder);

module.exports = router;
