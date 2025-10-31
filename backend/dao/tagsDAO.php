<?php
// dao/TagsDAO.php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/tags.php';

use Models\Tags;

class TagsDAO
{
    private $conn;

    public function __construct()
    {
        $this->conn = Database::getInstance()->getConnection();
    }

    public function criarTags(Tags $tags): int
    {
        $sql = "INSERT INTO tags (id_tag, nome)
                VALUES (:id_tag, :nome)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_tags', $tags->getIdTag(), PDO::PARAM_INT);
        $stmt->bindValue(':nome', $tags->getNomeTag(), PDO::PARAM_STR);


        $stmt->execute();
        return (int)$this->conn->lastInsertId();
    }

    public function getTagsById(int $id_tags): ?Tags
    {
        $sql = "SELECT * FROM tags WHERE id_tag = :id_tag";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_tag', $id_tags, PDO::PARAM_INT);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row) return null;
        return $this->mapRowToTags($row);
    }

    public function getAllTags(): array
    {
        $sql = "SELECT * FROM tags";
        $stmt = $this->conn->query($sql);
        $tags = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $tags[] = $this->mapRowToTags($row);
        }
        return $tags;
    }

    public function atualizarTags(Tags $tags): bool
    {
        $sql = "UPDATE tags SET id_tag = :id_tag, nome = :nome
                WHERE id_tag = :id_tag";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_tag', $tags->getIdTag(), PDO::PARAM_INT);
        $stmt->bindValue(':nome', $tags->getNomeTag(), PDO::PARAM_STR);

        return $stmt->execute();
    }

    public function excluirTags(int $id_tags): bool
    {
        $sql = "DELETE FROM tags WHERE id_tag = :id_tag";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_tag', $id_tags, PDO::PARAM_INT);
        return $stmt->execute();
    }

    private function mapRowToTags(array $row): Tags
    {
        $tags = new Tags();
        $tags->setIdTag($row['id_tag'])
            ->setNomeTag($row['nome']);
        return $tags;
    }
}
