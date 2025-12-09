<?php
// controllers/ProvaController.php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once('../config/database.php');
require_once('../dao/ProvaDAO.php');

header('Content-Type: application/json; charset=utf-8');

$dao = new ProvaDAO();
$metodo = $_SERVER['REQUEST_METHOD'];

switch ($metodo) {
    case 'DELETE':
        // aceita id_prova por query string ou body JSON
        $id = null;
        if (isset($_GET['id_prova'])) {
            $id = (int)$_GET['id_prova'];
        } else {
            $input = json_decode(file_get_contents('php://input'), true);
            if ($input && isset($input['id_prova'])) $id = (int)$input['id_prova'];
        }

        if (!$id) {
            http_response_code(400);
            echo json_encode(['erro' => 'Parametro id_prova é obrigatório']);
            exit;
        }

        $ok = $dao->excluirProva($id);
        if ($ok) {
            echo json_encode(['sucesso' => true, 'id_prova' => $id]);
        } else {
            http_response_code(500);
            echo json_encode(['erro' => 'Erro ao excluir prova']);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['erro' => 'Metodo não permitido']);
        break;
}

?>