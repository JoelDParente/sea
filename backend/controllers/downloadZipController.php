<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$fileName = isset($_GET['file']) ? basename($_GET['file']) : null;

if (!$fileName) {
    http_response_code(400);
    echo 'Arquivo não especificado';
    exit;
}

if (preg_match('/[^a-zA-Z0-9._-]/', $fileName)) {
    http_response_code(400);
    echo 'Nome de arquivo inválido';
    exit;
}

$filePath = sys_get_temp_dir() . '/' . $fileName;

if (!file_exists($filePath) || !is_file($filePath)) {
    http_response_code(404);
    echo 'Arquivo não encontrado';
    exit;
}

if (pathinfo($filePath, PATHINFO_EXTENSION) !== 'zip') {
    http_response_code(400);
    echo 'Arquivo inválido';
    exit;
}

header('Content-Type: application/zip');
header('Content-Disposition: attachment; filename="' . $fileName . '"');
header('Content-Length: ' . filesize($filePath));
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');

readfile($filePath);


exit;
?>
