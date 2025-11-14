<?php
header('Content-Type: application/json');

$books = [
    1 => ['title'=>'Belajar Pemprograman PHP', 'author' => 'Budi Raharjo'],
    2 => ['title'=>'Panduan Jaringan Komputer', 'author' => 'Andi Susanto'],
    3 => ['title'=>'Dasar-dasar Desain Grafis', 'author' => 'Citra Lestari']
];

// echo json_encode(['message'=>'API is ready']);



$method = $_SERVER['REQUEST_METHOD'];
if($method === 'GET'){
    if(isset($_GET['id'])){
        $id = intval($_GET['id']);
        if(isset($books[$id])){
            $response = $books[$id];
        }else{
            http_response_code(404);
            $response = ['message' => "Buku tidak ditemukan."];
        }
    }else{
        $response = $books;
    }
}elseif($method === 'POST'){


    
}
else{
    http_response_code(405);
    $response = ['message' => "Metode $method tidak diizinkan"];
}

echo json_encode($response);
?>