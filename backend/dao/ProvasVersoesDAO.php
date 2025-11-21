<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/ProvasVersoes.php';

use Models\ProvasVersoes;

class ProvasVersoesDAO {
    private $conn;

    public function __construct() {
        $this->conn = Database::getInstance()->getConnection();
    }

    public function criarVersao(ProvasVersoes $versao) {
        $sql = "INSERT INTO provas_versoes (id_prova, codigo_versao)
                VALUES (:id_prova, :codigo_versao)";
        
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_prova', $versao->getIdProva());
        $stmt->bindValue(':codigo_versao', $versao->getCodigoVersao());

        $stmt->execute();
        return $this->conn->lastInsertId();
    }

    public function listarPorProva($id_prova) {
        $stmt = $this->conn->prepare("SELECT * FROM provas_versoes WHERE id_prova = :id");
        $stmt->bindValue(':id', $id_prova);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function buscarPorId($id_versao) {
        $stmt = $this->conn->prepare("SELECT * FROM provas_versoes WHERE id_versao = :id");
        $stmt->bindValue(':id', $id_versao);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function excluirVersao($id_versao) {
        $stmt = $this->conn->prepare("DELETE FROM provas_versoes WHERE id_versao = :id");
        $stmt->bindValue(':id', $id_versao);
        return $stmt->execute();
    }
}
