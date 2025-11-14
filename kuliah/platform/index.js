const express = require('express');

const app = express();
app.use(express.json());
const PORT = 3000;

let users = [
    {id:1, name:'Alice', email:"alice@example.com"},
    {id:2, name:'Bob', email:'bob@example.com'}
];

app.get('/', (req, res) => {
    res.send('Halo! Ini halaman utama (dibuat dengan express)');
});

app.get('/about', (req, res) => {
    res.send('Ini halaman About');
});

//tambah route baru
app.get('/api/users', (req, res) => {
    res.status(201).json({
        status: 'success',
        message: 'User baru berhasil ditambahkan',
        data:users
    });
});

app.post('/api/users', (req, res) => {
    const newUser = req.body;

    newUser.id = users.length + 1;
    users.push(newUser);

    res.status(201).json({
        status: 'success',
        message: 'User baru berhasil ditambahkan',
        data:newUser
    });
});

app.get('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);

    if((!user)){
        return res.status(404).json({
            status:'error',
            message:'User tidak ditemukan'
        });
    }

    res.json({
        status:'success',
        message:'Data user ditemukan',
        data: user
    });
});

app.put('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);

    if(userIndex === -1){
        return res.status(404).json({
            status:'error',
            mesasge:'User tidak ditemukan'
        });
    }

    const updateData = req.body;

    users[userIndex] = { ...users[userIndex], ...updateData};

    res.json({
        status:'success',
        message:'Data berhasil diperbaharui',
        data:users[userIndex]
    });
})

app.listen(PORT, () => {
    console.log(`Server Express berjalan di http://localhost:${PORT}`);
});
