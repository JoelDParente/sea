<?php
// controllers/provasVersoesController.php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once('../config/database.php');
require_once('../dao/ProvasVersoesDAO.php');
require_once('../dao/ProvasVersoesQuestoesDAO.php');
require_once('../models/ProvasVersoes.php');
require_once('../models/ProvasVersoesQuestoes.php');
require_once('../dao/questaoDAO.php'); // para pegar questões da prova

use Models\ProvasVersoes;
use Models\ProvasVersoesQuestoes;

header('Content-Type: application/json; charset=utf-8');

$metodo = $_SERVER['REQUEST_METHOD'];
$versaoDAO = new ProvasVersoesDAO();
$versaoQuestoesDAO = new ProvasVersoesQuestoesDAO();
$questaoDAO = new QuestaoDAO();

switch ($metodo) {

    // 🔹 CRIAR NOVA VERSÃO DA PROVA (com sorteio de ordem)
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);

        if (!$data || !isset($data['id_prova'], $data['codigo_versao'])) {
            http_response_code(400);
            echo json_encode(['erro' => 'Campos obrigatórios: id_prova e codigo_versao']);
            exit;
        }

        $id_prova = $data['id_prova'];
        $codigo_versao = $data['codigo_versao'];

        // ➤ buscar questões da prova base
        $questoes = $questaoDAO->listarQuestoesPorProva($id_prova);

        if (!$questoes || count($questoes) === 0) {
            http_response_code(404);
            echo json_encode(['erro' => 'Nenhuma questão encontrada para esta prova']);
            exit;
        }

        // ➤ criar registro da versão
        $versao = new ProvasVersoes();
        $versao->setIdProva($id_prova);
        $versao->setCodigoVersao($codigo_versao);

        $id_versao = $versaoDAO->criarVersao($versao);

        if (!$id_versao) {
            http_response_code(500);
            echo json_encode(['erro' => 'Erro ao criar versão da prova']);
            exit;
        }

        // ➤ embaralhar ordem das questões
        shuffle($questoes);

        // ➤ inserir questões da versão
        $ordem = 1;
        foreach ($questoes as $q) {
            $vq = new ProvasVersoesQuestoes();
            $vq->setIdVersao($id_versao);
            $vq->setIdQuestao($q['id_questao']);
            $vq->setOrdem($ordem++);

            $versaoQuestoesDAO->adicionarQuestao($vq);
        }

        echo json_encode([
            'sucesso' => true,
            'mensagem' => 'Versão criada com sucesso',
            'id_versao' => $id_versao
        ]);
        break;

    // 🔹 LISTAR VERSÕES DE UMA PROVA
    case 'GET':

        // listar questões de uma versão
        if (isset($_GET['id_versao'])) {
            $id_versao = (int) $_GET['id_versao'];
            $questoes = $versaoQuestoesDAO->listarQuestoesDaVersao($id_versao);
            echo json_encode($questoes);
            exit;
        }

        // listar versões de uma prova específica
        if (isset($_GET['id_prova'])) {
            $id_prova = (int) $_GET['id_prova'];
            $versoes = $versaoDAO->listarPorProva($id_prova);
            echo json_encode($versoes);
            exit;
        }

        http_response_code(400);
        echo json_encode(['erro' => 'Informe id_prova ou id_versao']);
        break;

    // 🔹 EXCLUIR UMA VERSÃO
    case 'DELETE':
        if (!isset($_GET['id_versao'])) {
            http_response_code(400);
            echo json_encode(['erro' => 'Parâmetro obrigatório: id_versao']);
            exit;
        }

        $id_versao = (int) $_GET['id_versao'];

        $removido = $versaoDAO->excluirVersao($id_versao);

        if ($removido) {
            echo json_encode(['sucesso' => true, 'mensagem' => 'Versão removida com sucesso']);
        } else {
            http_response_code(500);
            echo json_encode(['erro' => 'Erro ao remover versão']);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['erro' => 'Método não permitido']);
        break;
}
?>
