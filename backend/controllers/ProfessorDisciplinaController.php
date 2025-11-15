<?php
// controllers/usuarioDisciplinaController.php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once('../config/database.php');
require_once('../dao/professorDisciplinaDAO.php');
require_once('../models/professorDisciplina.php');
require_once('../dao/usuarioDAO.php');
require_once('../dao/disciplinaDAO.php');

use Models\ProfessorDisciplina;
use Models\usuario;

header('Content-Type: application/json; charset=utf-8');

$metodo = $_SERVER['REQUEST_METHOD'];
$dao = new ProfessorDisciplinaDAO();
$professor = new usuarioDAO();
$disciplinaDAO = new DisciplinaDAO();

switch ($metodo) {

    // 🔹 CRIAR ASSOCIAÇÃO usuario ↔ DISCIPLINA
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);

        if (!$data || !isset($data['id_professor'], $data['id_disciplina'])) {
            http_response_code(400);
            echo json_encode(['erro' => 'Campos obrigatórios: id_professor e id_disciplina']);
            exit;
        }

        $leciona = new ProfessorDisciplina();
        $leciona->setIdProfessor($data['id_professor']);
        $leciona->setIdDisciplina($data['id_disciplina']);

        $criado = $dao->criarProfessorDisciplina($leciona);
        if ($criado) {
            echo json_encode(['sucesso' => true, 'mensagem' => 'Associação criada com sucesso']);
        } else {
            http_response_code(500);
            echo json_encode(['erro' => 'Erro ao criar associação professor-disciplina']);
        }
        break;

    // 🔹 LISTAR TODAS ASSOCIAÇÕES OU FILTRAR POR usuario/DISCIPLINA
    case 'GET':
        if(isset($_GET['id_professor'])) {
            $idProfessor = (int)$_GET['id_professor'];
            $leciona = $dao->getDisciplinaByProfessorId($idProfessor);
            if ($leciona) {
                echo json_encode($leciona);
            } else {
                http_response_code(404);
                echo json_encode(['erro' => 'Associação não encontrada para o professor especificado']);
            }
        } else {
            $lecionas = $dao->getAllProfessorDisciplinas();
            echo json_encode($lecionas);
        }
        break;

    // 🔹 REMOVER ASSOCIAÇÃO usuario ↔ DISCIPLINA
    case 'DELETE':
        if (!isset($_GET['id_professor']) || !isset($_GET['id_disciplina'])) {
            http_response_code(400);
            echo json_encode(['erro' => 'Parâmetros obrigatórios: id_professor e id_disciplina']);
            exit;
        }

        $idusuario = (int)$_GET['id_professor'];
        $idDisciplina = (int)$_GET['id_disciplina'];

        $removido = $dao->excluirProfessorDisciplina($idDisciplina, $idusuario);

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
