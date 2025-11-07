<?php
// dao/EscolaDAO.php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/escola.php';

use Models\Escola;

class EscolaDAO {
    private $conn;

    public function __construct() {
        $this->conn = Database::getInstance()->getConnection();
    }

    // CREATE
    public function criarEscola(Escola $escola): int {
        $sql = "INSERT INTO escola (inep, nome_escola, email, telefone, logo, estado, cidade, bairro, rua, num)
                VALUES (:inep, :nome_escola, :email, :telefone, :logo, :estado, :cidade, :bairro, :rua, :num)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':inep', $escola->getInep(), PDO::PARAM_STR);
        $stmt->bindValue(':nome_escola', $escola->getNomeEscola(), PDO::PARAM_STR);
        $stmt->bindValue(':email', $escola->getEmail(), PDO::PARAM_STR);
        $stmt->bindValue(':telefone', $escola->getTelefone(), PDO::PARAM_STR);
        $stmt->bindValue(':logo', $escola->getLogo(), PDO::PARAM_STR);
        $stmt->bindValue(':estado', $escola->getEstado(), PDO::PARAM_STR);
        $stmt->bindValue(':cidade', $escola->getCidade(), PDO::PARAM_STR);
        $stmt->bindValue(':bairro', $escola->getBairro(), PDO::PARAM_STR);
        $stmt->bindValue(':rua', $escola->getRua(), PDO::PARAM_STR);
        $stmt->bindValue(':num', $escola->getNumero(), PDO::PARAM_STR);

        $stmt->execute();
        return (int)$this->conn->lastInsertId();
    }

    // READ por ID
    public function getEscolaById(int $id): ?Escola {
        $sql = "SELECT * FROM escola WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row) return null;
        return $this->mapRowToEscola($row);
    }

    // READ todos
    public function getAllEscolas(): array {
        $sql = "SELECT * FROM escola";
        $stmt = $this->conn->query($sql);
        $escolas = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $escolas[] = $this->mapRowToEscola($row);
        }
        return $escolas;
    }

    // UPDATE
    public function atualizarEscola(Escola $escola): bool {
        $sql = "UPDATE escola SET inep = :inep, nome_escola = :nome_escola, email = :email, telefone = :telefone, logo = :logo, estado = :estado, cidade = :cidade, bairro = :bairro, rua = :rua, num = :num
                WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':inep', $escola->getInep(), PDO::PARAM_STR);
        $stmt->bindValue(':nome_escola', $escola->getNomeEscola(), PDO::PARAM_STR);
        $stmt->bindValue(':email', $escola->getEmail(), PDO::PARAM_STR);
        $stmt->bindValue(':telefone', $escola->getTelefone(), PDO::PARAM_STR);
        $stmt->bindValue(':logo', $escola->getLogo(), PDO::PARAM_STR);
        $stmt->bindValue(':estado', $escola->getEstado(), PDO::PARAM_STR);
        $stmt->bindValue(':cidade', $escola->getCidade(), PDO::PARAM_STR);
        $stmt->bindValue(':bairro', $escola->getBairro(), PDO::PARAM_STR);
        $stmt->bindValue(':rua', $escola->getRua(), PDO::PARAM_STR);
        $stmt->bindValue(':num', $escola->getNumero(), PDO::PARAM_STR);

        return $stmt->execute();
    }

    // DELETE
    public function excluirEscola(int $id): bool {
        $sql = "DELETE FROM escola WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        return $stmt->execute();
    }

    private function mapRowToEscola(array $row): Escola {
        $escola = new Escola();
        $escola->setId($row['id_escola'])
                ->setNomeEscola($row['nome_escola'])
                ->setEmail($row['email'])
                ->setTelefone($row['telefone'])
                ->setLogo($row['logo'])
                ->setEstado($row['estado'])
                ->setCidade($row['cidade'])
                ->setBairro($row['bairro'])
                ->setRua($row['rua'])
                ->setNumero($row['num']);
        return $escola;
    }
}
