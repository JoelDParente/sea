<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/imagemQuestao.php';

use Models\ImagemQuestao;

class ImagemQuestaoDAO {

    private $conn;

    public function __construct() {
        $this->conn = Database::getInstance()->getConnection();
    }

    public function criarImagem(ImagemQuestao $imagem) {
        $sql = "INSERT INTO imagemquestao (id_questao, caminho_imagem)
                VALUES (:id_questao, :caminho_imagem)";
        
        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(':id_questao', $imagem->getIdQuestao());
        $stmt->bindValue(':caminho_imagem', $imagem->getCaminhoImagem());

        return $stmt->execute();
    }

    public function buscarImagemPorId($idImagem) {
        $sql = "SELECT * FROM imagemquestao WHERE id_imagem = :id_imagem";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_imagem', $idImagem);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$row) return null;

        return $this->mapearImagem($row);
    }

    public function listarImagemPorQuestao($idQuestao) {
        $sql = "SELECT * FROM imagemquestao WHERE id_questao = :id_questao";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_questao', $idQuestao);
        $stmt->execute();

        $dados = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $imagens = [];

        foreach ($dados as $row) {
            $imagens[] = $this->mapearImagem($row);
        }

        return $imagens;
    }

    public function atualizarImagem(ImagemQuestao $imagem) {
        $sql = "UPDATE imagemquestao 
                SET id_questao = :id_questao,
                    caminho_imagem = :caminho_imagem
                WHERE id_imagem = :id_imagem";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(':id_imagem', $imagem->getIdImagem());
        $stmt->bindValue(':id_questao', $imagem->getIdQuestao());
        $stmt->bindValue(':caminho_imagem', $imagem->getCaminhoImagem());

        return $stmt->execute();
    }

    public function deletarImagem($idImagem) {
        $sql = "DELETE FROM imagemquestao WHERE id_imagem = :id_imagem";

        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_imagem', $idImagem);

        return $stmt->execute();
    }

    private function mapearImagem(array $row) {
        $imagem = new ImagemQuestao();

        $imagem->setIdImagem($row["id_imagem"]);
        $imagem->setIdQuestao($row["id_questao"]);
        $imagem->setCaminhoImagem($row["caminho_imagem"]);

        return $imagem;
    }
}
