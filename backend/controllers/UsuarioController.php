<?php
// controllers/UsuarioController.php

require_once __DIR__ . '/../dao/usuarioDAO.php';
require_once __DIR__ . '/../dao/escolaDAO.php';
require_once __DIR__ . '/../models/usuario.php';
require_once __DIR__ . '/../models/escola.php';

use Models\Usuario;
use Models\Escola;

class UsuarioController {
    private $usuarioDAO;
    private $escolaDAO;

    public function __construct() {
        $this->usuarioDAO = new UsuarioDAO();
        $this->escolaDAO = new EscolaDAO();
    }

    /**
     * Cadastra um novo gestor e sua escola (processo em duas etapas).
     * Retorna o ID do usuário criado ou lança exceção em caso de erro.
     */
    public function cadastrarGestorComEscola(array $dadosEscola, array $dadosUsuario): int {
        try {
            // 1️⃣ Cadastrar escola
            $escola = new Escola();
            $escola->setInep($dadosEscola['inep'] ?? null)
                   ->setNomeEscola($dadosEscola['nome_escola'])
                   ->setEmail($dadosEscola['email'])
                   ->setTelefone($dadosEscola['telefone'])
                   ->setLogo($dadosEscola['logo'] ?? null)
                   ->setEstado($dadosEscola['estado'])
                   ->setCidade($dadosEscola['cidade'])
                   ->setBairro($dadosEscola['bairro'])
                   ->setRua($dadosEscola['rua'])
                   ->setNumero($dadosEscola['num']);

            $idEscola = $this->escolaDAO->criarEscola($escola);

            // 2️⃣ Cadastrar gestor (usuário principal)
            $usuario = new Usuario();
            $usuario->setIdEscola($idEscola)
                    ->setNome($dadosUsuario['nome'])
                    ->setEmail($dadosUsuario['email'])
                    ->setSenha(password_hash($dadosUsuario['senha'], PASSWORD_BCRYPT))
                    ->setTelefone($dadosUsuario['telefone'])
                    ->setTipo('gestor')
                    ->setAtivo(true);

            $idUsuario = $this->usuarioDAO->criarUsuario($usuario);

            return $idUsuario;
        } catch (Exception $e) {
            throw new Exception("Erro ao cadastrar gestor e escola: " . $e->getMessage());
        }
    }

    /**
     * Cadastra um novo professor vinculado a uma escola existente.
     */
    public function cadastrarProfessor(array $dados): int {
        try {
            $usuario = new Usuario();
            $usuario->setIdEscola($dados['id_escola'])
                    ->setNome($dados['nome'])
                    ->setEmail($dados['email'])
                    ->setSenha(password_hash($dados['senha'], PASSWORD_BCRYPT))
                    ->setTelefone($dados['telefone'])
                    ->setTipo('professor')
                    ->setAtivo(true);

            return $this->usuarioDAO->criarUsuario($usuario);
        } catch (Exception $e) {
            throw new Exception("Erro ao cadastrar professor: " . $e->getMessage());
        }
    }

    /**
     * 🔐 Login simples com verificação de senha
     * Retorna o objeto `Usuario` se válido ou `null` se falhar.
     */
    public function login(string $email, string $senha): ?Usuario {
        try {
            $usuarios = $this->usuarioDAO->getAllUsuarios();
            foreach ($usuarios as $usuario) {
                if ($usuario->getEmail() === $email && password_verify($senha, $usuario->getSenha())) {
                    return $usuario;
                }
            }
            return null;
        } catch (Exception $e) {
            throw new Exception("Erro ao realizar login: " . $e->getMessage());
        }
    }

    /**
     * Lista todos os usuários (debug/admin)
     */
    public function listarUsuarios(): array {
        return $this->usuarioDAO->getAllUsuarios();
    }

    /**
     * Excluir usuário por ID
     */
    public function excluirUsuario(int $uid): bool {
        return $this->usuarioDAO->excluirUsuario($uid);
    }
}
