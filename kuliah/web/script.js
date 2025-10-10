console.log("Script dari script.js berhasil dijalankan");

function sapa(nama){
    let pesan = "Halo, " + nama + "! Apa kabar?";
    return pesan;
}

let ucapanUntukBudi = sapa("Budi");
console.log(ucapanUntukBudi);

let ucapanUntukAni = sapa("Ani");
console.log(ucapanUntukAni);

const judul=document.getElementById('judul-utama');
console.log(judul); 

const infoPertama = document.querySelector('.info');
console.log(infoPertama);

const semuaInfo = document.querySelectorAll('.info');
console.log(semuaInfo);

judul.innerText = "Selamat Datang di Dunia DOM";

const divInfo = document.querySelector('div.info');
divInfo.innerHTML = "<strong>Teks ini sekarang tebal!</strong>";

judul.style.color = 'blue';
judul.style.backgroundColor = 'lightgray';
judul.style.padding = '15px';
judul.style.textAlign = 'center';

const kotak = document.getElementById('kotak');
const tombolReset = document.getElementById('tombol-reset');

kotak.addEventListener('click', function(){
    kotak.innerText = "Anda baru saja mengklik saya!";
    kotak.style.backgroundColor = 'lightgreen';
})

kotak.addEventListener('mouseover', function(){
    kotak.style.fontWeight = 'bold';
})

kotak.addEventListener('mouseout', function(){
    kotak.style.fontWeight = 'normal';
})

tombolReset.addEventListener('click', function(){
    kotak.innerText='Arahkan mouse ke sini atau klik saya!';
    kotak.style.backgroundColor = 'white';
})