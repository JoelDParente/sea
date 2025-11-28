<?php
// controllers/downloadZipController.php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Obter nome do arquivo
$fileName = isset($_GET['file']) ? basename($_GET['file']) : null;

if (!$fileName) {
    http_response_code(400);
    echo 'Arquivo não especificado';
    exit;
}

// Validar nome do arquivo (evitar path traversal)
if (preg_match('/[^a-zA-Z0-9._-]/', $fileName)) {
    http_response_code(400);
    echo 'Nome de arquivo inválido';
    exit;
}

$filePath = sys_get_temp_dir() . '/' . $fileName;

// Verificar se o arquivo existe
if (!file_exists($filePath) || !is_file($filePath)) {
    http_response_code(404);
    echo 'Arquivo não encontrado';
    exit;
}

// Verificar se é um arquivo ZIP
if (pathinfo($filePath, PATHINFO_EXTENSION) !== 'zip') {
    http_response_code(400);
    echo 'Arquivo inválido';
    exit;
}

// Enviar arquivo para download
header('Content-Type: application/zip');
header('Content-Disposition: attachment; filename="' . $fileName . '"');
header('Content-Length: ' . filesize($filePath));
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');

readfile($filePath);

// Limpar arquivo após download (opcional)
// unlink($filePath);

exit;
?>
