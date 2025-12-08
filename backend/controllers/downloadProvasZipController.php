<?php
// controllers/downloadProvasZipController.php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once(__DIR__ . '/../vendor/autoload.php');
require_once(__DIR__ . '/../config/database.php');
require_once(__DIR__ . '/../dao/ProvasVersoesDAO.php');
require_once(__DIR__ . '/../dao/ProvasVersoesQuestoesDAO.php');
require_once(__DIR__ . '/../dao/questaoDAO.php');
require_once(__DIR__ . '/../dao/alternativasDAO.php');
require_once(__DIR__ . '/../dao/disciplinaDAO.php');

header('Content-Type: application/json; charset=utf-8');

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['erro' => 'Payload JSON inválido']);
    exit;
}

$required = ['id_prova', 'versoes'];
foreach ($required as $r) {
    if (!isset($input[$r])) {
        http_response_code(400);
        echo json_encode(['erro' => "Campo obrigatório ausente: $r"]);
        exit;
    }
}

$id_prova = (int)$input['id_prova'];
$versoes = is_array($input['versoes']) ? $input['versoes'] : [];
$nome_prova = $input['nome_prova'] ?? 'prova';
$id_disciplina = $input['id_disciplina'] ?? null;
$serie = $input['serie'] ?? null;
$nome_professor = $input['nome_professor'] ?? null;
$id_turmas = isset($input['id_turmas']) && is_array($input['id_turmas']) ? $input['id_turmas'] : [];

if (count($versoes) === 0) {
    http_response_code(400);
    echo json_encode(['erro' => 'Nenhuma versão informada']);
    exit;
}

// DAOs
$versaoDAO = new ProvasVersoesDAO();
$versaoQuestoesDAO = new ProvasVersoesQuestoesDAO();
$questaoDAO = new QuestaoDAO();
$alternativaDAO = new AlternativaDAO();
$disciplinaDAO = new DisciplinaDAO();

// Criar diretório temporário para os PDFs
$tempDir = sys_get_temp_dir() . '/sea_provas_' . uniqid();
if (!mkdir($tempDir, 0777, true)) {
    http_response_code(500);
    echo json_encode(['erro' => 'Erro ao criar diretório temporário']);
    exit;
}

try {
    // Gerar cada PDF e salvar no diretório temporário
    $pdfFiles = [];
    
    foreach ($versoes as $versaoData) {
        $id_versao = (int)$versaoData['id_versao'];
        $codigo_versao = sanitizeFilename($versaoData['codigo_versao'] ?? 'versao');
        
        // Construir URL do PDF
        $pdfUrl = "http://localhost/sea/backend/controllers/gerarPdfVersaoController.php?id_versao={$id_versao}";
        if (!empty($id_disciplina)) {
            $pdfUrl .= '&id_disciplina=' . rawurlencode($id_disciplina);
        }
        if (!empty($serie)) {
            $pdfUrl .= '&serie=' . rawurlencode($serie);
        }
        if (!empty($nome_professor)) {
            $pdfUrl .= '&nome_professor=' . rawurlencode($nome_professor);
        }
        if (!empty($nome_prova)) {
            $pdfUrl .= '&nome_prova=' . rawurlencode($nome_prova);
        }
        
        // Baixar PDF
        $pdfContent = @file_get_contents($pdfUrl);
        if ($pdfContent === false) {
            error_log("Erro ao baixar PDF da versão {$id_versao}");
            continue;
        }
        
        // Salvar PDF no diretório temporário
        $fileName = "prova_versao_{$codigo_versao}.pdf";
        $filePath = $tempDir . '/' . $fileName;
        
        if (file_put_contents($filePath, $pdfContent) === false) {
            error_log("Erro ao salvar PDF: {$filePath}");
            continue;
        }
        
        $pdfFiles[] = $filePath;
    }
    
    if (count($pdfFiles) === 0) {
        http_response_code(500);
        echo json_encode(['erro' => 'Nenhum PDF foi gerado']);
        exit;
    }

    // Gerar gabarito genérico
    $gabaritoFile = null;
    $payloadGabarito = [
        'id_prova' => $id_prova
    ];

    // Chamar controller de gabarito via HTTP POST
    $contextOptions = [
        'http' => [
            'method' => 'POST',
            'header' => 'Content-Type: application/json\r\n',
            'content' => json_encode($payloadGabarito),
            'timeout' => 30
        ]
    ];
    $context = stream_context_create($contextOptions);
    $gabaritosUrl = 'http://localhost/sea/backend/controllers/gerarGabaritosController.php';
    $gabaritosResponse = @file_get_contents($gabaritosUrl, false, $context);

    if ($gabaritosResponse !== false) {
        $gabaritosData = json_decode($gabaritosResponse, true);
        if ($gabaritosData && isset($gabaritosData['sucesso']) && $gabaritosData['sucesso'] && isset($gabaritosData['gabarito_file'])) {
            $gabaritoFile = $gabaritosData['gabarito_file'];
        }
    }

    // Criar ZIP com os PDFs
    $zipFileName = sanitizeFilename($nome_prova) . '_' . date('Y-m-d_His') . '.zip';
    $zipPath = sys_get_temp_dir() . '/' . $zipFileName;
    
    $zip = new ZipArchive();
    if ($zip->open($zipPath, ZipArchive::CREATE | ZipArchive::OVERWRITE) !== true) {
        http_response_code(500);
        echo json_encode(['erro' => 'Erro ao criar arquivo ZIP']);
        exit;
    }
    
    // Adicionar PDFs de provas ao ZIP
    foreach ($pdfFiles as $filePath) {
        $fileName = basename($filePath);
        $zip->addFile($filePath, $fileName);
    }

    // Adicionar gabarito ao ZIP (se foi gerado com sucesso)
    if ($gabaritoFile && file_exists($gabaritoFile)) {
        $fileName = basename($gabaritoFile);
        $zip->addFile($gabaritoFile, 'gabarito.pdf');
    }

    $zip->close();
    
    // Verificar se o ZIP foi criado
    if (!file_exists($zipPath)) {
        http_response_code(500);
        echo json_encode(['erro' => 'Erro ao finalizar arquivo ZIP']);
        exit;
    }
    
    // Retornar URL de download
    $downloadUrl = "http://localhost/sea/backend/controllers/downloadZipController.php?file=" . urlencode($zipFileName);

    echo json_encode([
        'sucesso' => true,
        'url_download' => $downloadUrl,
        'arquivo' => $zipFileName,
        'quantidade_pdfs' => count($pdfFiles),
        'com_gabarito' => ($gabaritoFile ? true : false),
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['erro' => 'Erro ao processar: ' . $e->getMessage()]);
} finally {
    // Limpar diretório temporário (opcional: manter PDFs por alguns minutos)
    // removerDiretorio($tempDir);
}

exit;

function sanitizeFilename($filename) {
    $filename = preg_replace('/[^a-zA-Z0-9._-]/', '_', $filename);
    return trim($filename, '._-');
}

function removerDiretorio($dir) {
    if (is_dir($dir)) {
        $files = scandir($dir);
        foreach ($files as $file) {
            if ($file != "." && $file != "..") {
                $path = $dir . '/' . $file;
                is_dir($path) ? removerDiretorio($path) : unlink($path);
            }
        }
        rmdir($dir);
    }
}
?>
