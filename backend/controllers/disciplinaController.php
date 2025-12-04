<?php
// controllers/disciplinaController.php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once('../config/database.php');
require_once('../dao/disciplinaDAO.php');

use Models\Disciplina;

header('Content-Type: application/json; charset=utf-8');

$metodo = $_SERVER['REQUEST_METHOD'];
$dao = new DisciplinaDAO();

switch ($metodo) {

    case 'GET':

    // Buscar disciplina por ID
    if (isset($_GET['id_disciplina'])) {
        $id = (int)$_GET['id_disciplina'];
        $disciplina = $dao->getDisciplinaById($id);

        if (!$disciplina) {
            http_response_code(404);
            echo json_encode(['erro' => 'Disciplina não encontrada']);
            break;
        }

        // Normaliza a saída para um array associativo consistente
        echo json_encode([
            'id_disciplina' => $disciplina->getIdDisciplina(),
            'nome_disciplina' => $disciplina->getNomeDisciplina(),
            'descricao' => $disciplina->getDescricao(),
        ]);
        break;
    }

    // Buscar todas as disciplinas
    $all = $dao->getAllDisciplinas();
    // Converter objetos Disciplina em arrays associativos para garantir json_encode correto
    $normalized = array_map(function($d) {
        return [
            'id_disciplina' => $d->getIdDisciplina(),
            'nome_disciplina' => $d->getNomeDisciplina(),
            'descricao' => $d->getDescricao(),
        ];
    }, $all ?: []);

    echo json_encode($normalized);
    break;


    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);

        if (!$data || !isset($data['nome_disciplina'])) {
            http_response_code(400);
            echo json_encode(['erro' => 'Campo obrigatório: nome_disciplina']);
            exit;
        }

        $disciplina = new Disciplina();
        $disciplina->setNomeDisciplina($data['nome_disciplina']);
        $disciplina->setDescricao($data['descricao'] ?? '');

        $id = $dao->criarDisciplina($disciplina);
        if ($id > 0) {
            echo json_encode(['sucesso' => true, 'id' => $id, 'mensagem' => 'Disciplina criada com sucesso']);
        } else {
            http_response_code(500);
            echo json_encode(['erro' => 'Erro ao criar disciplina']);
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);

        if (!$data || !isset($data['id_disciplina'], $data['nome_disciplina'])) {
            http_response_code(400);
            echo json_encode(['erro' => 'Campos obrigatórios: id_disciplina e nome_disciplina']);
            exit;
        }

        $disciplina = new Disciplina();
        $disciplina->setIdDisciplina($data['id_disciplina']);
        $disciplina->setNomeDisciplina($data['nome_disciplina']);
        $disciplina->setDescricao($data['descricao'] ?? '');

        if ($dao->atualizarDisciplina($disciplina)) {
            echo json_encode(['sucesso' => true, 'mensagem' => 'Disciplina atualizada com sucesso']);
        } else {
            http_response_code(500);
            echo json_encode(['erro' => 'Erro ao atualizar disciplina']);
        }
        break;

    case 'DELETE':
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(['erro' => 'Parâmetro obrigatório: id']);
            exit;
        }

        $id = (int)$_GET['id'];

        if ($dao->excluirDisciplina($id)) {
            echo json_encode(['sucesso' => true, 'mensagem' => 'Disciplina excluída com sucesso']);
        } else {
            http_response_code(500);
            echo json_encode(['erro' => 'Erro ao excluir disciplina']);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['erro' => 'Método não permitido']);
        break;
}
?>
