<?php
require_once __DIR__ . '/../config/database.php';

class FiltrosQuestaoDAO {

    private $conn;

    public function __construct() {
        $this->conn = Database::getInstance()->getConnection();
    }

    private function mapearAlternativas($alternativaDAO, $questoes) {
        foreach ($questoes as &$q) {
            $q['alternativas'] = $alternativaDAO->getAlternativaByIdQuestao($q['id_questao']);
        }
        return $questoes;
    }

    public function porProfessor($idProfessor, $alternativaDAO) {
        $sql = "
            SELECT 
                q.id_questao,
                SUBSTRING(q.enunciado, 1, 100) AS titulo,
                q.enunciado,
                q.resposta_correta,
                q.tipo,
                q.publico,
                q.data_criacao,
                q.ultima_atualizacao,
                q.id_assunto,
                a.nome_assunto,
                c.id_categoria,
                c.nome_categoria,
                d.id_disciplina,
                d.nome_disciplina,
                q.id_professor
            FROM questao q
            LEFT JOIN assunto a ON q.id_assunto = a.id_assunto
            LEFT JOIN categoria c ON a.id_categoria = c.id_categoria
            LEFT JOIN disciplina d ON c.id_disciplina = d.id_disciplina
            WHERE q.id_professor = :id_professor
            ORDER BY q.data_criacao DESC
        ";

        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_professor', $idProfessor, PDO::PARAM_INT);
        $stmt->execute();

        $questoes = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $this->mapearAlternativas($alternativaDAO, $questoes);
    }

    public function porAssunto($idAssunto, $alternativaDAO) {
        $sql = "
            SELECT 
                q.id_questao,
                SUBSTRING(q.enunciado, 1, 100) AS titulo,
                q.enunciado,
                q.resposta_correta,
                q.tipo,
                q.publico,
                q.data_criacao,
                q.ultima_atualizacao,
                q.id_assunto,
                a.nome_assunto,
                c.id_categoria,
                c.nome_categoria,
                d.id_disciplina,
                d.nome_disciplina,
                q.id_professor
            FROM questao q
            LEFT JOIN assunto a ON q.id_assunto = a.id_assunto
            LEFT JOIN categoria c ON a.id_categoria = c.id_categoria
            LEFT JOIN disciplina d ON c.id_disciplina = d.id_disciplina
            WHERE q.id_assunto = :id_assunto
            ORDER BY q.data_criacao DESC
        ";

        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_assunto', $idAssunto, PDO::PARAM_INT);
        $stmt->execute();

        $questoes = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $this->mapearAlternativas($alternativaDAO, $questoes);
    }

    public function porDisciplina($idDisciplina, $alternativaDAO) {
        $sql = "
            SELECT 
                q.id_questao,
                SUBSTRING(q.enunciado, 1, 100) AS titulo,
                q.enunciado,
                q.resposta_correta,
                q.tipo,
                q.publico,
                q.data_criacao,
                q.ultima_atualizacao,
                q.id_assunto,
                a.nome_assunto,
                c.id_categoria,
                c.nome_categoria,
                d.id_disciplina,
                d.nome_disciplina,
                q.id_professor
            FROM questao q
            LEFT JOIN assunto a ON q.id_assunto = a.id_assunto
            LEFT JOIN categoria c ON a.id_categoria = c.id_categoria
            LEFT JOIN disciplina d ON c.id_disciplina = d.id_disciplina
            WHERE d.id_disciplina = :id_disciplina
            ORDER BY q.data_criacao DESC
        ";

        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_disciplina', $idDisciplina, PDO::PARAM_INT);
        $stmt->execute();

        $questoes = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $this->mapearAlternativas($alternativaDAO, $questoes);
    }
}
