import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000/api/users';

function App(){
  const [users, setUsers] = useState([]);

  const [formName, setFormName]     = useState('');
  const [formEmail, setFormEmail]   = useState('');

  const [isLoading, setIsLoading]   = useState(true);

  const [error, setError]           = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);


  //get user
  const fetchUsers = async()=>{
    try{
      setIsLoading(true);
      setError(null);

      const response = await fetch(API_URL);
      if(!response.ok){
        throw new Error('Gagal mengambil data dari server');
      }

      const data = await response.json();

      setUsers(data.data);

    }catch(err){
      setError(err.message);
    }finally{
      setIsLoading(false);
    }
  }

  //post user
  const handleSubmit = async(e)=>{
    e.preventDefault();

    if(!formName || !formEmail){
      alert('Nama dan Email tidak boleh kosong');
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify({
          name: formName,
          email: formEmail
        })
      });

      if(!response.ok){
        console.log(response);
        throw new Error('Gagal menambahkan user baru:' + response.message);
      }

      alert('User berhasil ditambahkan!');
      setFormName('');
      setFormEmail('');
      fetchUsers();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto', fontFamily: 'Arial' }}>
      <h1>Manajamen User</h1>
      <p>Terhubung ke API Node.js di <strong>{API_URL}</strong></p>

      <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
        <h2>Tambah User Baru</h2>
        <form onSubmit={handleSubmit}>
          <div style={{marginBottom: '10px'}}>
            <label>Nama: </label>
            <input
              type='text'
              value={formName}
              onChange={(e)=>setFormName(e.target.value)}
              placeholder='Masukan nama'
              style={{width: '300px', padding:'5px'}}
              />
          </div>
          <div style={{marginBottom: '10px'}}>
            <label>Email: </label>
            <input
              type='email'
              value={formEmail}
              onChange={(e)=>setFormEmail(e.target.value)}
              placeholder='Masukan email'
              style={{width: '300px', padding:'5px'}}
              />
          </div>

          <button type="submit" style={{ padding: '8px 15px', cursor: 'pointer', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>Simpan</button>
        </form>
      </div>
    

    <div style={{ marginTop: '30px' }}>
      <h2>Daftar User</h2>
      {isLoading && <p>Loading data dari server...</p>}

      {error && <p style={{color: 'red'}}>Error: {error}</p>}

      {!isLoading && !error && (
        <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>Email</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user)=>
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
    </div>
  );
}

export default App;