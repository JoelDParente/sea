<?php
// dao/AlunoDAO.php
require_once __DIR__ . '/../config/database.php';

use Models\Aluno;

class AlunoDAO
{
    private $conn;

    public function __construct()
    {
        $this->conn = Database::getInstance()->getConnection();
    }

    // CREATE
    public function criarAluno(Aluno $aluno): int
    {
        $sql = "INSERT INTO aluno (id_turma, matricula, nome, email, foto)
            VALUES (:id_turma, :matricula, :nome, :email, :foto)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_turma', $aluno->getIdTurma(), PDO::PARAM_INT);
        $stmt->bindValue(':matricula', $aluno->getMatricula(), PDO::PARAM_STR);
        $stmt->bindValue(':nome', $aluno->getNome(), PDO::PARAM_STR);
        $stmt->bindValue(':email', $aluno->getEmail(), PDO::PARAM_STR);
        $stmt->bindValue(':foto', $aluno->getFoto() ?? null, PDO::PARAM_STR);

        $stmt->execute();
        return (int)$this->conn->lastInsertId();
    }

    // READ por ID
    public function getAlunoById(int $idAluno): ?Aluno
    {
        $sql = "SELECT * FROM aluno WHERE id_aluno = :id_aluno";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_aluno', $idAluno, PDO::PARAM_INT);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row) return null;
        return $this->mapRowToAluno($row);
    }

    public function AlunosPorTurma(int $turma): array
    {
        $sql = "SELECT * FROM aluno WHERE id_turma = :id_turma";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_turma', $turma, PDO::PARAM_INT);
        $stmt->execute();
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $alunos = [];
        foreach ($rows as $row) {
            $alunos[] = $this->mapRowToAluno($row);
        }

        return $alunos;
    }

    // READ todos
    public function getAllAlunos(): array
    {
        $sql = "SELECT * FROM aluno";
        $stmt = $this->conn->query($sql);
        $alunos = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $alunos[] = $this->mapRowToAluno($row);
        }
        return $alunos;
    }

    // UPDATE
    public function atualizarAluno(Aluno $aluno): bool
    {
        $sql = "UPDATE aluno SET id_turma = :id_turma, nome = :nome, email = :email,
                matricula = :matricula
                WHERE id_aluno = :id_aluno";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':matricula', $aluno->getMatricula(), PDO::PARAM_STR);
        $stmt->bindValue(':nome', $aluno->getNome(), PDO::PARAM_STR);
        $stmt->bindValue(':email', $aluno->getEmail(), PDO::PARAM_STR);
        $stmt->bindValue(':id_aluno', $aluno->getIdAluno(), PDO::PARAM_INT);

        return $stmt->execute();
    }

    // DELETE
    public function excluirAluno(int $idAluno): bool
    {
        $sql = "DELETE FROM aluno WHERE id_aluno = :id_aluno";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':id_aluno', $idAluno, PDO::PARAM_INT);
        return $stmt->execute();
    }

    private function mapRowToAluno(array $row): Aluno
    {
        $aluno = new Aluno();
        $aluno->setIdAluno($row['id_aluno'])
            ->setIdTurma($row['id_turma'])
            ->setNome($row['nome'])
            ->setEmail($row['email'])
            ->setMatricula($row['matricula']);
        if (isset($row['foto'])) {
            $aluno->setFoto($row['foto']);
        }
        return $aluno;
    }
}
