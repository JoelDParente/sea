<?php
// dao/DisciplinaDAO.php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/disciplina.php';

use Models\Disciplina;

class DisciplinaDAO {
    private $conn;

    public function __construct() {
        $this->conn = Database::getInstance()->getConnection();
    }

    public function criarDisciplina(Disciplina $disciplina): int {
        $sql = "INSERT INTO disciplina (id_disciplina, nome_disciplina, descricao)
                VALUES (:id_disciplina, :nome_disciplina, :descricao)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_disciplina', $disciplina->getIdDisciplina(), PDO::PARAM_INT);
        $stmt->bindValue(':nome_disciplina', $disciplina->getNomeDisciplina(), PDO::PARAM_STR);
        $stmt->bindValue(':descricao', $disciplina->getDescricao(), PDO::PARAM_STR);


        $stmt->execute();
        return (int)$this->conn->lastInsertId();
    }

    public function getDisciplinaById(int $id_disciplina): ?Disciplina {
        $sql = "SELECT * FROM disciplina WHERE id_disciplina = :id_disciplina";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_disciplina', $id_disciplina, PDO::PARAM_INT);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row) return null;
        return $this->mapRowToDisciplina($row);
    }

    public function getAllDisciplinas(): array {
            $sql = "SELECT * FROM disciplina";
            try {
                $stmt = $this->conn->prepare($sql);
                $stmt->execute();
                $disciplinas = [];
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $disciplinas[] = $this->mapRowToDisciplina($row);
                }
                return $disciplinas;
            } catch (PDOException $e) {
                throw new Exception('Erro ao obter disciplinas: ' . $e->getMessage());
            }
    }

    public function atualizarDisciplina(Disciplina $disciplina): bool {
        $sql = "UPDATE disciplina SET id_disciplina = :id_disciplina, nome_disciplina = :nome_disciplina, descricao = :descricao
                WHERE id_disciplina = :id_disciplina";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_disciplina', $disciplina->getIdDisciplina(), PDO::PARAM_INT);
        $stmt->bindValue(':nome_disciplina', $disciplina->getNomeDisciplina(), PDO::PARAM_STR);
        $stmt->bindValue(':descricao', $disciplina->getDescricao(), PDO::PARAM_STR);

        return $stmt->execute();
    }

    public function excluirDisciplina(int $id_disciplina): bool {
        $sql = "DELETE FROM disciplina WHERE id_disciplina = :id_disciplina";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_disciplina', $id_disciplina, PDO::PARAM_INT);
        return $stmt->execute();
    }

    private function mapRowToDisciplina(array $row): Disciplina {
        $disciplina = new Disciplina();
        $disciplina->setIdDisciplina($row['id_disciplina'])
                ->setNomeDisciplina($row['nome_disciplina'])
                ->setDescricao($row['descricao']);
        return $disciplina;
    }
}
