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
require_once(__DIR__ . '/../dao/TurmaDAO.php');
require_once(__DIR__ . '/../dao/AlunoDAO.php');
require_once(__DIR__ . '/../dao/GabaritoDAO.php');
require_once(__DIR__ . '/../lib/GabaritoGenerator.php');

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
$id_turma = (int)($input['id_turma'] ?? 0); // novo parâmetro para gabaritos

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
$turmaDAO = new TurmaDAO();
$alunoDAO = new AlunoDAO();
$gabaritoDAO = new GabaritoDAO();
$gabaritoGenerator = new GabaritoGenerator();

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

    // Gerar gabaritos se id_turma foi fornecido
    $gabaritoFiles = [];
    if ($id_turma > 0) {
        try {
            $turma = $turmaDAO->getTurmaById($id_turma);
            if ($turma) {
                $alunos = $alunoDAO->AlunosPorTurma($id_turma);
                $gabaritos = $gabaritoDAO->getGabaritoByProva($id_prova);

                if (!empty($alunos) && !empty($gabaritos)) {
                    // Criar subdiretório para gabaritos
                    $gabaritoDir = $tempDir . '/gabaritos';
                    if (!mkdir($gabaritoDir, 0777, true)) {
                        error_log("Erro ao criar diretório de gabaritos");
                    } else {
                        foreach ($alunos as $aluno) {
                            try {
                                $dadosAluno = [
                                    'nome' => $aluno->getNome(),
                                    'matricula' => $aluno->getMatricula(),
                                    'email' => $aluno->getEmail()
                                ];

                                $gabPdfPath = $gabaritoGenerator->gerarPDFGabarito(
                                    $dadosAluno,
                                    $gabaritos,
                                    $nome_prova,
                                    $aluno->getNome(),
                                    $gabaritoDir
                                );

                                if ($gabPdfPath && file_exists($gabPdfPath)) {
                                    $gabaritoFiles[] = $gabPdfPath;
                                }
                            } catch (Exception $e) {
                                error_log("Erro ao gerar gabarito para aluno {$aluno->getId()}: " . $e->getMessage());
                            }
                        }
                    }
                }
            }
        } catch (Exception $e) {
            error_log("Erro ao processar gabaritos: " . $e->getMessage());
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
    
    // Adicionar PDFs ao ZIP
    foreach ($pdfFiles as $filePath) {
        $fileName = basename($filePath);
        $zip->addFile($filePath, $fileName);
    }

    // Adicionar gabaritos ao ZIP (em subpasta se existirem)
    if (!empty($gabaritoFiles)) {
        foreach ($gabaritoFiles as $filePath) {
            $fileName = basename($filePath);
            $zip->addFile($filePath, 'gabaritos/' . $fileName);
        }
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
        'quantidade_gabaritos' => count($gabaritoFiles)
    ]);} catch (Exception $e) {
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
