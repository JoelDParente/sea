<?php
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../dao/usuarioDAO.php';
require_once __DIR__ . '/../config/env.php'; // ajusta caminho se necessário

use Firebase\JWT\JWT;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

try {
    // Recebe JSON do axios
    $input = json_decode(file_get_contents('php://input'), true);
    $email = $input['email'] ?? '';
    $senha = $input['senha'] ?? '';

    if (!$email || !$senha) {
        throw new Exception('E-mail e senha são obrigatórios.');
    }

    // Busca usuário no BD via DAO
    $usuarioDAO = new UsuarioDAO();
    $usuario = $usuarioDAO->buscarPorEmail($email);

    if (!$usuario) {
        throw new Exception('Usuário não encontrado.');
    }

    if (!password_verify($senha, $usuario['senha'])) {
        throw new Exception('Senha incorreta.');
    }

    // Gera JWT válido por 1 hora
    $payload = [
        "exp" => time() + 3600,
        "iat" => time(),
        "email" => $usuario['email'],
        "id_usuario" => $usuario['id_usuario'],
        "tipo" => $usuario['tipo']
    ];

    $token = JWT::encode($payload, $_ENV['JWT_KEY'], 'HS256');

    echo json_encode([
        "token" => $token,
        "user" => [
            "id_usuario" => $usuario["id_usuario"],
            "nome" => $usuario["nome"],
            "email" => $usuario["email"],
            "foto" => $usuario["foto"],
            "telefone" => $usuario["telefone"],
            "tipo" => $usuario["tipo"]
        ]
    ]);

} catch (Exception $e) {
    http_response_code(401);
    echo json_encode(["error" => $e->getMessage()]);
}
