<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include('../config/database.php');
include('../config/database.php');
include('../dao/questaoDAO.php');
include('../models/questao.php');

include('../dao/alternativasDAO.php');
include('../models/alternativa.php');

include('../dao/categoriaDAO.php');
include('../models/categoria.php');

include('../dao/assuntoDAO.php');
include('../models/assunto.php');

include('../dao/disciplinaDAO.php');
include('../models/disciplina.php');

use Models\Questao;
use Models\Alternativa;
use Models\Assunto;
use Models\Categoria;
use Models\Disciplina;

header('Content-Type: application/json; charset=utf-8');

$metodo = $_SERVER['REQUEST_METHOD'];

$questaoDAO = new QuestaoDAO();
$alternativaDAO = new AlternativaDAO();
$categoriaDAO = new CategoriaDAO();
$assuntoDAO = new AssuntoDAO();
$disciplinaDAO = new DisciplinaDAO();

switch ($metodo) {

    // 🔹 CADASTRAR QUESTÃO E SUAS ALTERNATIVAS
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);

        if (!$data) {
            http_response_code(400);
            echo json_encode(['erro' => 'JSON inválido']);
            exit;
        }

        // Cadastra a questão principal
        $questao = new Questao();
        $questao->setIdAssunto($data['id_assunto'] ?? null);
        $questao->setIdProfessor($data['id_professor'] ?? null);
        $questao->setEnunciado($data['enunciado'] ?? '');
        $questao->setRespostaCorreta($data['resposta_correta'] ?? '');
        $questao->setTipo($data['tipo'] ?? 'objetiva');
        $questao->setPublico($data['publico'] ?? 0);

        $idQuestao = $questaoDAO->criarQuestao($questao);

        if (!$idQuestao) {
            http_response_code(500);
            echo json_encode(['erro' => 'Erro ao cadastrar questão']);
            exit;
        }

        // Cadastra as alternativas (entidade fraca)
        if (!empty($data['alternativas']) && is_array($data['alternativas'])) {
            foreach ($data['alternativas'] as $texto) {
                $alt = new Alternativa();
                $alt->setIdQuestao($idQuestao);
                $alt->setTexto($texto);
                $alternativaDAO->criarAlternativa($alt);
            }
        }

        echo json_encode(['sucesso' => true, 'mensagem' => 'Questão e alternativas cadastradas com sucesso!']);
        break;

    // 🔹 LISTAR QUESTÕES COM RELAÇÕES E ALTERNATIVAS
    case 'GET':
        if (isset($_GET['tipo'])) {
            $tipo = $_GET['tipo'];
            switch ($tipo) {
                case 'disciplinas':
                    $disciplinas = $disciplinaDAO->getAllDisciplinas();
                    $resultado = [];
                    foreach ($disciplinas as $d) {
                        $resultado[] = [
                            'id_disciplina' => $d->getIdDisciplina(),
                            'nome_disciplina' => $d->getNomeDisciplina()
                        ];
                    }
                    echo json_encode($resultado);
                    break;
                case 'categorias':
                    // Se id_disciplina é fornecido, filtra por disciplina
                    if (isset($_GET['id_disciplina'])) {
                        $idDisciplina = (int)$_GET['id_disciplina'];
                        $sql = "SELECT id_categoria, nome_categoria FROM categoria WHERE id_disciplina = :id_disciplina";
                        $conn = Database::getInstance()->getConnection();
                        $stmt = $conn->prepare($sql);
                        $stmt->bindValue(':id_disciplina', $idDisciplina, PDO::PARAM_INT);
                        $stmt->execute();
                        $categorias = $stmt->fetchAll(PDO::FETCH_ASSOC);
                        echo json_encode($categorias);
                    } else {
                        $categorias = $categoriaDAO->getAllCategorias();
                        $resultado = [];
                        foreach ($categorias as $c) {
                            $resultado[] = [
                                'id_categoria' => $c->getIdCategoria(),
                                'nome_categoria' => $c->getNomeCategoria(),
                                'id_disciplina' => $c->getIdDisciplina()
                            ];
                        }
                        echo json_encode($resultado);
                    }
                    break;
                case 'assuntos':
                    // Se id_categoria é fornecido, filtra por categoria
                    if (isset($_GET['id_categoria'])) {
                        $idCategoria = (int)$_GET['id_categoria'];
                        $sql = "SELECT id_assunto, nome_assunto FROM assunto WHERE id_categoria = :id_categoria";
                        $conn = Database::getInstance()->getConnection();
                        $stmt = $conn->prepare($sql);
                        $stmt->bindValue(':id_categoria', $idCategoria, PDO::PARAM_INT);
                        $stmt->execute();
                        $assuntos = $stmt->fetchAll(PDO::FETCH_ASSOC);
                        echo json_encode($assuntos);
                    } else {
                        echo json_encode($assuntoDAO->listarTodos());
                    }
                    break;
                default:
                    http_response_code(400);
                    echo json_encode(['erro' => 'Tipo inválido']);
                    break;
            }
        } else {
            $questoes = $questaoDAO->listarComRelacionamentos();
            foreach ($questoes as &$q) {
                $q['alternativas'] = $alternativaDAO->getAlternativaByIdQuestao($q['id_questao']);
            }
            echo json_encode($questoes);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['erro' => 'Método não permitido']);
        break;
}
?>
