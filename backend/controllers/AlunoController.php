<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include('../config/database.php');
include('../dao/alunoDAO.php');
include('../models/aluno.php');

use Models\Aluno;

$metodo = $_SERVER['REQUEST_METHOD'];
$alunoDAO = new AlunoDAO();

header('Content-Type: application/json; charset=utf-8');

switch ($metodo) {
    case 'GET':
        if (isset($_GET['id_turma'])) {
            $idTurma = (int)$_GET['id_turma'];
            $alunos = $alunoDAO->AlunosPorTurma($idTurma);

            // converter objetos para arrays serializáveis
            $out = array_map(fn($a) => $a->toArray(), $alunos);

            echo json_encode($out);
            break;
        }

        echo json_encode($alunoDAO->getAllAlunos());
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data) {
            http_response_code(400);
            echo json_encode(['erro' => 'JSON inválido']);
            break;
        }
        $aluno = new Aluno();
        $aluno->setIdTurma($data['id_turma'] ?? null);
        $aluno->setMatricula($data['matricula'] ?? '');
        $aluno->setNome($data['nome'] ?? '');
        $aluno->setEmail($data['email'] ?? '');
        // foto optional
        $foto = $data['foto'] ?? null;
        $id = $alunoDAO->criarAluno($aluno);
        if (!$id) {
            http_response_code(500);
            echo json_encode(['erro' => 'Falha ao criar aluno']);
            break;
        }
        // update photo if provided (URL)
        if ($foto) {
            $conn = Database::getInstance()->getConnection();
            $sql = "UPDATE aluno SET foto = :foto WHERE id_aluno = :id_aluno";
            $stmt = $conn->prepare($sql);
            $stmt->bindValue(':foto', $foto, PDO::PARAM_STR);
            $stmt->bindValue(':id_aluno', $id, PDO::PARAM_INT);
            $stmt->execute();
        }
        echo json_encode(['sucesso' => true, 'id_aluno' => $id]);
        break;

    case 'DELETE':
        $id = null;
        if (isset($_GET['id_aluno'])) $id = (int)$_GET['id_aluno'];
        else {
            $b = json_decode(file_get_contents('php://input'), true);
            if (isset($b['id_aluno'])) $id = (int)$b['id_aluno'];
        }
        if (!$id) {
            http_response_code(400);
            echo json_encode(['erro' => 'id_aluno ausente']);
            break;
        }
        $ok = $alunoDAO->excluirAluno($id);
        echo json_encode(['sucesso' => $ok]);
        break;

    default:
        http_response_code(405);
        echo json_encode(['erro' => 'Método não permitido']);
}
