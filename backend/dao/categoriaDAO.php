<?php
// dao/CategoriaDAO.php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/categoria.php';

use Models\Categoria;

class CategoriaDAO
{
    private $conn;

    public function __construct()
    {
        $this->conn = Database::getInstance()->getConnection();
    }

    public function criarCategoria(Categoria $categoria): int
    {
        $sql = "INSERT INTO categoria (id_categoria, id_disciplina, nome_categoria)
                VALUES (:id_categoria, :id_disciplina, :nome_categoria)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_categoria', $categoria->getIdCategoria(), PDO::PARAM_INT);
        $stmt->bindValue(':id_disciplina', $categoria->getIdDisciplina(), PDO::PARAM_INT);
        $stmt->bindValue(':nome_categoria', $categoria->getNomeCategoria(), PDO::PARAM_STR);


        $stmt->execute();
        return (int)$this->conn->lastInsertId();
    }

    public function getCategoriaById(int $id_categoria): ?Categoria
    {
        $sql = "SELECT * FROM categoria WHERE id_categoria = :id_categoria";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_categoria', $id_categoria, PDO::PARAM_INT);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row) return null;
        return $this->mapRowToCategoria($row);
    }

    public function getAllCategorias(): array
    {
        $sql = "SELECT * FROM categoria";
        $stmt = $this->conn->query($sql);
        $categorias = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $categorias[] = $this->mapRowToCategoria($row);
        }
        return $categorias;
    }

    public function atualizarCategoria(Categoria $categoria): bool
    {
        $sql = "UPDATE categoria SET id_categoria = :id_categoria, id_disciplina = :id_disciplina, nome_categoria = :nome_categoria
                WHERE id_categoria = :id_categoria";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_categoria', $categoria->getIdCategoria(), PDO::PARAM_INT);
        $stmt->bindValue(':id_disciplina', $categoria->getIdDisciplina(), PDO::PARAM_INT);
        $stmt->bindValue(':nome_categoria', $categoria->getNomeCategoria(), PDO::PARAM_STR);

        return $stmt->execute();
    }

    public function excluirCategoria(int $id_categoria): bool
    {
        $sql = "DELETE FROM categoria WHERE id_categoria = :id_categoria";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_categoria', $id_categoria, PDO::PARAM_INT);
        return $stmt->execute();
    }

    private function mapRowToCategoria(array $row): Categoria
    {
        $categoria = new Categoria();
        $categoria->setIdCategoria($row['id_categoria'])
            ->setIdDisciplina($row['id_disciplina'])
            ->setNomeCategoria($row['nome_categoria']);
        return $categoria;
    }
}
