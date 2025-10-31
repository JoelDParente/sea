<?php
// dao/ProvaTurmaDAO.php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/provaTurma.php';

use Models\ProvaTurma;

class ProvaTurmaDAO {
    private $conn;

    public function __construct() {
        $this->conn = Database::getInstance()->getConnection();
    }

    // CREATE
    public function criarProvaTurma(ProvaTurma $leciona): bool {
        $sql = "INSERT INTO provaturma (id_prova, id_turma)
                VALUES (:id_prova, :id_turma)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_prova', $leciona->getIdProva(), PDO::PARAM_INT);
        $stmt->bindValue(':id_turma', $leciona->getIdTurma(), PDO::PARAM_INT);
        return $stmt->execute();
    }

    // READ por chave composta (id_prova, id_turma, id_turma)
    public function getProvaTurmaById(int $idTurma, int $idProfesor): ?ProvaTurma {
        $sql = "SELECT * FROM provaturma 
                WHERE id_prova = :id_prova AND id_turma = :id_turma";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_prova', $idTurma, PDO::PARAM_INT);
        $stmt->bindValue(':id_turma', $idProfesor, PDO::PARAM_INT);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row) return null;
        return $this->mapRowToProvaTurma($row);
    }

    // READ todos
    public function getAllProvaTurmas(): array {
        $sql = "SELECT * FROM provaturma";
        $stmt = $this->conn->query($sql);
        $lecionas = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $lecionas[] = $this->mapRowToProvaTurma($row);
        }
        return $lecionas;
    }

    // DELETE
    public function excluirProvaTurma(int $idTurma, int $idProfessor): bool {
        $sql = "DELETE FROM provaturma 
                WHERE id_prova = :id_prova AND id_turma = :id_turma";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_prova', $idTurma, PDO::PARAM_INT);
        $stmt->bindValue(':id_turma', $idProfessor, PDO::PARAM_INT);
        return $stmt->execute();
    }

    private function mapRowToProvaTurma(array $row): ProvaTurma {
        $leciona = new ProvaTurma();
        $leciona->setIdProva($row['id_prova'])
                 ->setIdTurma($row['id_turma']);
        return $leciona;
    }
}
