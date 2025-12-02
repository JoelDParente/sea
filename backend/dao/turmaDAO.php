<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/turma.php';

use Models\Turma;

class TurmaDAO {
    private $conn;

    public function __construct() {
        $this->conn = Database::getInstance()->getConnection();
    }

    public function criarTurma(Turma $turma): int {
        $sql = "INSERT INTO turma (id_escola, nome_turma, serie, turno) VALUES (:id_escola, :nome_turma, :serie, :turno)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_escola', $turma->getIdEscola(), PDO::PARAM_INT);
        $stmt->bindValue(':nome_turma', $turma->getNomeTurma(), PDO::PARAM_STR);
        $stmt->bindValue(':serie', $turma->getSerie(), PDO::PARAM_STR);
        $stmt->bindValue(':turno', $turma->getTurno(), PDO::PARAM_STR);
        $stmt->execute();
        return (int)$this->conn->lastInsertId();
    }

    public function listarPorEscola(int $idEscola): array {
        $sql = "SELECT id_turma, id_escola, nome_turma, serie, turno FROM turma WHERE id_escola = :id_escola";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_escola', $idEscola, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getAll(): array {
        $sql = "SELECT id_turma, id_escola, nome_turma, serie, turno FROM turma";
        $stmt = $this->conn->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getTurmaById(int $id): ?Turma {
        $sql = "SELECT * FROM turma WHERE id_turma = :id_turma";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_turma', $id, PDO::PARAM_INT);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$row) return null;
        $turma = new Turma();
        $turma->setIdTurma($row['id_turma']);
        $turma->setIdEscola($row['id_escola']);
        $turma->setNomeTurma($row['nome_turma']);
        $turma->setSerie($row['serie']);
        $turma->setTurno($row['turno']);
        return $turma;
    }

    public function atualizarTurma(Turma $turma): bool {
        $sql = "UPDATE turma SET id_escola = :id_escola, nome_turma = :nome_turma, serie = :serie, turno = :turno WHERE id_turma = :id_turma";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_escola', $turma->getIdEscola(), PDO::PARAM_INT);
        $stmt->bindValue(':nome_turma', $turma->getNomeTurma(), PDO::PARAM_STR);
        $stmt->bindValue(':serie', $turma->getSerie(), PDO::PARAM_STR);
        $stmt->bindValue(':turno', $turma->getTurno(), PDO::PARAM_STR);
        $stmt->bindValue(':id_turma', $turma->getIdTurma(), PDO::PARAM_INT);
        return $stmt->execute();
    }

    public function excluirTurma(int $id): bool {
        $sql = "DELETE FROM turma WHERE id_turma = :id_turma";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_turma', $id, PDO::PARAM_INT);
        return $stmt->execute();
    }
}