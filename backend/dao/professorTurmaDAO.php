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

    public function criarProfessorTurma(ProfessorTurma $leciona): bool {
        $sql = "INSERT INTO professorturma (id_turma, id_professor)
                VALUES (:id_turma, :id_professor)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_turma', $leciona->getIdTurma(), PDO::PARAM_INT);
        $stmt->bindValue(':id_professor', $leciona->getIdProfessor(), PDO::PARAM_INT);
        return $stmt->execute();
    }

    public function getProfessorTurmaById(int $idTurma, int $idProfesor): ?ProfessorTurma {
        $sql = "SELECT * FROM professorturma 
                WHERE id_turma = :id_turma AND id_professor = :id_professor";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_turma', $idTurma, PDO::PARAM_INT);
        $stmt->bindValue(':id_professor', $idProfesor, PDO::PARAM_INT);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row) return null;
        return $this->mapRowToProfessorTurma($row);
    }

    public function getAllProfessorTurmas(): array {
        $sql = "SELECT * FROM professorturma";
        $stmt = $this->conn->query($sql);
        $lecionas = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $lecionas[] = $this->mapRowToProfessorTurma($row);
        }
        return $lecionas;
    }

    public function getTurmaByProfessorId(int $idProfessor): array {
        $sql = "
            SELECT t.id_turma, t.nome_turma, t.serie, t.turno
            FROM professorturma pt
            INNER JOIN turma t ON t.id_turma = pt.id_turma
            WHERE pt.id_professor = :id_professor
        ";
        
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_professor', $idProfessor, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC); 
    }


    public function excluirProfessorTurma(int $idTurma, int $idProfessor): bool {
        $sql = "DELETE FROM professorturma 
                WHERE id_turma = :id_turma AND id_professor = :id_professor";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_turma', $idTurma, PDO::PARAM_INT);
        $stmt->bindValue(':id_professor', $idProfessor, PDO::PARAM_INT);
        return $stmt->execute();
    }

    private function mapRowToProfessorTurma(array $row): ProfessorTurma {
        $leciona = new ProfessorTurma();
        $leciona->setidTurma($row['id_turma'])
                 ->setIdProfessor($row['id_professor']);
        return $leciona;
    }
}
