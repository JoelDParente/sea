<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../config/database.php';

use Dompdf\Dompdf;
use Dompdf\Options;

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["erro" => "Método não permitido"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data["id_prova"])) {
    http_response_code(400);
    echo json_encode(["erro" => "id_prova obrigatório"]);
    exit;
}

$id_prova = intval($data["id_prova"]);

// carregar template do gabarito
$templatePath = __DIR__ . '/../gabarito.html';
if (!file_exists($templatePath)) {
    http_response_code(500);
    echo json_encode(["erro" => "Template gabarito.html não encontrado"]);
    exit;
}

$templateHtml = file_get_contents($templatePath);

// criar pasta temporária
$tempDir = sys_get_temp_dir() . '/sea_gabaritos_' . $id_prova . '_' . uniqid();
if (!mkdir($tempDir, 0777, true)) {
    http_response_code(500);
    echo json_encode(["erro" => "Erro ao criar diretório temporário"]);
    exit;
}

try {
    $options = new Options();
    $options->set('isRemoteEnabled', true);
    $options->set('isHtml5ParserEnabled', true);

    $dompdf = new Dompdf($options);
    $dompdf->setPaper('A4', 'landscape');
    $dompdf->loadHtml($templateHtml, "UTF-8");
    $dompdf->render();

    // salvar arquivo
    $fileName = "gabarito_{$id_prova}.pdf";
    $filePath = $tempDir . '/' . $fileName;

    if (file_put_contents($filePath, $dompdf->output()) === false) {
        http_response_code(500);
        echo json_encode(["erro" => "Erro ao salvar PDF do gabarito"]);
        exit;
    }

    // retorno limpo
    echo json_encode([
        "sucesso" => true,
        "gabarito_file" => $filePath,
        "temp_dir" => $tempDir
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["erro" => "Erro ao gerar gabarito: " . $e->getMessage()]);
}

exit;
