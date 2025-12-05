<?php
// controllers/generateZipWithGabaritosController.php

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
require_once(__DIR__ . '/../dao/TurmaDAO.php');
require_once(__DIR__ . '/../dao/AlunoDAO.php');
require_once(__DIR__ . '/../dao/GabaritoDAO.php');
require_once(__DIR__ . '/../dao/ProvasVersoesDAO.php');
require_once(__DIR__ . '/../dao/ProvasVersoesQuestoesDAO.php');
require_once(__DIR__ . '/../dao/questaoDAO.php');
require_once(__DIR__ . '/../lib/GabaritoGenerator.php');

header('Content-Type: application/json; charset=utf-8');

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['erro' => 'Payload JSON inválido']);
    exit;
}

$id_turma = (int)($input['id_turma'] ?? 0);
$id_prova = (int)($input['id_prova'] ?? 0);
$nome_prova = $input['nome_prova'] ?? 'prova';

if ($id_turma <= 0 || $id_prova <= 0) {
    http_response_code(400);
    echo json_encode(['erro' => 'Campos obrigatórios ausentes: id_turma e id_prova']);
    exit;
}

// DAOs
$turmaDAO = new TurmaDAO();
$alunoDAO = new AlunoDAO();
$gabaritoDAO = new GabaritoDAO();
$versaoDAO = new ProvasVersoesDAO();
$gabaritoGenerator = new GabaritoGenerator();

// Buscar turma
$turma = $turmaDAO->getTurmaById($id_turma);
if (!$turma) {
    http_response_code(404);
    echo json_encode(['erro' => 'Turma não encontrada']);
    exit;
}

// Buscar todos os alunos da turma
$alunos = $alunoDAO->AlunosPorTurma($id_turma);
if (empty($alunos)) {
    http_response_code(400);
    echo json_encode(['erro' => 'Nenhum aluno encontrado nesta turma']);
    exit;
}

// Criar diretório temporário
$tempDir = sys_get_temp_dir() . '/sea_gabaritos_' . uniqid();
if (!mkdir($tempDir, 0777, true)) {
    http_response_code(500);
    echo json_encode(['erro' => 'Erro ao criar diretório temporário']);
    exit;
}

try {
    $pdfFiles = [];

    // Gerar gabarito para cada aluno
    foreach ($alunos as $aluno) {
        try {
            // Buscar gabaritos da prova
            $gabaritos = $gabaritoDAO->getGabaritoByProva($id_prova);

            if (empty($gabaritos)) {
                error_log("Nenhum gabarito encontrado para prova {$id_prova}");
                continue;
            }

            // Dados do aluno para o PDF
            $dadosAluno = [
                'nome' => $aluno->getNome(),
                'matricula' => $aluno->getMatricula(),
                'email' => $aluno->getEmail()
            ];

            // Gerar PDF do gabarito
            $pdfPath = $gabaritoGenerator->gerarPDFGabarito(
                $dadosAluno,
                $gabaritos,
                $nome_prova,
                $aluno->getNome(),
                $tempDir
            );

            if ($pdfPath && file_exists($pdfPath)) {
                $pdfFiles[] = $pdfPath;
            }
        } catch (Exception $e) {
            error_log("Erro ao gerar gabarito para aluno {$aluno->getIdAluno()}: " . $e->getMessage());
            continue;
        }
    }

    if (count($pdfFiles) === 0) {
        http_response_code(500);
        echo json_encode(['erro' => 'Nenhum gabarito foi gerado']);
        exit;
    }

    // Criar ZIP com os gabaritos
    $zipFileName = sanitizeFilename('gabaritos_' . $nome_prova . '_' . $turma->getNomeTurma()) . '_' . date('Y-m-d_His') . '.zip';
    $zipPath = sys_get_temp_dir() . '/' . $zipFileName;

    $zip = new ZipArchive();
    if ($zip->open($zipPath, ZipArchive::CREATE | ZipArchive::OVERWRITE) !== true) {
        http_response_code(500);
        echo json_encode(['erro' => 'Erro ao criar arquivo ZIP']);
        exit;
    }

    // Adicionar PDFs ao ZIP
    foreach ($pdfFiles as $filePath) {
        $fileName = basename($filePath);
        $zip->addFile($filePath, $fileName);
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
        'quantidade_gabaritos' => count($pdfFiles),
        'turma' => $turma->getNomeTurma(),
        'serie' => $turma->getSerie()
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
