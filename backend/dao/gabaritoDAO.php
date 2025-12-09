<?php
// dao/GabaritoDAO.php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/gabarito.php';

use Models\Gabarito;

class GabaritoDAO {
    private $conn;

    public function __construct() {
        $this->conn = Database::getInstance()->getConnection();
    }

    public function criarGabarito(Gabarito $gabarito): int {
        $sql = "INSERT INTO gabarito (id_prova, questao, alternativa, versao)
            VALUES (:id_prova, :questao, :alternativa, :versao)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_prova', $gabarito->getIdProva(), PDO::PARAM_INT);
        $stmt->bindValue(':questao', $gabarito->getQuestao(), PDO::PARAM_INT);
        $stmt->bindValue(':alternativa', $gabarito->getAlternativa(), PDO::PARAM_STR);
        $stmt->bindValue(':versao', $gabarito->getVersao(), PDO::PARAM_STR);

        $stmt->execute();
        return (int)$this->conn->lastInsertId();
    }

    public function getGabaritoById(int $id_gabarito): ?Gabarito {
        $sql = "SELECT * FROM gabarito WHERE id_gabarito = :id_gabarito";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_gabarito', $id_gabarito, PDO::PARAM_INT);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row) return null;
        return $this->mapRowToGabarito($row);
    }

    public function getAllGabaritos(): array {
        $sql = "SELECT * FROM gabarito";
        $stmt = $this->conn->query($sql);
        $gabaritos = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $gabaritos[] = $this->mapRowToGabarito($row);
        }
        return $gabaritos;
    }

    public function getGabaritoByProva(int $id_prova): array {
        $sql = "SELECT questao, alternativa, versao FROM gabarito WHERE id_prova = :id_prova ORDER BY questao ASC";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_prova', $id_prova, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function atualizarGabarito(Gabarito $gabarito): bool {
        $sql = "UPDATE gabarito SET id_gabarito = :id_gabarito, id_prova = :id_prova, questao = :questao, alternativa = :alternativa, versao = :versao
                WHERE id_gabarito = :id_gabarito";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_gabarito', $gabarito->getIdGabarito(), PDO::PARAM_INT);
        $stmt->bindValue(':id_prova', $gabarito->getIdProva(), PDO::PARAM_INT);
        $stmt->bindValue(':questao', $gabarito->getQuestao(), PDO::PARAM_INT);
        $stmt->bindValue(':alternativa', $gabarito->getAlternativa(), PDO::PARAM_STR);
        $stmt->bindValue(':versao', $gabarito->getVersao(), PDO::PARAM_STR);

        return $stmt->execute();
    }

    public function excluirGabarito(int $id_gabarito): bool {
        $sql = "DELETE FROM gabarito WHERE id_gabarito = :id_gabarito";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_gabarito', $id_gabarito, PDO::PARAM_INT);
        return $stmt->execute();
    }

    private function mapRowToGabarito(array $row): Gabarito {
        $gabarito = new Gabarito();
        $gabarito->setIdGabarito($row['id_gabarito'])
        ->setVersao($row['id_prova'])
        ->setQuestao($row['questao'])
        ->setAlternativa($row['alternativa'])
        ->setVersao($row['versao']);
        return $gabarito;
    }
}
