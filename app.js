require("dotenv").config();
const express = require("express");
const path = require("path");

const authRoutes = require("./src/routes/auth");
const menuRoutes = require("./src/routes/menu");
const pesananRoutes = require("./src/routes/pesanan");

const app = express();
const sequelize = require("./src/config/db");

// Sinkronisasi database
sequelize.sync({ force: false })
    .then(() => console.log("Model telah disinkronisasi!"))
    .catch((err) => console.error("Sinkronisasi gagal:", err));

// Middleware untuk parsing JSON
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/auth", authRoutes);
app.use("/menu", menuRoutes);
app.use("/pesanan", pesananRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
