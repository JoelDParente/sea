<?php
require_once __DIR__ . '/../dao/usuarioDAO.php';
require_once __DIR__ . '/../config/jwt.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthController {
    public function login() {
        header('Content-Type: application/json');

        $data = json_decode(file_get_contents('php://input'), true);
        $email = $data['email'] ?? '';
        $senha = $data['senha'] ?? '';

        $usuarioDAO = new UsuarioDAO();
        $usuario = $usuarioDAO->buscarPorEmail($email);

        if (!$usuario || !password_verify($senha, $usuario['senha'])) {
            http_response_code(401);
            echo json_encode(['erro' => 'Credenciais inválidas']);
            return;
        }

        $jwtConfig = require __DIR__ . '/../config/jwt.php';
        $payload = [
            'iss' => 'SEA', // Identificador do emissor
            'sub' => $usuario['id_usuario'],
            'email' => $usuario['email'],
            'iat' => time(),
            'exp' => time() + $jwtConfig['expire_time']
        ];

        $token = JWT::encode($payload, $jwtConfig['secret_key'], $jwtConfig['algorithm']);
        echo json_encode(['token' => $token]);
    }

    public static function verificarToken() {
        $headers = getallheaders();
        if (!isset($headers['Authorization'])) {
            http_response_code(401);
            echo json_encode(['erro' => 'Token ausente']);
            exit;
        }

        $token = str_replace('Bearer ', '', $headers['Authorization']);
        $jwtConfig = require __DIR__ . '/../config/jwt.php';

        try {
            $dados = JWT::decode($token, new Key($jwtConfig['secret_key'], $jwtConfig['algorithm']));
            return $dados;
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(['erro' => 'Token inválido ou expirado']);
            exit;
        }
    }
}
