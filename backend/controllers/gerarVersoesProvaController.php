<?php
// controllers/gerarVersoesProvaController.php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once('../config/database.php');
require_once('../dao/ProvaDAO.php');
require_once('../dao/ProvaQuestaoDAO.php');
require_once('../dao/ProvasVersoesDAO.php');
require_once('../dao/ProvasVersoesQuestoesDAO.php');
require_once('../models/prova.php');
require_once('../models/provaQuestao.php');
require_once('../models/ProvasVersoes.php');
require_once('../models/ProvasVersoesQuestoes.php');

use Models\Prova;
use Models\ProvaQuestao;
use Models\ProvasVersoes;
use Models\ProvasVersoesQuestoes;

header('Content-Type: application/json; charset=utf-8');

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['erro' => 'Payload JSON inválido']);
    exit;
}

$required = ['nome_prova', 'serie', 'questoes', 'versions_count'];
foreach ($required as $r) {
    if (!isset($input[$r])) {
        http_response_code(400);
        echo json_encode(['erro' => "Campo obrigatório ausente: $r"]);
        exit;
    }
}

$nome_prova = $input['nome_prova'];
$serie = $input['serie'];
$questoes = is_array($input['questoes']) ? $input['questoes'] : [];
$versions_count = (int) $input['versions_count'];
$id_professor = $input['id_professor'] ?? null;

if ($versions_count < 1) $versions_count = 1;
if ($versions_count > 4) $versions_count = 4; // limite

if (count($questoes) === 0) {
    http_response_code(400);
    echo json_encode(['erro' => 'Nenhuma questão informada']);
    exit;
}

$provaDAO = new ProvaDAO();
$provaQuestaoDAO = new ProvaQuestaoDAO();
$versaoDAO = new ProvasVersoesDAO();
$versaoQuestoesDAO = new ProvasVersoesQuestoesDAO();

// criar prova
$prova = new Prova();
$prova->setIdProfessor($id_professor ?? 0);
$prova->setTitulo($nome_prova);
$prova->setVersao($serie);
$now = date('Y-m-d H:i:s');
$prova->setDataCriacao($now);
$prova->setUltimaAtualizacao($now);

$id_prova = $provaDAO->criarProva($prova);
if (!$id_prova) {
    http_response_code(500);
    echo json_encode(['erro' => 'Erro ao criar prova temporária']);
    exit;
}

// associar questões à prova
foreach ($questoes as $q) {
    $pq = new ProvaQuestao();
    $pq->setIdProva($id_prova);
    $pq->setIdQuestao($q);
    $provaQuestaoDAO->criarProvaQuestao($pq);
}

$letters = ['A','B','C','D'];
$resultVersoes = [];

for ($i = 0; $i < $versions_count; $i++) {
    $codigo = $letters[$i] ?? ('V' . ($i+1));

    // criar registro de versao
    $versao = new ProvasVersoes();
    $versao->setIdProva($id_prova);
    $versao->setCodigoVersao($codigo);
    $id_versao = $versaoDAO->criarVersao($versao);

    // embaralhar questões e inserir na versao
    $shuffled = $questoes;
    shuffle($shuffled);
    $ordem = 1;
    foreach ($shuffled as $qid) {
        $pvq = new ProvasVersoesQuestoes();
        $pvq->setIdVersao($id_versao);
        $pvq->setIdQuestao($qid);
        $pvq->setOrdem($ordem++);
        $versaoQuestoesDAO->adicionarQuestao($pvq);
    }

    $resultVersoes[] = [
        'id_versao' => $id_versao,
        'codigo_versao' => $codigo,
        'url_pdf' => "http://localhost/sea/backend/controllers/gerarPdfVersaoController.php?id_versao={$id_versao}"
    ];
}

echo json_encode(['sucesso' => true, 'id_prova' => $id_prova, 'versoes' => $resultVersoes]);
exit;

?>
