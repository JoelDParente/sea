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
        $sql = "INSERT INTO usuario (id_escola, nome, email, foto, senha, telefone, tipo, ativo)
                VALUES (:id_escola, :nome, :email, :foto, :senha, :telefone, :tipo, :ativo)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_escola', $usuario->getIdEscola(), PDO::PARAM_INT);
        $stmt->bindValue(':nome', $usuario->getNome(), PDO::PARAM_STR);
        $stmt->bindValue(':email', $usuario->getEmail(), PDO::PARAM_STR);
        $stmt->bindValue(':foto', $usuario->getFoto(), PDO::PARAM_STR);
        $stmt->bindValue(':senha', $usuario->getSenha(), PDO::PARAM_STR);
        $stmt->bindValue(':telefone', $usuario->getTelefone(), PDO::PARAM_STR);
        $stmt->bindValue(':tipo', $usuario->getTipo() ?? 'professor', PDO::PARAM_STR);
        $stmt->bindValue(':ativo', $usuario->getAtivo() ?? true, PDO::PARAM_BOOL);

        $stmt->execute();
        return (int)$this->conn->lastInsertId();
    }

    // READ por ID
    public function getUsuarioById(int $id_usuario): ?Usuario
    {
        $sql = "SELECT * FROM usuario WHERE id_usuario = :id_usuario";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_usuario', $id_usuario, PDO::PARAM_INT);
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
                foto = :foto, senha = :senha, telefone = :telefone, tipo = :tipo, ativo = :ativo
                WHERE id_usuario = :id_usuario";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_escola', $usuario->getIdEscola(), PDO::PARAM_INT);
        $stmt->bindValue(':nome', $usuario->getNome(), PDO::PARAM_STR);
        $stmt->bindValue(':email', $usuario->getEmail(), PDO::PARAM_STR);
        $stmt->bindValue(':foto', $usuario->getFoto(), PDO::PARAM_STR);
        $stmt->bindValue(':senha', $usuario->getSenha(), PDO::PARAM_STR);
        $stmt->bindValue(':telefone', $usuario->getTelefone(), PDO::PARAM_STR);
        $stmt->bindValue(':tipo', $usuario->getTipo(), PDO::PARAM_STR);
        $stmt->bindValue(':ativo', $usuario->getAtivo(), PDO::PARAM_BOOL);
        $stmt->bindValue(':id_usuario', $usuario->getIdUsuario(), PDO::PARAM_INT);

        return $stmt->execute();
    }

    // DELETE
    public function excluirUsuario(int $id_usuario): bool
    {
        $sql = "DELETE FROM usuario WHERE id_usuario = :id_usuario";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_usuario', $id_usuario, PDO::PARAM_INT);
        return $stmt->execute();
    }

    public function buscarPorEmail(string $email): ?array
    {
        try {
            $sql = "SELECT id_usuario, id_escola, nome, foto, email, senha, telefone, tipo, ativo 
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

public function ProfessoresPorEscola(int $id_escola): array
{
    $sql = "SELECT * FROM usuario 
            WHERE id_escola = :id_escola AND tipo = 'professor'";
    
    $stmt = $this->conn->prepare($sql);
    $stmt->bindValue(':id_escola', $id_escola, PDO::PARAM_INT);
    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

    public function atualizarFoto(int $id_usuario, string $foto): bool
    {
        $sql = "UPDATE usuario SET foto = :foto WHERE id_usuario = :id_usuario";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':foto', $foto, PDO::PARAM_STR);
        $stmt->bindValue(':id_usuario', $id_usuario, PDO::PARAM_INT);

        return $stmt->execute();
    }

    private function mapRowToUsuario(array $row): Usuario
    {
        $usuario = new Usuario();
        $usuario->setIdUsuario($row['id_usuario'])
            ->setIdEscola($row['id_escola'])
            ->setNome($row['nome'])
            ->setEmail($row['email'])
            ->setFoto($row['foto'])
            ->setSenha($row['senha'])
            ->setTelefone($row['telefone'])
            ->setAtivo($row['ativo'])
            ->setDataCadastro($row['data_cadastro']);
        return $usuario;
    }
}
