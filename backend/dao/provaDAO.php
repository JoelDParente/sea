<?php
// dao/ProvaDAO.php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/prova.php';

use Models\Prova;

class ProvaDAO {
    private $conn;

    public function __construct() {
        $this->conn = Database::getInstance()->getConnection();
    }

    public function criarProva(Prova $prova): int {
        $sql = "INSERT INTO prova (uid_professor, titulo, versao, data_criacao, ultima_atualizacao)
                VALUES (:uid_professor, :titulo, :versao, :data_criacao, :ultima_atualizacao)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':uid_professor', $prova->getIdProfessor(), PDO::PARAM_INT);
        $stmt->bindValue(':titulo', $prova->getTitulo(), PDO::PARAM_STR);
        $stmt->bindValue(':versao', $prova->getVersao(), PDO::PARAM_STR);
        $stmt->bindValue(':data_criacao', $prova->getDataCriacao(), PDO::PARAM_STR);
        $stmt->bindValue(':ultima_atualizacao', $prova->getUltimaAtualizacao(), PDO::PARAM_STR);

        $stmt->execute();
        return (int)$this->conn->lastInsertId();
    }

    public function getProvaById(int $id_prova): ?Prova {
        $sql = "SELECT * FROM prova WHERE id_prova = :id_prova";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_prova', $id_prova, PDO::PARAM_INT);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row) return null;
        return $this->mapRowToProva($row);
    }

    public function getAllProvas(): array {
        $sql = "SELECT * FROM prova";
        $stmt = $this->conn->query($sql);
        $provas = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $provas[] = $this->mapRowToProva($row);
        }
        return $provas;
    }

    public function atualizarProva(Prova $prova): bool {
        $sql = "UPDATE prova SET uid_professor = :uid_professor, titulo = :titulo, versao = :versao, data_criacao = :data_criacao, ultima_atualizacao = :ultima_atualizacao
                WHERE id_prova = :id_prova";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':uid_professor', $prova->getIdProfessor(), PDO::PARAM_INT);
        $stmt->bindValue(':titulo', $prova->getTitulo(), PDO::PARAM_STR);
        $stmt->bindValue(':versao', $prova->getVersao(), PDO::PARAM_STR);
        $stmt->bindValue(':data_criacao', $prova->getDataCriacao(), PDO::PARAM_STR);
        $stmt->bindValue(':ultima_atualizacao', $prova->getUltimaAtualizacao(), PDO::PARAM_STR);
        $stmt->bindValue(':id_prova', $prova->getIdProva(), PDO::PARAM_INT);

        return $stmt->execute();
    }

    public function excluirProva(int $uid): bool {
        $sql = "DELETE FROM prova WHERE uid = :uid";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':uid', $uid, PDO::PARAM_INT);
        return $stmt->execute();
    }

    private function mapRowToProva(array $row): Prova {
        $prova = new Prova();
        $prova->setIdProva($row['id_prova'])
                ->setIdProfessor($row['uid_professor'])
                ->setTitulo($row['titulo'])
                ->setVersao($row['versao'])
                ->setDataCriacao($row['data_criacao'])
                ->setUltimaAtualizacao($row['ultima_atualizacao']);
        return $prova;
    }
}
