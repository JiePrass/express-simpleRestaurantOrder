# 📌 API Pemesanan Makanan
API ini digunakan untuk sistem pemesanan makanan di restoran dengan fitur pemesanan, melihat status pesanan, update status, dan riwayat pesanan.

## 🛠️ Teknologi yang Digunakan
- **Backend:** Express.js
- **Database:** MySQL dengan Sequelize ORM

## 🔧 Instalasi dan Menjalankan Server
1. **Clone repository:**
   ```bash
   git clone https://github.com/JiePrass/express-simpleRestaurantOrder
   cd express-simpleRestaurantOrder
   ```
2. **Install dependencies:**
   ```bash
   pnpm install
   ```
3. **Konfigurasi database:**
   - Edit file `.env` dengan konfigurasi database MySQL
4. **Jalankan server:**
   ```bash
   pnpm run dev
   ```

## 🔗 Endpoints
### **1. Pesanan (Order)**
#### 📌 **Buat Pesanan**
- **URL:** `POST /pesanan`
- **Request Body:**
  ```json
  {
    "nomor_meja": 5,
    "items": [
      { "id_menu": 1, "jumlah": 2 },
      { "id_menu": 3, "jumlah": 1 }
    ]
  }
  ```
- **Response Sukses:**
  ```json
  {
    "message": "Pesanan berhasil dibuat!",
    "pesanan": {...}
  }
  ```

#### 📌 **Melihat Pesanan yang Belum Selesai**
- **URL:** `GET /pesanan`
- **Response:**
  ```json
  [
    {
      "id": 1,
      "nomor_meja": 5,
      "total_harga": 50000,
      "status": "Menunggu Pembayaran",
      "waktu_pemesanan": "2024-03-15T12:00:00Z"
    }
  ]
  ```

#### 📌 **Melihat Riwayat Pesanan**
- **URL:** `GET /pesanan/riwayat`
- **Response:**
  ```json
  [
    {
      "id": 1,
      "nomor_meja": 5,
      "total_harga": 50000,
      "status": "Selesai",
      "waktu_pemesanan": "2024-03-14T12:00:00Z"
    }
  ]
  ```

#### 📌 **Melihat Detail Pesanan**
- **URL:** `GET /pesanan/:id_pesanan`
- **Response:**
  ```json
  [
    {
      "id_pesanan": 1,
      "id_menu": 2,
      "jumlah": 2,
      "harga_satuan": 15000,
      "total_harga": 30000,
      "Menu": {
        "id": 2,
        "nama": "Ayam Goreng",
        "deskripsi": "Ayam goreng crispy",
        "harga": 15000
      }
    }
  ]
  ```

#### 📌 **Update Status Pesanan**
- **URL:** `PUT /pesanan/:id`
- **Request Body:**
  ```json
  {
    "status": "Selesai"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Status pesanan diperbarui!",
    "pesanan": {...}
  }
  ```

#### 📌 **Hapus Pesanan**
- **URL:** `DELETE /pesanan/:id`
- **Response:**
  ```json
  {
    "message": "Pesanan berhasil dihapus!"
  }
  ```

### **2. Menu**
#### 📌 **Melihat Daftar Menu**
- **URL:** `GET /menu`
- **Response:**
  ```json
  [
    {
      "id": 1,
      "nama": "Es Cendol",
      "deskripsi": "Minuman segar dengan santan",
      "harga": 13000,
      "kategori": "Minuman",
      "gambar": "/uploads/cendol.jpg"
    }
  ]
  ```

#### 📌 **Menambahkan Menu Baru**
- **URL:** `POST /menu`
- **Request Body:**
  ```json
  {
    "nama": "Nasi Goreng",
    "deskripsi": "Nasi goreng spesial",
    "harga": 25000,
    "kategori": "Makanan"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Menu berhasil ditambahkan!",
    "menu": {...}
  }
  ```

#### 📌 **Mengupdate Menu**
- **URL:** `PUT /menu/:id`
- **Request Body:**
  ```json
  {
    "nama": "Nasi Goreng Pedas",
    "harga": 27000
  }
  ```
- **Response:**
  ```json
  {
    "message": "Menu berhasil diperbarui!",
    "menu": {...}
  }
  ```

#### 📌 **Menghapus Menu**
- **URL:** `DELETE /menu/:id`
- **Response:**
  ```json
  {
    "message": "Menu berhasil dihapus!"
  }
  ```

## 🛡️ Middleware Keamanan
- **`isKasirMiddleware`**: Hanya kasir yang dapat mengakses pesanan dan mengubah statusnya.
- **`isAdminMiddleware`**: Hanya Admin yang dapat membuat, mengubah, dan menghapus menu.

## 🎯 Catatan
- API ini menggunakan `Sequelize` untuk ORM dan `MySQL` sebagai database.
- Semua endpoint yang memodifikasi data membutuhkan **role Kasir** & **role Admin**.
- Gambar menu disimpan di direktori `/uploads`.

🚀 **Selamat Mengembangkan!**

