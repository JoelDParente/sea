<?php
// dao/AlternativaDAO.php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/alternativa.php';

use Models\Alternativa;
use Models\Questao;

class AlternativaDAO
{
    private $conn;

    public function __construct()
    {
        $this->conn = Database::getInstance()->getConnection();
    }

    public function criarAlternativa(Alternativa $alternativa): int
    {
        $sql = "INSERT INTO alternativas (id_alternativa, id_questao, texto)
                VALUES (:id_alternativa, :id_questao, :texto)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_alternativa', $alternativa->getIdAlternativa(), PDO::PARAM_INT);
        $stmt->bindValue(':id_questao', $alternativa->getIdQuestao(), PDO::PARAM_INT);
        $stmt->bindValue(':texto', $alternativa->getTexto(), PDO::PARAM_STR);


        $stmt->execute();
        return (int)$this->conn->lastInsertId();
    }

    public function getAlternativaByIdQuestao(int $id_questao): array
    {
        $sql = "SELECT texto FROM alternativas WHERE id_questao = :id_questao ORDER BY id_alternativa ASC";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_questao', $id_questao, PDO::PARAM_INT);
        $stmt->execute();
        $alternativas = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $alternativas[] = [
                'texto' => $row['texto']
            ];
        }
        return $alternativas;
    }

    public function getAllAlternativa(): array
    {
        $sql = "SELECT * FROM alternativas";
        $stmt = $this->conn->query($sql);
        $alternativa = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $alternativa[] = $this->mapRowToAlternativa($row);
        }
        return $alternativa;
    }

    public function atualizarAlternativa(Alternativa $alternativa): bool
    {
        $sql = "UPDATE alternativas SET id_alternativa = :id_alternativa, id_questao = :id_questao, texto = :texto
                WHERE id_alternativa = :id_alternativa";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_alternativa', $alternativa->getIdAlternativa(), PDO::PARAM_INT);
        $stmt->bindValue(':id_questao', $alternativa->getIdQuestao(), PDO::PARAM_INT);
        $stmt->bindValue(':texto', $alternativa->getTexto(), PDO::PARAM_STR);
        return $stmt->execute();
    }

    public function excluirAlternativa(int $id_alternativa): bool
    {
        $sql = "DELETE FROM alternativas WHERE id_alternativa = :id_alternativa";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_alternativa', $id_alternativa, PDO::PARAM_INT);
        return $stmt->execute();
    }
    
    private function mapRowToAlternativa(array $row): Alternativa
    {
        $alternativa = new Alternativa();
        $alternativa->setIdAlternativa($row['id_alternativa'])
            ->setIdQuestao($row['id_questao'])
            ->setTexto($row['texto']);
        return $alternativa;
    }
}
