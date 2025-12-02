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

$required = ['nome_prova', 'serie', 'questoes', 'qtd_versoes'];
foreach ($required as $r) {
    if (!isset($input[$r])) {
        http_response_code(400);
        echo json_encode(['erro' => "Campo obrigatório ausente: $r"]);
        exit;
    }
}

$nome_prova = $input['nome_prova'];
$id_disciplina = $input['id_disciplina'];
$serie = $input['serie'];
$questoes = is_array($input['questoes']) ? $input['questoes'] : [];
$qtd_versoes = (int) $input['qtd_versoes'];
$id_professor = $input['id_professor'] ?? null;
$nome_professor = $input['nome_professor'] ?? null;

if ($qtd_versoes < 1) $qtd_versoes = 1;

$colors = ['Azul', 'Amarelo', 'Verde', 'Branco'];

if ($qtd_versoes > count($colors)) {
    $qtd_versoes = count($colors);
}

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
$prova->setIdDisciplina($id_disciplina ?? 0);
$prova->setTitulo($nome_prova);
$prova->setSerie($serie);
$prova->setVersao($colors[$qtd_versoes - 1]);
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

$resultVersoes = [];

for ($i = 0; $i < $qtd_versoes; $i++) {
    // usa o nome da cor como código da versão
    $codigo = $colors[$i];

    // criar registro de versao
    $versao = new ProvasVersoes();
    $versao->setIdProva($id_prova);
    $versao->setCodigoVersao($codigo);
    $id_versao = $versaoDAO->criarVersao($versao);

    // embaralhar questões e inserir na versao
    $embaralhado = $questoes;
    shuffle($embaralhado);
    $ordem = 1;
    foreach ($embaralhado as $qid) {
        $pvq = new ProvasVersoesQuestoes();
        $pvq->setIdVersao($id_versao);
        $pvq->setIdQuestao($qid);
        $pvq->setOrdem($ordem++);
        $versaoQuestoesDAO->adicionarQuestao($pvq);
    }

    // monta URL do PDF (gera via gerarPdfVersaoController.php)
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

    $resultVersoes[] = [
        'id_versao' => $id_versao,
        'codigo_versao' => $codigo,
        'url_pdf' => $pdfUrl
    ];
}

$urlDownloadZip = "http://localhost/sea/backend/controllers/downloadProvasZipController.php";

echo json_encode([
    'sucesso' => true, 
    'id_prova' => $id_prova, 
    'versoes' => $resultVersoes,
    'url_download_zip' => $urlDownloadZip,
    'payload_zip' => [
        'id_prova' => $id_prova,
        'nome_prova' => $nome_prova,
        'id_disciplina' => $id_disciplina,
        'serie' => $serie,
        'nome_professor' => $nome_professor,
        'versoes' => $resultVersoes
    ]
]);
exit;

?>