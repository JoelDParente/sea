<?php
// controllers/gerarGabaritosController.php
// 
// NOTA: Este controller agora é principalmente chamado por downloadProvasZipController.php
// para gerar gabaritos que serão incluídos no ZIP junto com as provas.
// Retorna um JSON com os caminhos dos arquivos PDFs gerados.

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
require_once(__DIR__ . '/../dao/ProvaDAO.php');
require_once(__DIR__ . '/../dao/ProvaQuestaoDAO.php');
require_once(__DIR__ . '/../dao/alunoDAO.php');
require_once(__DIR__ . '/../models/prova.php');

use Models\Prova;

header('Content-Type: application/json; charset=utf-8');

// Recebe o payload JSON
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    http_response_code(400);
    echo json_encode(['erro' => 'Payload JSON inválido']);
    exit;
}

$required = ['id_prova', 'nome_prova', 'id_turmas'];
foreach ($required as $r) {
    if (!isset($input[$r])) {
        http_response_code(400);
        echo json_encode(['erro' => "Campo obrigatório ausente: $r"]);
        exit;
    }
}

$id_prova = (int)$input['id_prova'];
$nome_prova = $input['nome_prova'];
$id_disciplina = $input['id_disciplina'] ?? null;
$serie = $input['serie'] ?? '';
$nome_professor = $input['nome_professor'] ?? '';
$id_turmas = is_array($input['id_turmas']) ? $input['id_turmas'] : [];

// Criar diretório temporário para os gabaritos
$tempDir = sys_get_temp_dir() . '/sea_gabaritos_' . $id_prova . '_' . uniqid();
if (!mkdir($tempDir, 0777, true)) {
    http_response_code(500);
    echo json_encode(['erro' => 'Erro ao criar diretório temporário para gabaritos']);
    exit;
}

// Ler template HTML (gabarito.html)
$templatePath = __DIR__ . '/../gabarito.html';
if (!file_exists($templatePath)) {
    http_response_code(500);
    echo json_encode(['erro' => 'Template de gabarito não encontrado']);
    exit;
}
$templateHtml = file_get_contents($templatePath);

$alunoDAO = new AlunoDAO();
$gabaritoFiles = [];

try {
    // Para cada turma, buscar alunos e gerar um PDF por aluno
    foreach ($id_turmas as $id_turma) {
        $alunos = $alunoDAO->AlunosPorTurma((int)$id_turma);
        foreach ($alunos as $aluno) {
            // Criar um PDF por aluno
            $pdf = new TCPDF('L', 'mm', 'A5', true, 'UTF-8', false);
            $pdf->SetCreator('SEA');
            $pdf->SetAuthor('SEA');
            $pdf->SetTitle('Gabarito - ' . $aluno->getNome());
            $pdf->SetMargins(5, 5, 5);
            $pdf->SetAutoPageBreak(true, 5);

            // Montar HTML substituindo campos via DOM
            $doc = new DOMDocument();
            libxml_use_internal_errors(true);
            $doc->loadHTML('<?xml encoding="utf-8" ?>' . $templateHtml, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
            libxml_clear_errors();

            // Função helper para setar conteúdo do primeiro elemento por classe
            $xpath = new DOMXPath($doc);
            $setByClass = function($class, $value) use ($xpath) {
                $nodes = $xpath->query("//*[contains(concat(' ', normalize-space(@class), ' '), ' $class ')]");
                if ($nodes && $nodes->length > 0) {
                    $nodes->item(0)->nodeValue = $value;
                }
            };

            // Ajustes básicos
            $setByClass('titulo', $nome_prova);
            $setByClass('nome', 'Nome do participante: ' . $aluno->getNome());
            $setByClass('curso', ($serie ? $serie . ' - ' : '') . ($id_disciplina ?? ''));
            $setByClass('professor-info', 'Professor: ' . $nome_professor);

            // Gerar HTML final
            $htmlAluno = $doc->saveHTML();

            // Adicionar página A5 paisagem e escrever HTML
            $pdf->AddPage('L', 'A5');
            $pdf->writeHTML($htmlAluno, true, false, true, false, '');

            // Gerar QR com id_prova e aluno
            $qrData = json_encode(['id_prova' => $id_prova, 'id_aluno' => $aluno->getIdAluno(), 'nome' => $aluno->getNome()]);
            // Coordenadas aproximadas (mm) para a área .qr na direita
            $x = 160; // ajustar conforme necessário
            $y = 18;
            $size = 20;
            $pdf->write2DBarcode($qrData, 'QRCODE,H', $x, $y, $size, $size, null, 'N');

            // Salvar PDF em arquivo (modo 'F' = file buffer)
            $nomeAlunoSanitizado = preg_replace('/[^a-zA-Z0-9._-]/', '_', $aluno->getNome());
            $fileName = "gabarito_{$nomeAlunoSanitizado}_turma_{$id_turma}.pdf";
            $filePath = $tempDir . '/' . $fileName;

            $pdf->Output($filePath, 'F');

            if (file_exists($filePath)) {
                $gabaritoFiles[] = $filePath;
            } else {
                error_log("Erro ao salvar gabarito: {$filePath}");
            }
        }
    }

    if (count($gabaritoFiles) === 0) {
        http_response_code(500);
        echo json_encode(['erro' => 'Nenhum gabarito foi gerado']);
        exit;
    }

    // Retornar os caminhos dos arquivos gerados
    echo json_encode([
        'sucesso' => true,
        'id_prova' => $id_prova,
        'gabarito_files' => $gabaritoFiles,
        'quantidade_gabaritos' => count($gabaritoFiles),
        'temp_dir' => $tempDir
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['erro' => 'Erro ao gerar gabaritos: ' . $e->getMessage()]);
}

exit;

?>