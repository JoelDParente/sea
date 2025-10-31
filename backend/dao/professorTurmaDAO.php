<?php
// dao/ProfessorTurmaDAO.php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/professorTurma.php';

use Models\ProfessorTurma;

class ProfessorTurmaDAO {
    private $conn;

    public function __construct() {
        $this->conn = Database::getInstance()->getConnection();
    }

    // CREATE
    public function criarProfessorTurma(ProfessorTurma $leciona): bool {
        $sql = "INSERT INTO professorturma (id_turma, uid_professor)
                VALUES (:id_turma, :uid_professor)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_turma', $leciona->getIdTurma(), PDO::PARAM_INT);
        $stmt->bindValue(':uid_professor', $leciona->getIdProfessor(), PDO::PARAM_INT);
        return $stmt->execute();
    }

    // READ por chave composta (id_turma, uid_professor, id_questao)
    public function getProfessorTurmaById(int $idTurma, int $idProfesor): ?ProfessorTurma {
        $sql = "SELECT * FROM professorturma 
                WHERE id_turma = :id_turma AND uid_professor = :uid_professor";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_turma', $idTurma, PDO::PARAM_INT);
        $stmt->bindValue(':uid_professor', $idProfesor, PDO::PARAM_INT);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row) return null;
        return $this->mapRowToProfessorTurma($row);
    }

    // READ todos
    public function getAllProfessorTurmas(): array {
        $sql = "SELECT * FROM professorturma";
        $stmt = $this->conn->query($sql);
        $lecionas = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $lecionas[] = $this->mapRowToProfessorTurma($row);
        }
        return $lecionas;
    }

    // DELETE
    public function excluirProfessorTurma(int $idTurma, int $idProfessor): bool {
        $sql = "DELETE FROM professorturma 
                WHERE id_turma = :id_turma AND uid_professor = :uid_professor";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_turma', $idTurma, PDO::PARAM_INT);
        $stmt->bindValue(':uid_professor', $idProfessor, PDO::PARAM_INT);
        return $stmt->execute();
    }

    private function mapRowToProfessorTurma(array $row): ProfessorTurma {
        $leciona = new ProfessorTurma();
        $leciona->setidTurma($row['id_turma'])
                 ->setIdProfessor($row['uid_professor']);
        return $leciona;
    }
}
