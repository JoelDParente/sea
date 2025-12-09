<?php
// dao/ProvaDAO.php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/prova.php';

use Models\Prova;

class ProvaDAO {
    private $conn;

    public function __construct() {
        $this->conn = Database::getInstance()->getConnection();
    }

    public function criarProva(Prova $prova): int {
        $sql = "INSERT INTO prova (id_professor, id_disciplina, titulo, serie, versao, data_criacao, ultima_atualizacao)
                VALUES (:id_professor, :id_disciplina, :titulo, :serie, :versao, :data_criacao, :ultima_atualizacao)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_professor', $prova->getIdProfessor(), PDO::PARAM_INT);
        $stmt->bindValue(':id_disciplina', $prova->getIdDisciplina(), PDO::PARAM_INT);
        $stmt->bindValue(':titulo', $prova->getTitulo(), PDO::PARAM_STR);
        $stmt->bindValue(':serie', $prova->getSerie(), PDO::PARAM_STR);
        $stmt->bindValue(':versao', $prova->getVersao(), PDO::PARAM_STR);
        $stmt->bindValue(':data_criacao', $prova->getDataCriacao(), PDO::PARAM_STR);
        $stmt->bindValue(':ultima_atualizacao', $prova->getUltimaAtualizacao(), PDO::PARAM_STR);

        $stmt->execute();
        return (int)$this->conn->lastInsertId();
    }

    public function getProvaById(int $id_prova): ?Prova {
        $sql = "SELECT * FROM prova WHERE id_prova = :id_prova";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_prova', $id_prova, PDO::PARAM_INT);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row) return null;
        return $this->mapRowToProva($row);
    }

    public function getAllProvas(): array {
        $sql = "SELECT * FROM prova";
        $stmt = $this->conn->query($sql);
        $provas = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $provas[] = $this->mapRowToProva($row);
        }
        return $provas;
    }

    public function listarPorProfessor(int $id_professor): array {
        $sql = "SELECT * FROM prova WHERE id_professor = :id_professor ORDER BY data_criacao DESC";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_professor', $id_professor, PDO::PARAM_INT);
        $stmt->execute();
        $provas = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $provas[] = $this->mapRowToProva($row);
        }
        return $provas;
    }

    public function atualizarProva(Prova $prova): bool {
        $sql = "UPDATE prova SET id_professor = :id_professor, id_disciplina = :id_disciplina, titulo = :titulo,serie = :serie, versao = :versao, data_criacao = :data_criacao, ultima_atualizacao = :ultima_atualizacao
                WHERE id_prova = :id_prova";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_professor', $prova->getIdProfessor(), PDO::PARAM_INT);
        $stmt->bindValue(':id_disciplina', $prova->getIdDisciplina(), PDO::PARAM_INT);
        $stmt->bindValue(':titulo', $prova->getTitulo(), PDO::PARAM_STR);
        $stmt->bindValue(':serie', $prova->getSerie(), PDO::PARAM_STR);
        $stmt->bindValue(':versao', $prova->getVersao(), PDO::PARAM_STR);
        $stmt->bindValue(':data_criacao', $prova->getDataCriacao(), PDO::PARAM_STR);
        $stmt->bindValue(':ultima_atualizacao', $prova->getUltimaAtualizacao(), PDO::PARAM_STR);
        $stmt->bindValue(':id_prova', $prova->getIdProva(), PDO::PARAM_INT);

        return $stmt->execute();
    }

    public function excluirProva(int $id_prova): bool {
        try {
            $this->conn->beginTransaction();

            // remover gabarito aluno relacionado
            $sql = "DELETE FROM gabaritoaluno WHERE id_prova = :id_prova";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindValue(':id_prova', $id_prova, PDO::PARAM_INT);
            $stmt->execute();

            // remover gabaritos relacionados
            $sql = "DELETE FROM gabarito WHERE id_prova = :id_prova";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindValue(':id_prova', $id_prova, PDO::PARAM_INT);
            $stmt->execute();

            // remover ligações prova <-> turma
            $sql = "DELETE FROM provaturma WHERE id_prova = :id_prova";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindValue(':id_prova', $id_prova, PDO::PARAM_INT);
            $stmt->execute();

            // remover relação prova-questao
            $sql = "DELETE FROM provaquestao WHERE id_prova = :id_prova";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindValue(':id_prova', $id_prova, PDO::PARAM_INT);
            $stmt->execute();

            // provas_versoes e provas_versoes_questoes tem FK ON DELETE CASCADE

            // finalmente remover a prova
            $sql = "DELETE FROM prova WHERE id_prova = :id_prova";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindValue(':id_prova', $id_prova, PDO::PARAM_INT);
            $ok = $stmt->execute();

            $this->conn->commit();
            return (bool)$ok;
        } catch (Exception $e) {
            $this->conn->rollBack();
            error_log('Erro ao excluir prova: ' . $e->getMessage());
            return false;
        }
    }

    private function mapRowToProva(array $row): Prova {
        $prova = new Prova();
        $prova->setIdProva($row['id_prova'])
                ->setIdProfessor($row['id_professor'])
                ->setIdDisciplina($row['id_disciplina'])
                ->setTitulo($row['titulo'])
                ->setSerie($row['serie'])
                ->setVersao($row['versao'])
                ->setDataCriacao($row['data_criacao'])
                ->setUltimaAtualizacao($row['ultima_atualizacao']);
        return $prova;
    }
}
