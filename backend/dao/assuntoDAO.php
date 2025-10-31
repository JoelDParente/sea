<?php
// dao/AssuntoDAO.php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/assunto.php';

use Models\Assunto;

class AssuntoDAO
{
    private $conn;

    public function __construct()
    {
        $this->conn = Database::getInstance()->getConnection();
    }

    public function criarAssunto(Assunto $assunto): int
    {
        $sql = "INSERT INTO assunto (id_assunto, id_disciplina, nome_assunto)
                VALUES (:id_assunto, :id_disciplina, :nome_assunto)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_assunto', $assunto->getIdAssunto(), PDO::PARAM_INT);
        $stmt->bindValue(':id_disciplina', $assunto->getIdDisciplina(), PDO::PARAM_INT);
        $stmt->bindValue(':nome_assunto', $assunto->getNomeAssunto(), PDO::PARAM_STR);


        $stmt->execute();
        return (int)$this->conn->lastInsertId();
    }

    public function getAssuntoById(int $id_assunto): ?Assunto
    {
        $sql = "SELECT * FROM assunto WHERE id_assunto = :id_assunto";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_assunto', $id_assunto, PDO::PARAM_INT);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row) return null;
        return $this->mapRowToAssunto($row);
    }

    public function getAllAssuntos(): array
    {
        $sql = "SELECT * FROM assunto";
        $stmt = $this->conn->query($sql);
        $assuntos = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $assuntos[] = $this->mapRowToAssunto($row);
        }
        return $assuntos;
    }

    public function atualizarAssunto(Assunto $assunto): bool
    {
        $sql = "UPDATE assunto SET id_assunto = :id_assunto, nome_assunto = :nome_assunto, descricao = :descricao
                WHERE id_assunto = :id_assunto";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_assunto', $assunto->getIdAssunto(), PDO::PARAM_INT);
        $stmt->bindValue(':nome_assunto', $assunto->getNomeAssunto(), PDO::PARAM_STR);
        $stmt->bindValue(':id_disciplina', $assunto->getIdDisciplina(), PDO::PARAM_INT);

        return $stmt->execute();
    }

    public function excluirAssunto(int $id_assunto): bool
    {
        $sql = "DELETE FROM assunto WHERE id_assunto = :id_assunto";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_assunto', $id_assunto, PDO::PARAM_INT);
        return $stmt->execute();
    }

    private function mapRowToAssunto(array $row): Assunto
    {
        $assunto = new Assunto();
        $assunto->setIdAssunto($row['id_assunto'])
            ->setIdDisciplina($row['id_disciplina'])
            ->setNomeAssunto($row['nome_assunto']);
        return $assunto;
    }
}
