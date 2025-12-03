<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit(); }

include('../config/database.php');
include('../dao/turmaDAO.php');

use Models\Turma;

$metodo = $_SERVER['REQUEST_METHOD'];
$turmaDAO = new TurmaDAO();

header('Content-Type: application/json; charset=utf-8');

switch ($metodo) {
    case 'GET':
        // opcional: ?id_escola=xx or ?id_turma=xx
        if (isset($_GET['id_turma'])) {
            $turma = $turmaDAO->getTurmaById((int)$_GET['id_turma']);
            if (!$turma) { http_response_code(404); echo json_encode(['erro' => 'Turma não encontrada']); break; }
            echo json_encode([
                'id_turma' => $turma->getIdTurma(),
                'id_escola' => $turma->getIdEscola(),
                'nome_turma' => $turma->getNomeTurma(),
                'serie' => $turma->getSerie(),
                'turno' => $turma->getTurno()
            ]);
            break;
        }

        if (isset($_GET['id_escola'])) {
            $list = $turmaDAO->listarPorEscola((int)$_GET['id_escola']);
            echo json_encode($list);
            break;
        }

        $all = $turmaDAO->getAll();
        echo json_encode($all);
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data) { http_response_code(400); echo json_encode(['erro'=>'JSON inválido']); break; }

        $turma = new Turma();
        $turma->setIdEscola($data['id_escola'] ?? null);
        $turma->setNomeTurma($data['nome_turma'] ?? '');
        $turma->setSerie($data['serie'] ?? '');
        $turma->setTurno($data['turno'] ?? '');

        $id = $turmaDAO->criarTurma($turma);
        if (!$id) { http_response_code(500); echo json_encode(['erro'=>'Falha ao criar turma']); break; }
        echo json_encode(['sucesso' => true, 'id_turma' => $id]);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data || !isset($data['id_turma'])) { http_response_code(400); echo json_encode(['erro'=>'id_turma ausente']); break; }
        $turma = new Turma();
        $turma->setIdTurma((int)$data['id_turma']);
        $turma->setIdEscola($data['id_escola'] ?? null);
        $turma->setNomeTurma($data['nome_turma'] ?? '');
        $turma->setSerie($data['serie'] ?? '');
        $turma->setTurno($data['turno'] ?? '');
        $ok = $turmaDAO->atualizarTurma($turma);
        echo json_encode(['sucesso'=>$ok]);
        break;

    case 'DELETE':
        $id = null;
        if (isset($_GET['id_turma'])) $id = (int)$_GET['id_turma'];
        else {
            $body = json_decode(file_get_contents('php://input'), true);
            if (isset($body['id_turma'])) $id = (int)$body['id_turma'];
        }
        if (!$id) { http_response_code(400); echo json_encode(['erro'=>'id_turma ausente']); break; }
        $ok = $turmaDAO->excluirTurma($id);
        echo json_encode(['sucesso'=>$ok]);
        break;

    default:
        http_response_code(405);
        echo json_encode(['erro' => 'método não permitido']);
}
