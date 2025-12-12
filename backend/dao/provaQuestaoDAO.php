<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/provaQuestao.php';

use Models\ProvaQuestao;

class ProvaQuestaoDAO {
    private $conn;

    public function __construct() {
        $this->conn = Database::getInstance()->getConnection();
    }

    public function criarProvaQuestao(ProvaQuestao $leciona): bool {
        $sql = "INSERT INTO provaquestao (id_prova, id_questao)
                VALUES (:id_prova, :id_questao)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_prova', $leciona->getIdProva(), PDO::PARAM_INT);
        $stmt->bindValue(':id_questao', $leciona->getIdQuestao(), PDO::PARAM_INT);
        return $stmt->execute();
    }

    public function getProvaQuestaoById(int $idTurma, int $idProfesor): ?ProvaQuestao {
        $sql = "SELECT * FROM provaquestao 
                WHERE id_prova = :id_prova AND id_questao = :id_questao";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_prova', $idTurma, PDO::PARAM_INT);
        $stmt->bindValue(':id_questao', $idProfesor, PDO::PARAM_INT);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row) return null;
        return $this->mapRowToProvaQuestao($row);
    }

    public function getAllProvaQuestaos(): array {
        $sql = "SELECT * FROM provaquestao";
        $stmt = $this->conn->query($sql);
        $lecionas = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $lecionas[] = $this->mapRowToProvaQuestao($row);
        }
        return $lecionas;
    }

    public function excluirProvaQuestao(int $idTurma, int $idProfessor): bool {
        $sql = "DELETE FROM provaquestao 
                WHERE id_prova = :id_prova AND id_questao = :id_questao";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_prova', $idTurma, PDO::PARAM_INT);
        $stmt->bindValue(':id_questao', $idProfessor, PDO::PARAM_INT);
        return $stmt->execute();
    }

    private function mapRowToProvaQuestao(array $row): ProvaQuestao {
        $leciona = new ProvaQuestao();
        $leciona->setIdProva($row['id_prova'])
                 ->setIdQuestao($row['id_questao']);
        return $leciona;
    }
}
