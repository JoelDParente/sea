<?php
// dao/ProfessorDisciplinaDAO.php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/professorDisciplina.php';

use Models\ProfessorDisciplina;

class ProfessorDisciplinaDAO {
    private $conn;

    public function __construct() {
        $this->conn = Database::getInstance()->getConnection();
    }

    // CREATE
    public function criarProfessorDisciplina(ProfessorDisciplina $leciona): bool {
        $sql = "INSERT INTO professordisciplina (id_disciplina, id_usuario)
                VALUES (:id_disciplina, :id_usuario)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_disciplina', $leciona->getIdDisciplina(), PDO::PARAM_INT);
        $stmt->bindValue(':id_usuario', $leciona->getIdProfessor(), PDO::PARAM_INT);
        return $stmt->execute();
    }

    // READ por chave composta (id_disciplina, id_usuario, id_questao)
    public function getProfessorDisciplinaById(int $idDisciplina, int $idProfesor): ?ProfessorDisciplina {
        $sql = "SELECT * FROM professordisciplina 
                WHERE id_disciplina = :id_disciplina AND id_usuario = :id_usuario";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_disciplina', $idDisciplina, PDO::PARAM_INT);
        $stmt->bindValue(':id_usuario', $idProfesor, PDO::PARAM_INT);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row) return null;
        return $this->mapRowToProfessorDisciplina($row);
    }

    // READ todos
    public function getAllProfessorDisciplinas(): array {
        $sql = "SELECT * FROM professordisciplina";
        $stmt = $this->conn->query($sql);
        $lecionas = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $lecionas[] = $this->mapRowToProfessorDisciplina($row);
        }
        return $lecionas;
    }

    // DELETE
    public function excluirProfessorDisciplina(int $idDisciplina, int $idProfessor): bool {
        $sql = "DELETE FROM professordisciplina 
                WHERE id_disciplina = :id_disciplina AND id_usuario = :id_usuario";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_disciplina', $idDisciplina, PDO::PARAM_INT);
        $stmt->bindValue(':id_usuario', $idProfessor, PDO::PARAM_INT);
        return $stmt->execute();
    }

    private function mapRowToProfessorDisciplina(array $row): ProfessorDisciplina {
        $leciona = new ProfessorDisciplina();
        $leciona->setIdDisciplina($row['id_disciplina'])
                 ->setIdProfessor($row['id_usuario']);
        return $leciona;
    }
}
