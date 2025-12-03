<?php
// controllers/ProfessorTurmaController.php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once('../config/database.php');
require_once('../dao/professorTurmaDAO.php');
require_once('../dao/usuarioDAO.php');
require_once('../dao/turmaDAO.php');

use Models\ProfessorTurma;

header('Content-Type: application/json; charset=utf-8');

$metodo = $_SERVER['REQUEST_METHOD'];
$dao = new ProfessorTurmaDAO();

switch ($metodo) {

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);

        if (!$data || !isset($data['id_professor'], $data['id_turma'])) {
            http_response_code(400);
            echo json_encode(['erro' => 'Campos obrigatórios: id_professor e id_turma']);
            exit;
        }

        $leciona = new ProfessorTurma();
        $leciona->setIdProfessor($data['id_professor']);
        $leciona->setIdTurma($data['id_turma']);

        $criado = $dao->criarProfessorTurma($leciona);
        if ($criado) {
            echo json_encode(['sucesso' => true, 'mensagem' => 'Associação criada com sucesso']);
        } else {
            http_response_code(500);
            echo json_encode(['erro' => 'Erro ao criar associação professor-turma']);
        }
        break;

    case 'GET':
        if(isset($_GET['id_professor'])) {
            $idProfessor = (int)$_GET['id_professor'];
            $turmas = $dao->getTurmaByProfessorId($idProfessor);
            if ($turmas) {
                echo json_encode($turmas);
            } else {
                http_response_code(404);
                echo json_encode(['erro' => 'Nenhuma turma encontrada para o professor especificado']);
            }
        } else {
            $turmas = $dao->getAllProfessorTurmas();
            echo json_encode($turmas);
        }
        break;

    case 'DELETE':
        if (!isset($_GET['id_professor']) || !isset($_GET['id_turma'])) {
            http_response_code(400);
            echo json_encode(['erro' => 'Parâmetros obrigatórios: id_professor e id_turma']);
            exit;
        }

        $idProfessor = (int)$_GET['id_professor'];
        $idTurma = (int)$_GET['id_turma'];

        $removido = $dao->excluirProfessorTurma($idTurma, $idProfessor);

        if ($removido) {
            echo json_encode(['sucesso' => true, 'mensagem' => 'Associação removida com sucesso']);
        } else {
            http_response_code(500);
            echo json_encode(['erro' => 'Erro ao remover associação']);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['erro' => 'Método não permitido']);
        break;
}
?>
