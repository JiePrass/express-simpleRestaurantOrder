const express = require("express");
const { getMenus, createMenu, deleteMenu, updateMenu } = require("../controllers/menuController");
const upload = require("../middlewares/uploadMiddleware");
const isAdmin = require("../middlewares/isAdminMiddleware")

const router = express.Router();

router.get("/", getMenus);
router.post("/", isAdmin, upload.single("gambar"), createMenu);
router.put("/:id", isAdmin, upload.single("gambar"), updateMenu)
router.delete("/:id", isAdmin, deleteMenu);

module.exports = router;
