const express = require('express');
const cors = require('cors'); // <-- DITAMBAHKAN
const app = express();
const PORT = 3000;

// --- MIDDLEWARE ---
app.use(cors()); // <-- DITAMBAHKAN
app.use(express.json());

// Custom Logger
app.use((req, res, next) => { // <-- DITAMBAHKAN
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});

// Database Palsu
let users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
];



// --- RUTE API ---

// GET /api/users (Sudah OK)
app.get('/api/users', async (req, res) => { // <-- 1. Tambah 'async'
    try {
       
        const allUsers = await User.findAll(); // 2. Gunakan Sequelize untuk ambil semua user
        res.status(200).json({ // 3. Kirim respon sukses
        message: 'Berhasil mengambil semua user dari database',
        data: allUsers,
        });
    
    } catch (error) { // 4. Tangkap jika ada error koneksi/kueri
        res.status(500).json({
            message: 'Terjadi kesalahan saat mengambil data user',
            error: error.message,
        });
    }
});


// POST /api/users (Status Code diperbaiki)
app.post('/api/users', async (req, res) => { 
    // <-- 1. Tambah 'async'
    try {
        // 2. Ambil name & email dari body
        const { name, email } = req.body;
        console.log(req.body);

        // 3. Simpan ke database menggunakan Sequelize
        //    Tidak perlu 'id', 'createdAt', 'updatedAt'. Semuanya otomatis.
        const newUser = await User.create({
            name: name,
            email: email
        });
        
        // 4. Kirim respon sukses (sesuai standar RESTful)
        res.status(201).json({
        message: 'User baru berhasil ditambahkan ke database',
        data: newUser,
        });

    } catch (error) { // 5. Tangkap error (misal: email duplikat, validasi gagal)
        res.status(500).json({
        message: 'Terjadi kesalahan saat menambahkan user',
        error: error.message,
        });
    }
});


// GET /api/users/:id (Status Code diperbaiki)
app.get('/api/users/:id', async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const user = await User.findByPk(userId); 
        if (user === null) {
            return res.status(404).json({ 
            status: 'error',
            message: 'User tidak ditemukan',
            });
        }

        res.status(200).json({ 
            status: 'success',
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Terjadi kesalahan saat mengambil data user',
            error: error.message,
        });
    }
});

// PUT /api/users/:id (Status Code diperbaiki)
app.put('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ // <-- DIPERBAIKI (404 Not Found)
        status: 'error',
        message: 'User tidak ditemukan',
        });
    }
  // ... (response sukses sudah OK)
});

app.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ // <-- DIPERBAIKI (404 Not Found)
        status: 'error',
        message: 'User tidak ditemukan',
        });
    }

    users.splice(userIndex, 1);

    res.status(204).send(); // <-- DIPERBAIKI (204 No Content)
});



const sequelize = require('./config/database');
const User = require('./models/UserModel');

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('Koneksi ke database berhasil.');
        await sequelize.sync(); 
        app.listen(PORT, () => {
            console.log(`Server Express berjalan di http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Gagal terkoneksi ke database:', error);
    }
}

startServer();