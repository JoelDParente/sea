<?php

use Models\Escola;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

include('../dao/escolaDAO.php');
require_once('../models/escola.php');
$dao = new EscolaDAO();

$metodo = $_SERVER['REQUEST_METHOD'];
switch ($metodo) {
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);

        if (!$data) {
            http_response_code(400);
            echo json_encode(['erro' => 'JSON inválido']);
            exit;
        }

        $escola = new Escola();
        $escola->setInep($data['inep'] ?? null);
        $escola->setNomeEscola($data['nome_escola'] ?? '');
        $escola->setEmail($data['email'] ?? '');
        $escola->setTelefone($data['telefone'] ?? null);
        $escola->setLogo($data['logo'] ?? null);
        $escola->setEstado($data['estado'] ?? '');
        $escola->setCidade($data['cidade'] ?? '');
        $escola->setBairro($data['bairro'] ?? '');
        $escola->setRua($data['rua'] ?? '');
        $escola->setNumero($data['num'] ?? '');

        $dao->criarEscola($escola);

        echo json_encode(['sucesso' => true]);
        break;

    case 'GET':
        
    break;

    default:
        http_response_code(405);
        echo json_encode(['erro' => 'Método não permitido']);
        break;
}
