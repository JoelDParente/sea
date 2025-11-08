<?php

use Models\Usuario;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

include('../dao/usuarioDAO.php');
require_once('../models/usuario.php');
$dao = new UsuarioDAO();

$metodo = $_SERVER['REQUEST_METHOD'];
switch ($metodo) {
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);

        if (!$data) {
            http_response_code(400);
            echo json_encode(['erro' => 'JSON inválido']);
            exit;
        }

        $usuario = new Usuario();
        $usuario->setIdEscola($data['id_escola'] ?? '');
        $usuario->setNome($data['nome'] ?? '');
        $usuario->setEmail($data['email'] ?? '');
        $usuario->setSenha(hash('sha256', $data['senha'] ?? ''));
        $usuario->setTipo('professor');
        $usuario->setAtivo($data['ativo'] ?? 1);
        $usuario->setTelefone($data['telefone'] ?? null);

        $dao->criarUsuario($usuario);

        echo json_encode(['sucesso' => true]);
        break;

    case 'GET':
        
    break;

    default:
        http_response_code(405);
        echo json_encode(['erro' => 'Método não permitido']);
        break;
}
