<?php
// dao/TurmaDAO.php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../model/turma.php';

use Models\Turma;

class TurmaDAO {
    private $conn;

    public function __construct() {
        $this->conn = Database::getInstance()->getConnection();
    }

    public function criarTurma(Turma $turma): int {
        $sql = "INSERT INTO turma (id_escola, nome_turma, serie, turno)
                VALUES (:id_escola, :nome_turma, :serie, :turno)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_escola', $turma->getIdEscola(), PDO::PARAM_INT);
        $stmt->bindValue(':nome_turma', $turma->getNomeTurma(), PDO::PARAM_STR);
        $stmt->bindValue(':serie', $turma->getSerie(), PDO::PARAM_STR);
        $stmt->bindValue(':turno', $turma->getTurno(), PDO::PARAM_STR);

        $stmt->execute();
        return (int)$this->conn->lastInsertId();
    }

    public function getTurmaById(int $uid): ?Turma {
        $sql = "SELECT * FROM turma WHERE id_turma = :id_turma";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_turma', $uid, PDO::PARAM_INT);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row) return null;
        return $this->mapRowToTurma($row);
    }

    public function getAllTurmas(): array {
        $sql = "SELECT * FROM turma";
        $stmt = $this->conn->query($sql);
        $turmas = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $turmas[] = $this->mapRowToTurma($row);
        }
        return $turmas;
    }

    public function atualizarTurma(Turma $turma): bool {
        $sql = "UPDATE turma SET id_escola = :id_escola, nome_turma = :nome_turma, serie = :serie, turno = :turno
                WHERE id_turma = :id_turma";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_escola', $turma->getIdEscola(), PDO::PARAM_INT);
        $stmt->bindValue(':nome_turma', $turma->getNomeTurma(), PDO::PARAM_STR);
        $stmt->bindValue(':serie', $turma->getSerie(), PDO::PARAM_STR);
        $stmt->bindValue(':turno', $turma->getTurno(), PDO::PARAM_STR);


        return $stmt->execute();
    }

    public function excluirTurma(int $uid): bool {
        $sql = "DELETE FROM turma WHERE uid = :uid";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':uid', $uid, PDO::PARAM_INT);
        return $stmt->execute();
    }

    private function mapRowToTurma(array $row): Turma {
        $turma = new Turma();
        $turma->setIdTurma($row['uid'])
                ->setIdEscola($row['id_escola'])
                ->setNomeTurma($row['nome_turma'])
                ->setSerie($row['serie'])
                ->setTurno($row['turno']);
        return $turma;
    }
}
