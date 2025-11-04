<?php
// controllers/QuestaoController.php
require_once __DIR__ . '/../dao/QuestaoDAO.php';
require_once __DIR__ . '/../models/questao.php';

use Models\Questao;

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Previne erro no OPTIONS (CORS pré-flight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$dao = new QuestaoDAO();

// Função utilitária
function getInputData() {
    return json_decode(file_get_contents("php://input"), true);
}

$method = $_SERVER['REQUEST_METHOD'];

try {
    switch ($method) {
        case 'POST': // Criar questão
            $data = getInputData();
            $questao = new Questao();

            $questao->setIdAssunto($data['id_assunto'] ?? null)
                    ->setIdProfessor($data['uid_professor'] ?? null)
                    ->setEnunciado($data['enunciado'])
                    ->setRespostaCorreta($data['resposta_correta'])
                    ->setTipo($data['tipo'] ?? 'objetiva')
                    ->setPublico($data['publico'] ?? true)
                    ->setDataCriacao(date('Y-m-d H:i:s'))
                    ->setUltimaAtualizacao(date('Y-m-d H:i:s'));

            $id = $dao->criarQuestao($questao);
            echo json_encode(["success" => true, "id_questao" => $id]);
            break;

        case 'GET': // Buscar questão ou todas
            if (isset($_GET['id'])) {
                $questao = $dao->getQuestaoById((int)$_GET['id']);
                echo json_encode($questao ?? ["error" => "Questão não encontrada"]);
            } else {
                echo json_encode($dao->getAllQuestaos());
            }
            break;

        case 'PUT': // Atualizar questão
            $data = getInputData();
            $questao = new Questao();

            $questao->setIdQuestao($data['id_questao'])
                    ->setIdAssunto($data['id_assunto'])
                    ->setIdProfessor($data['uid_professor'])
                    ->setEnunciado($data['enunciado'])
                    ->setRespostaCorreta($data['resposta_correta'])
                    ->setTipo($data['tipo'])
                    ->setPublico($data['publico'])
                    ->setDataCriacao($data['data_criacao'])
                    ->setUltimaAtualizacao(date('Y-m-d H:i:s'));

            $ok = $dao->atualizarQuestao($questao);
            echo json_encode(["success" => $ok]);
            break;

        case 'DELETE': // Excluir
            if (!isset($_GET['id'])) {
                http_response_code(400);
                echo json_encode(["error" => "ID da questão é obrigatório"]);
                exit;
            }
            $ok = $dao->excluirQuestao((int)$_GET['id']);
            echo json_encode(["success" => $ok]);
            break;

        default:
            http_response_code(405);
            echo json_encode(["error" => "Método não permitido"]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
