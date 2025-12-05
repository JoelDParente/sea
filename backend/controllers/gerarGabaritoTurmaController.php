<?php
ob_clean();

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once('../config/database.php');
require_once('../dao/alunoDAO.php');
require_once('../dao/turmaDAO.php');
require_once('../dao/provaDAO.php');
require_once('gabaritoGenerator.php');

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['erro' => 'Payload JSON inválido']);
    exit;
}

$id_turma = $input['id_turma'] ?? null;
$id_prova = $input['id_prova'] ?? null;
$nome_prova = $input['nome_prova'] ?? 'Prova';

if (!$id_turma) {
    http_response_code(400);
    echo json_encode(['erro' => 'Campo obrigatório: id_turma']);
    exit;
}

try {

    $turmaDAO = new TurmaDAO();
    $turma = $turmaDAO->getTurmaById((int)$id_turma);

    if (!$turma) {
        http_response_code(404);
        echo json_encode(['erro' => 'Turma não encontrada']);
        exit;
    }

    $nome_turma = $turma->getNomeTurma() ?? 'Turma Desconhecida';

    $alunoDAO = new AlunoDAO();
    $alunos = $alunoDAO->AlunosPorTurma((int)$id_turma);

    if (empty($alunos)) {
        http_response_code(404);
        echo json_encode(['erro' => 'Nenhum aluno encontrado para esta turma']);
        exit;
    }

    $alunosArray = array_map(function ($a) {
        return [
            'id_aluno' => $a->getIdAluno(),
            'nome' => $a->getNome(),
            'nome_aluno' => $a->getNome(),
            'email' => $a->getEmail(),
            'matricula' => $a->getMatricula()
        ];
    }, $alunos);

    // Gerar PDF
    $generator = new GabaritoGenerator();
    ob_start();
    $generator->gerarGabaritoEmLote($alunosArray, $nome_prova, $nome_turma);

    // O Output() já envia o PDF — fechar imediatamente
    exit;

} catch (Exception $e) {
    error_log("Erro ao gerar gabaritos: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['erro' => 'Erro ao gerar gabaritos: ' . $e->getMessage()]);
    exit;
}