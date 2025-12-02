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
        $sql = "INSERT INTO alternativas (id_alternativa, id_questao, texto, caminho_imagem)
            VALUES (:id_alternativa, :id_questao, :texto, :caminho_imagem)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_alternativa', $alternativa->getIdAlternativa(), PDO::PARAM_INT);
        $stmt->bindValue(':id_questao', $alternativa->getIdQuestao(), PDO::PARAM_INT);
        $stmt->bindValue(':texto', $alternativa->getTexto(), PDO::PARAM_STR);
        $stmt->bindValue(':caminho_imagem', $alternativa->getCaminhoImagem(), PDO::PARAM_STR);


        $stmt->execute();
        return (int)$this->conn->lastInsertId();
    }

    public function getAlternativaByIdQuestao(int $id_questao): array
    {
        $sql = "SELECT id_alternativa, id_questao, texto, caminho_imagem FROM alternativas WHERE id_questao = :id_questao ORDER BY id_alternativa ASC";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_questao', $id_questao, PDO::PARAM_INT);
        $stmt->execute();
        $alternativas = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $alternativas[] = [
                'id_alternativa' => $row['id_alternativa'],
                'id_questao' => $row['id_questao'],
                'texto' => $row['texto'],
                'caminho_imagem' => $row['caminho_imagem'] ?? null
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
        $sql = "UPDATE alternativas SET id_alternativa = :id_alternativa, id_questao = :id_questao, texto = :texto, caminho_imagem = :caminho_imagem
                WHERE id_alternativa = :id_alternativa";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_alternativa', $alternativa->getIdAlternativa(), PDO::PARAM_INT);
        $stmt->bindValue(':id_questao', $alternativa->getIdQuestao(), PDO::PARAM_INT);
        $stmt->bindValue(':texto', $alternativa->getTexto(), PDO::PARAM_STR);
        $stmt->bindValue(':caminho_imagem', $alternativa->getCaminhoImagem(), PDO::PARAM_STR);
        return $stmt->execute();
    }

    public function excluirAlternativa(int $id_alternativa): bool
    {
        // attempt to remove file from uploads if exists
        $sqlSel = "SELECT caminho_imagem FROM alternativas WHERE id_alternativa = :id_alternativa";
        $stmtSel = $this->conn->prepare($sqlSel);
        $stmtSel->bindValue(':id_alternativa', $id_alternativa, PDO::PARAM_INT);
        $stmtSel->execute();
        $row = $stmtSel->fetch(PDO::FETCH_ASSOC);
        if ($row && !empty($row['caminho_imagem'])) {
            $path = $row['caminho_imagem'];
            // map url to server path if under uploads/alternativas
            $uploadDir = realpath(__DIR__ . '/../uploads/alternativas');
            if ($uploadDir && stripos($path, 'uploads/alternativas') !== false) {
                $fileName = basename($path);
                $fullPath = dirname(__DIR__) . '/uploads/alternativas/' . $fileName;
                if (file_exists($fullPath)) @unlink($fullPath);
            }
        }

        $sql = "DELETE FROM alternativas WHERE id_alternativa = :id_alternativa";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_alternativa', $id_alternativa, PDO::PARAM_INT);
        return $stmt->execute();
    }

    public function listarPorQuestao(int $id_questao): array
    {
        $sql = "SELECT id_alternativa, id_questao, texto, caminho_imagem 
            FROM alternativas 
            WHERE id_questao = :id_questao 
            ORDER BY id_alternativa ASC";

        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_questao', $id_questao, PDO::PARAM_INT);
        $stmt->execute();

        $alternativas = [];

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $texto = $row['texto'];
                // if there is an image path but no image tag in text, add the tag
                if (empty(trim($texto)) && !empty($row['caminho_imagem'])) {
                    $texto = '<img src="' . $row['caminho_imagem'] . '" />';
                } else {
                    // if text doesn't include <img> but caminho_imagem exists, append tag
                    if (!empty($row['caminho_imagem']) && stripos($texto, '<img') === false) {
                        $texto .= '<img src="' . $row['caminho_imagem'] . '" />';
                    }
                }

                $alternativas[] = [
                    'id_alternativa' => $row['id_alternativa'],
                    'id_questao'     => $row['id_questao'],
                    'texto'          => $texto,
                    'caminho_imagem' => $row['caminho_imagem'] ?? null
                ];
            }

        return $alternativas;
    }


    private function mapRowToAlternativa(array $row): Alternativa
    {
        $alternativa = new Alternativa();
        $alternativa->setIdAlternativa($row['id_alternativa'])
            ->setIdQuestao($row['id_questao'])
            ->setTexto($row['texto']);
        if (isset($row['caminho_imagem'])) {
            $alternativa->setCaminhoImagem($row['caminho_imagem']);
        }
        return $alternativa;
    }
}
