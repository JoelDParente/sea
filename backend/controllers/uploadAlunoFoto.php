<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit(); }

if (!isset($_FILES['foto'])) {
    echo json_encode(['error' => 'Nenhuma foto enviada']);
    exit();
}

$arquivo = $_FILES['foto'];
$uploadDir = "../uploads/alunos/";
if (!is_dir($uploadDir)) mkdir($uploadDir, 0777, true);

$ext = strtolower(pathinfo($arquivo['name'], PATHINFO_EXTENSION));
function generate_uuid_v4() {
    $data = random_bytes(16);
    $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
    $data[8] = chr(ord($data[8]) & 0x3f | 0x80);
    return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}

$novoNome = generate_uuid_v4() . '.' . $ext;
$finalPath = $uploadDir . $novoNome;

if (move_uploaded_file($arquivo['tmp_name'], $finalPath)) {
    $url = "http://localhost/sea/backend/uploads/alunos/" . $novoNome;
    echo json_encode(['success'=>true, 'url'=>$url]);
} else {
    echo json_encode(['error' => 'Falha ao mover arquivo']);
}
