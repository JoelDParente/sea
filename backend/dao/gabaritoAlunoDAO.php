<?php
// dao/GabaritoAlunoDAO.php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/gabaritoAluno.php';

use Models\GabaritoAluno;

class GabaritoAlunoDAO {
    private $conn;

    public function __construct() {
        $this->conn = Database::getInstance()->getConnection();
    }


    public function criarGabaritoAluno(GabaritoAluno $gabarito): bool {
        $sql = "INSERT INTO gabaritoaluno (id_prova, id_aluno, id_questao, resposta_aluno)
                VALUES (:id_prova, :id_aluno, :id_questao, :resposta_aluno)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_prova', $gabarito->getIdProva(), PDO::PARAM_INT);
        $stmt->bindValue(':id_aluno', $gabarito->getIdAluno(), PDO::PARAM_INT);
        $stmt->bindValue(':id_questao', $gabarito->getIdQuestao(), PDO::PARAM_INT);
        $stmt->bindValue(':resposta_aluno', $gabarito->getRespostaAluno(), PDO::PARAM_STR);
        return $stmt->execute();
    }


    public function getGabaritoAlunoById(int $idProva, int $idAluno, int $idQuestao): ?GabaritoAluno {
        $sql = "SELECT * FROM gabaritoaluno 
                WHERE id_prova = :id_prova AND id_aluno = :id_aluno AND id_questao = :id_questao";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_prova', $idProva, PDO::PARAM_INT);
        $stmt->bindValue(':id_aluno', $idAluno, PDO::PARAM_INT);
        $stmt->bindValue(':id_questao', $idQuestao, PDO::PARAM_INT);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row) return null;
        return $this->mapRowToGabaritoAluno($row);
    }


    public function getAllGabaritoAlunos(): array {
        $sql = "SELECT * FROM gabaritoaluno";
        $stmt = $this->conn->query($sql);
        $gabaritos = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $gabaritos[] = $this->mapRowToGabaritoAluno($row);
        }
        return $gabaritos;
    }


    public function atualizarGabaritoAluno(GabaritoAluno $gabarito): bool {
        $sql = "UPDATE gabaritoaluno 
                SET resposta_aluno = :resposta_aluno
                WHERE id_prova = :id_prova AND id_aluno = :id_aluno AND id_questao = :id_questao";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':resposta_aluno', $gabarito->getRespostaAluno(), PDO::PARAM_STR);
        $stmt->bindValue(':id_prova', $gabarito->getIdProva(), PDO::PARAM_INT);
        $stmt->bindValue(':id_aluno', $gabarito->getIdAluno(), PDO::PARAM_INT);
        $stmt->bindValue(':id_questao', $gabarito->getIdQuestao(), PDO::PARAM_INT);
        return $stmt->execute();
    }

 
    public function excluirGabaritoAluno(int $idProva, int $idAluno, int $idQuestao): bool {
        $sql = "DELETE FROM gabaritoaluno 
                WHERE id_prova = :id_prova AND id_aluno = :id_aluno AND id_questao = :id_questao";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_prova', $idProva, PDO::PARAM_INT);
        $stmt->bindValue(':id_aluno', $idAluno, PDO::PARAM_INT);
        $stmt->bindValue(':id_questao', $idQuestao, PDO::PARAM_INT);
        return $stmt->execute();
    }

    private function mapRowToGabaritoAluno(array $row): GabaritoAluno {
        $gabarito = new GabaritoAluno();
        $gabarito->setIdProva($row['id_prova'])
                 ->setIdAluno($row['id_aluno'])
                 ->setIdQuestao($row['id_questao'])
                 ->setRespostaAluno($row['resposta_aluno']);
        return $gabarito;
    }
}
