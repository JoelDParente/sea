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
include('../dao/questaoDAO.php');
include('../dao/alternativasDAO.php');
include('../dao/categoriaDAO.php');
include('../dao/assuntoDAO.php');
include('../dao/disciplinaDAO.php');
include('../dao/FiltrosQuestaoDAO.php');


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
        $questao->setSerie($data['serie'] ?? null);
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
            foreach ($data['alternativas'] as $item) {
                $alt = new Alternativa();
                $alt->setIdQuestao($idQuestao);
                $alt->setTexto($item['texto']);
                // Try to capture an image URL from the text (if user inserted an <img src="...">)
                $caminhoImagem = null;
                if (!empty($item['imagem_url'])) {
                    $caminhoImagem = $item['imagem_url'];
                } else {
                    if (preg_match('/<img[^>]+src=["\']([^"\']+)["\']/i', $item['texto'], $m)) {
                        $caminhoImagem = $m[1];
                    }
                }
                $alt->setCaminhoImagem($caminhoImagem);
                $alternativaDAO->criarAlternativa($alt);
            }
        }

        echo json_encode(['sucesso' => true, 'mensagem' => 'Questão e alternativas cadastradas com sucesso!']);
        break;

    // 🔹 LISTAR QUESTÕES COM RELAÇÕES E ALTERNATIVAS
case 'GET':
    $filtrosDAO = new FiltrosQuestaoDAO();

    if (!isset($_GET['tipo'])) {
        $questoes = $questaoDAO->listarComRelacionamentos();
        foreach ($questoes as &$q) {
            $q['alternativas'] = $alternativaDAO->getAlternativaByIdQuestao($q['id_questao']);
        }
        echo json_encode($questoes);
        break;
    }

    switch ($_GET['tipo']) {

        case 'disciplinas':
            echo json_encode($disciplinaDAO->formatarLista());
            break;

        case 'categorias':
            echo json_encode($categoriaDAO->listarFormatado($_GET['id_disciplina'] ?? null));
            break;

        case 'assuntos':
            echo json_encode($assuntoDAO->listarFormatado($_GET['id_categoria'] ?? null));
            break;

        case 'questoes':
            if (isset($_GET['id_professor'])) {
                echo json_encode($filtrosDAO->porProfessor($_GET['id_professor'], $alternativaDAO));
                break;
            }

            if (isset($_GET['id_assunto'])) {
                echo json_encode($filtrosDAO->porAssunto($_GET['id_assunto'], $alternativaDAO));
                break;
            }

            if (isset($_GET['id_disciplina'])) {
                echo json_encode($filtrosDAO->porDisciplina($_GET['id_disciplina'], $alternativaDAO));
                break;
            }

            echo json_encode($questaoDAO->listarComRelacionamentos());
            break;

        default:
            http_response_code(400);
            echo json_encode(['erro' => 'Tipo inválido']);
            break;
    }
    break;


    // 🔹 ATUALIZAR QUESTÃO E SUAS ALTERNATIVAS
    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);

        if (!$data || !isset($data['id_questao'])) {
            http_response_code(400);
            echo json_encode(['erro' => 'JSON inválido ou id_questao ausente']);
            exit;
        }

        $idQuestao = (int)$data['id_questao'];

        // Atualiza dados da questão
        $questao = new Questao();
        $questao->setIdQuestao($idQuestao);
        $questao->setIdAssunto($data['id_assunto'] ?? null);
        $questao->setIdProfessor($data['id_professor'] ?? null);
        $questao->setEnunciado($data['enunciado'] ?? '');
        $questao->setRespostaCorreta($data['resposta_correta'] ?? '');
        $questao->setTipo($data['tipo'] ?? 'objetiva');
        $questao->setPublico($data['publico'] ?? 0);
        $questao->setDataCriacao($data['data_criacao'] ?? date('Y-m-d H:i:s'));
        $questao->setUltimaAtualizacao(date('Y-m-d H:i:s'));

        $atualizado = $questaoDAO->atualizarQuestao($questao);

        if (!$atualizado) {
            http_response_code(500);
            echo json_encode(['erro' => 'Falha ao atualizar questão']);
            exit;
        }

        // Atualiza alternativas: remove existentes e recria (simplifica sincronização)
        $alternativasExistentes = $alternativaDAO->listarPorQuestao($idQuestao);
        if (!empty($alternativasExistentes)) {
            foreach ($alternativasExistentes as $a) {
                if (isset($a['id_alternativa'])) {
                    $alternativaDAO->excluirAlternativa((int)$a['id_alternativa']);
                }
            }
        }

        if (!empty($data['alternativas']) && is_array($data['alternativas'])) {
            foreach ($data['alternativas'] as $item) {
                $alt = new Alternativa();
                // Ao recriar, não definimos id_alternativa manualmente — deixa o banco gerar
                $alt->setIdQuestao($idQuestao);
                $alt->setTexto($item['texto'] ?? '');
                $caminhoImagem = null;
                if (!empty($item['imagem_url'])) {
                    $caminhoImagem = $item['imagem_url'];
                } else {
                    if (preg_match('/<img[^>]+src=["\']([^"\']+)["\']/i', $item['texto'] ?? '', $m)) {
                        $caminhoImagem = $m[1];
                    }
                }
                $alt->setCaminhoImagem($caminhoImagem);
                $alternativaDAO->criarAlternativa($alt);
            }
        }

        echo json_encode(['sucesso' => true, 'mensagem' => 'Questão atualizada com sucesso']);
        break;

    // 🔹 EXCLUIR QUESTÃO E SUAS ALTERNATIVAS
    case 'DELETE':
        // id pode vir via query string ou no body
        $idQuestao = null;
        if (isset($_GET['id_questao'])) {
            $idQuestao = (int)$_GET['id_questao'];
        } else {
            $data = json_decode(file_get_contents('php://input'), true);
            if (isset($data['id_questao'])) $idQuestao = (int)$data['id_questao'];
        }

        if (!$idQuestao) {
            http_response_code(400);
            echo json_encode(['erro' => 'id_questao ausente']);
            exit;
        }

        // Remove alternativas associadas
        $alternativasExistentes = $alternativaDAO->listarPorQuestao($idQuestao);
        if (!empty($alternativasExistentes)) {
            foreach ($alternativasExistentes as $a) {
                if (isset($a['id_alternativa'])) {
                    $alternativaDAO->excluirAlternativa((int)$a['id_alternativa']);
                }
            }
        }

        $removido = $questaoDAO->excluirQuestao($idQuestao);
        if (!$removido) {
            http_response_code(500);
            echo json_encode(['erro' => 'Falha ao excluir questão']);
            exit;
        }

        echo json_encode(['sucesso' => true, 'mensagem' => 'Questão excluída com sucesso']);
        break;

    default:
        http_response_code(405);
        echo json_encode(['erro' => 'Método não permitido']);
        break;
}
