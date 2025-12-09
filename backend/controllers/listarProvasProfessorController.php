<?php
// controllers/listarProvasProfessorController.php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once('../config/database.php');
require_once('../dao/ProvaDAO.php');

header('Content-Type: application/json; charset=utf-8');

$metodo = $_SERVER['REQUEST_METHOD'];
$dao = new ProvaDAO();

switch ($metodo) {
    case 'GET':
        if (isset($_GET['id_professor'])) {
            $idProfessor = (int)$_GET['id_professor'];
            $provas = $dao->listarPorProfessor($idProfessor);
            echo json_encode(array_map(function($p) {
                return [
                    'id_prova' => $p->getIdProva(),
                    'id_professor' => $p->getIdProfessor(),
                    'id_disciplina' => $p->getIdDisciplina(),
                    'titulo' => $p->getTitulo(),
                    'serie' => $p->getSerie(),
                    'versao' => $p->getVersao(),
                    'data_criacao' => $p->getDataCriacao(),
                    'ultima_atualizacao' => $p->getUltimaAtualizacao()
                ];
            }, $provas));
        } else {
            $provas = $dao->getAllProvas();
            echo json_encode(array_map(function($p) {
                return [
                    'id_prova' => $p->getIdProva(),
                    'id_professor' => $p->getIdProfessor(),
                    'id_disciplina' => $p->getIdDisciplina(),
                    'titulo' => $p->getTitulo(),
                    'serie' => $p->getSerie(),
                    'versao' => $p->getVersao(),
                    'data_criacao' => $p->getDataCriacao(),
                    'ultima_atualizacao' => $p->getUltimaAtualizacao()
                ];
            }, $provas));
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['erro' => 'Método não permitido']);
        break;
}
