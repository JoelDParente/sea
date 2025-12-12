<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/professorDisciplina.php';

use Models\ProfessorDisciplina;

class ProfessorDisciplinaDAO {
    private $conn;

    public function __construct() {
        $this->conn = Database::getInstance()->getConnection();
    }


    public function criarProfessorDisciplina(ProfessorDisciplina $leciona): bool {
        $sql = "INSERT INTO professordisciplina (id_disciplina, id_professor)
                VALUES (:id_disciplina, :id_professor)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_disciplina', $leciona->getIdDisciplina(), PDO::PARAM_INT);
        $stmt->bindValue(':id_professor', $leciona->getIdProfessor(), PDO::PARAM_INT);
        return $stmt->execute();
    }

    public function getProfessorDisciplinaById(int $idDisciplina, int $idProfesor): ?ProfessorDisciplina {
        $sql = "SELECT * FROM professordisciplina 
                WHERE id_disciplina = :id_disciplina AND id_professor = :id_professor";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_disciplina', $idDisciplina, PDO::PARAM_INT);
        $stmt->bindValue(':id_professor', $idProfesor, PDO::PARAM_INT);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row) return null;
        return $this->mapRowToProfessorDisciplina($row);
    }

public function getDisciplinaByProfessorId(int $idProfessor): array {
    $sql = "
        SELECT d.id_disciplina, d.nome_disciplina as nome_disciplina
        FROM professordisciplina pd
        INNER JOIN disciplina d ON d.id_disciplina = pd.id_disciplina
        WHERE pd.id_professor = :id_professor
    ";
    
    $stmt = $this->conn->prepare($sql);
    $stmt->bindValue(':id_professor', $idProfessor, PDO::PARAM_INT);
    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_ASSOC); 
}


    public function getAllProfessorDisciplinas(): array {
        $sql = "SELECT * FROM professordisciplina";
        $stmt = $this->conn->query($sql);
        $lecionas = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $lecionas[] = $this->mapRowToProfessorDisciplina($row);
        }
        return $lecionas;
    }

    public function excluirProfessorDisciplina(int $idDisciplina, int $idProfessor): bool {
        $sql = "DELETE FROM professordisciplina 
                WHERE id_disciplina = :id_disciplina AND id_professor = :id_professor";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_disciplina', $idDisciplina, PDO::PARAM_INT);
        $stmt->bindValue(':id_professor', $idProfessor, PDO::PARAM_INT);
        return $stmt->execute();
    }
    
    private function mapRowToProfessorDisciplina(array $row): ProfessorDisciplina {
        $leciona = new ProfessorDisciplina();
        $leciona->setIdDisciplina($row['id_disciplina'] ?? null)
        ->setIdProfessor($row['id_professor'] ?? null);
        return $leciona;
    }
}
