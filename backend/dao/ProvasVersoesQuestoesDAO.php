<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/ProvasVersoesQuestoes.php';

use Models\ProvasVersoesQuestoes;

class ProvasVersoesQuestoesDAO {
    private $conn;

    public function __construct() {
        $this->conn = Database::getInstance()->getConnection();
    }

    public function adicionarQuestao(ProvasVersoesQuestoes $vq) {
        $sql = "INSERT INTO provas_versoes_questoes (id_versao, id_questao, ordem)
                VALUES (:id_versao, :id_questao, :ordem)";
        
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_versao', $vq->getIdVersao());
        $stmt->bindValue(':id_questao', $vq->getIdQuestao());
        $stmt->bindValue(':ordem', $vq->getOrdem());

        return $stmt->execute();
    }

    public function listarQuestoesDaVersao($id_versao) {
        $sql = "SELECT q.*, pvq.ordem
                FROM provas_versoes_questoes pvq
                INNER JOIN questao q ON q.id_questao = pvq.id_questao
                WHERE pvq.id_versao = :id_versao
                ORDER BY pvq.ordem ASC";
        
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_versao', $id_versao);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function excluirQuestoesDaVersao($id_versao) {
        $stmt = $this->conn->prepare("DELETE FROM provas_versoes_questoes WHERE id_versao = :id");
        $stmt->bindValue(':id', $id_versao);
        return $stmt->execute();
    }
}
