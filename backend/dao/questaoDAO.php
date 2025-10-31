<?php
// dao/QuestaoDAO.php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/questao.php';

use Models\Questao;

class QuestaoDAO {
    private $conn;

    public function __construct() {
        $this->conn = Database::getInstance()->getConnection();
    }

    public function criarQuestao(Questao $questao): int {
        $sql = "INSERT INTO questao (id_assunto, uid_professor, enunciado, resposta_correta, tipo, publico, data_criacao, ultima_atualizacao)
                VALUES (:id_assunto, :uid_professor, :enunciado, :resposta_correta, :tipo, :publico, :data_criacao, :ultima_atualizacao)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_assunto', $questao->getIdAssunto(), PDO::PARAM_INT);
        $stmt->bindValue(':uid_professor', $questao->getIdProfessor(), PDO::PARAM_INT);
        $stmt->bindValue(':enunciado', $questao->getEnunciado(), PDO::PARAM_STR);
        $stmt->bindValue(':resposta_correta', $questao->getRespostaCorreta(), PDO::PARAM_STR);
        $stmt->bindValue(':tipo', $questao->getTipo(), PDO::PARAM_STR);
        $stmt->bindValue(':publico', $questao->getPublico(), PDO::PARAM_BOOL);
        $stmt->bindValue(':data_criacao', $questao->getDataCriacao(), PDO::PARAM_STR);
        $stmt->bindValue(':ultima_atualizacao', $questao->getUltimaAtualizacao(), PDO::PARAM_STR);

        $stmt->execute();
        return (int)$this->conn->lastInsertId();
    }

    public function getQuestaoById(int $id_questao): ?Questao {
        $sql = "SELECT * FROM questao WHERE id_questao = :id_questao";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_questao', $id_questao, PDO::PARAM_INT);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row) return null;
        return $this->mapRowToQuestao($row);
    }

    public function getAllQuestaos(): array {
        $sql = "SELECT * FROM questao";
        $stmt = $this->conn->query($sql);
        $questaos = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $questaos[] = $this->mapRowToQuestao($row);
        }
        return $questaos;
    }

    public function atualizarQuestao(Questao $questao): bool {
        $sql = "UPDATE questao SET id_assunto = :id_assunto, uid_professor = :uid_professor, enunciado = :enunciado, resposta_correta = :resposta_correta, tipo = :tipo, publico = :publico, data_criacao = :data_criacao, ultima_atualizacao = :ultima_atualizacao
                WHERE id_questao = :id_questao";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_assunto', $questao->getIdAssunto(), PDO::PARAM_INT);
        $stmt->bindValue(':uid_professor', $questao->getIdProfessor(), PDO::PARAM_INT);
        $stmt->bindValue(':enunciado', $questao->getEnunciado(), PDO::PARAM_STR);
        $stmt->bindValue(':resposta_correta', $questao->getRespostaCorreta(), PDO::PARAM_STR);
        $stmt->bindValue(':tipo', $questao->getTipo(), PDO::PARAM_STR);
        $stmt->bindValue(':publico', $questao->getPublico(), PDO::PARAM_BOOL);
        $stmt->bindValue(':data_criacao', $questao->getDataCriacao(), PDO::PARAM_STR);
        $stmt->bindValue(':ultima_atualizacao', $questao->getUltimaAtualizacao(), PDO::PARAM_STR);
        $stmt->bindValue(':id_questao', $questao->getIdQuestao(), PDO::PARAM_INT);

        return $stmt->execute();
    }

    public function excluirQuestao(int $id_questao): bool {
        $sql = "DELETE FROM questao WHERE id_questao = :id_questao";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_questao', $id_questao, PDO::PARAM_INT);
        return $stmt->execute();
    }

    private function mapRowToQuestao(array $row): Questao {
        $questao = new Questao();
        $questao->setIdQuestao($row['id_questao'])
                ->setIdAssunto($row['id_assunto'])
                ->setIdProfessor($row['uid_professor'])
                ->setEnunciado($row['enunciado'])
                ->setRespostaCorreta($row['resposta_correta'])
                ->setTipo($row['tipo'])
                ->setPublico($row['publico'])
                ->setDataCriacao($row['data_criacao'])
                ->setUltimaAtualizacao($row['ultima_atualizacao']);
        return $questao;
    }
}
