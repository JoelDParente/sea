<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit; // Pré-flight CORS
}

include('../dao/usuarioDAO.php');
use Models\Usuario;

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
        $usuario->setFoto($data['foto'] ?? '../assets/avatar.png');
        $usuario->setSenha(password_hash($data['senha'], PASSWORD_BCRYPT));
        $usuario->setTipo($data['tipo'] ?? 'professor');
        $usuario->setAtivo($data['ativo'] ?? 1);
        $usuario->setTelefone($data['telefone'] ?? null);

        $dao->criarUsuario($usuario);

        echo json_encode(['sucesso' => true]);
        break;

   case 'GET':
    if (isset($_GET['id_escola'])) {
        $id = intval($_GET['id_escola']);
        $professores = $dao->ProfessoresPorEscola($id);

        echo json_encode($professores);
    } else {
        $lista = $dao->getAllUsuarios();
        echo json_encode($lista);
    }
    break;

    case 'PUT':
        parse_str(file_get_contents("php://input"), $data);

        if (!isset($data['id'])) {
            http_response_code(400);
            echo json_encode(['erro' => 'ID obrigatório']);
            exit;
        }

        $usuarioAtual = $dao->getUsuarioById($data['id']);

        if (!$usuarioAtual) {
            http_response_code(404);
            echo json_encode(['erro' => 'Usuário não encontrado']);
            exit;
        }

        $usuario = new Usuario();
        $usuario->setIdUsuario($data['id']);
        $usuario->setIdEscola($data['id_escola'] ?? $usuarioAtual['id_escola']);
        $usuario->setNome($data['nome'] ?? $usuarioAtual['nome']);
        $usuario->setEmail($data['email'] ?? $usuarioAtual['email']);
        $usuario->setFoto($data['foto'] ?? $usuarioAtual['foto']);

        if (isset($data['senha']) && !empty($data['senha'])) {
            $usuario->setSenha(hash('sha256', $data['senha']));
        } else {
            $usuario->setSenha($usuarioAtual['senha']);
        }

        $usuario->setTipo($data['tipo'] ?? $usuarioAtual['tipo']);
        $usuario->setAtivo($data['ativo'] ?? $usuarioAtual['ativo']);
        $usuario->setTelefone($data['telefone'] ?? $usuarioAtual['telefone']);

        $dao->atualizarUsuario($usuario);

        echo json_encode(['sucesso' => true]);
        break;

    case 'DELETE':
        parse_str(file_get_contents("php://input"), $data);

        if (!isset($data['id'])) {
            http_response_code(400);
            echo json_encode(['erro' => 'ID obrigatório']);
            exit;
        }

        $id = intval($data['id']);

        $usuario = $dao->getUsuarioById($id);
        if (!$usuario) {
            http_response_code(404);
            echo json_encode(['erro' => 'Usuário não encontrado']);
            exit;
        }

        $dao->excluirUsuario($id);

        echo json_encode(['sucesso' => true]);
        break;


    default:
        http_response_code(405);
        echo json_encode(['erro' => 'Método não permitido']);
        break;
}