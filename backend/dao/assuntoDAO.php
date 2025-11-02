<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/assunto.php';

use Models\Assunto;

class AssuntoDAO {
    private $conn;

    public function __construct()
    {
        $this->conn = Database::getInstance()->getConnection();
    }

    public function listarTodos() {
        $stmt = $this->conn->query("
            SELECT a.*, c.nome_categoria 
            FROM assunto a
            JOIN categoria c ON a.id_categoria = c.id_categoria
        ");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function listarPorCategoria($id_categoria) {
        $stmt = $this->conn->prepare("
            SELECT a.*, c.nome_categoria 
            FROM assunto a
            JOIN categoria c ON a.id_categoria = c.id_categoria
            WHERE a.id_categoria = ?
        ");
        $stmt->execute([$id_categoria]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function criar($assunto) {
        $stmt = $this->conn->prepare("
            INSERT INTO assunto (id_categoria, nome_assunto) VALUES (?, ?)
        ");
        return $stmt->execute([$assunto->id_categoria, $assunto->nome_assunto]);
    }
}
