<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

use Models\Escola;
use Models\Usuario;

include('../dao/escolaDAO.php');
include('../dao/usuarioDAO.php');
require_once('../models/escola.php');
require_once('../models/usuario.php');
$userDao = new UsuarioDAO();
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
        
        $idEscola = $dao->criarEscola($escola);

        $usuario = new Usuario();
        $usuario->setNome($data['nome'] ?? '');
        $usuario->setEmail($data['email_gestor'] ?? '');
        $usuario->setFoto($data['foto'] ?? '../assets/avatar.png');
        $usuario->setSenha(password_hash($data['senha'] ?? '', PASSWORD_DEFAULT));
        $usuario->setTipo('gestor');
        $usuario->setAtivo($data['ativo'] ?? 1);
        $usuario->setTelefone($data['telefone_gestor'] ?? null);
        $usuario->setIdEscola($idEscola);
        
        $userDao->criarUsuario($usuario);


        echo json_encode(['sucesso' => true]);
        break;

    case 'GET':
        
    break;

    default:
        http_response_code(405);
        echo json_encode(['erro' => 'Método não permitido']);
        break;
}
