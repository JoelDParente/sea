<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include('../config/database.php');
include('../dao/usuarioDAO.php');

if (!isset($_FILES['foto']) || !isset($_POST['id_usuario'])) {
    echo json_encode(["error" => "Arquivo ou usuário não enviado"]);
    exit();
}

$userId = intval($_POST['id_usuario']);
$arquivo = $_FILES['foto'];

$uploadDir = "../uploads/usuarios/";
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

$ext = strtolower(pathinfo($arquivo['name'], PATHINFO_EXTENSION));
$novoNome = "user_" . $userId . "_" . time() . "." . $ext;
$caminhoFinal = $uploadDir . $novoNome;

// Salvar arquivo
if (move_uploaded_file($arquivo['tmp_name'], $caminhoFinal)) {

    $urlImagem = "http://localhost/sea/backend/uploads/usuarios/" . $novoNome;

    $dao = new UsuarioDAO();
    $dao->atualizarFoto($userId, $urlImagem);

    echo json_encode([
        "success" => true,
        "url" => $urlImagem
    ]);
} else {
    echo json_encode(["error" => "Falha ao mover arquivo"]);
}