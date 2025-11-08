<?php
// dao/UsuarioDAO.php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/usuario.php';

use Models\Usuario;

class UsuarioDAO
{
    private $conn;

    public function __construct()
    {
        $this->conn = Database::getInstance()->getConnection();
    }

    // CREATE
    public function criarUsuario(Usuario $usuario): int
    {
        $sql = "INSERT INTO usuario (id_escola, nome, email, senha, telefone, tipo, ativo)
                VALUES (:id_escola, :nome, :email, :senha, :telefone, :tipo, :ativo)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_escola', $usuario->getIdEscola(), PDO::PARAM_INT);
        $stmt->bindValue(':nome', $usuario->getNome(), PDO::PARAM_STR);
        $stmt->bindValue(':email', $usuario->getEmail(), PDO::PARAM_STR);
        $stmt->bindValue(':senha', $usuario->getSenha(), PDO::PARAM_STR);
        $stmt->bindValue(':telefone', $usuario->getTelefone(), PDO::PARAM_STR);
        $stmt->bindValue(':tipo', $usuario->getTipo() ?? 'professor', PDO::PARAM_STR);
        $stmt->bindValue(':ativo', $usuario->getAtivo() ?? true, PDO::PARAM_BOOL);

        $stmt->execute();
        return (int)$this->conn->lastInsertId();
    }

    // READ por ID
    public function getUsuarioById(int $uid): ?Usuario
    {
        $sql = "SELECT * FROM usuario WHERE uid = :uid";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':uid', $uid, PDO::PARAM_INT);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row) return null;
        return $this->mapRowToUsuario($row);
    }

    // READ todos
    public function getAllUsuarios(): array
    {
        $sql = "SELECT * FROM usuario";
        $stmt = $this->conn->query($sql);
        $usuarios = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $usuarios[] = $this->mapRowToUsuario($row);
        }
        return $usuarios;
    }

    // UPDATE
    public function atualizarUsuario(Usuario $usuario): bool
    {
        $sql = "UPDATE usuario SET id_escola = :id_escola, nome = :nome, email = :email,
                senha = :senha, telefone = :telefone, tipo = :tipo, ativo = :ativo
                WHERE uid = :uid";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_escola', $usuario->getIdEscola(), PDO::PARAM_INT);
        $stmt->bindValue(':nome', $usuario->getNome(), PDO::PARAM_STR);
        $stmt->bindValue(':email', $usuario->getEmail(), PDO::PARAM_STR);
        $stmt->bindValue(':senha', $usuario->getSenha(), PDO::PARAM_STR);
        $stmt->bindValue(':telefone', $usuario->getTelefone(), PDO::PARAM_STR);
        $stmt->bindValue(':tipo', $usuario->getTipo(), PDO::PARAM_STR);
        $stmt->bindValue(':ativo', $usuario->getAtivo(), PDO::PARAM_BOOL);
        $stmt->bindValue(':uid', $usuario->getIdUsuario(), PDO::PARAM_INT);

        return $stmt->execute();
    }

    // DELETE
    public function excluirUsuario(int $uid): bool
    {
        $sql = "DELETE FROM usuario WHERE uid = :uid";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':uid', $uid, PDO::PARAM_INT);
        return $stmt->execute();
    }

    public function buscarPorEmail(string $email): ?array
    {
        try {
            $sql = "SELECT id_usuario, id_escola, nome, email, senha, tipo, ativo 
                    FROM usuario 
                    WHERE email = :email 
                    LIMIT 1";

            $stmt = $this->conn->prepare($sql);
            $stmt->bindValue(':email', $email, PDO::PARAM_STR);
            $stmt->execute();

            $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
            return $usuario ?: null;
        } catch (PDOException $e) {
            // Em produção, logue o erro em vez de exibir
            error_log("Erro ao buscar usuário: " . $e->getMessage());
            return null;
        }
    }

    private function mapRowToUsuario(array $row): Usuario
    {
        $usuario = new Usuario();
        $usuario->setIdUsuario($row['uid'])
            ->setIdEscola($row['id_escola'])
            ->setNome($row['nome'])
            ->setEmail($row['email'])
            ->setSenha($row['senha'])
            ->setTelefone($row['telefone'])
            ->setAtivo($row['ativo'])
            ->setDataCadastro($row['data_cadastro']);
        return $usuario;
    }
}
