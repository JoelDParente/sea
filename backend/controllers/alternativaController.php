<?php
// controllers/AlternativaController.php
require_once __DIR__ . '/../dao/AlternativasDAO.php';
require_once __DIR__ . '/../models/alternativas.php';

use Models\Alternativa;

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$dao = new AlternativaDAO();

function getInputData() {
    return json_decode(file_get_contents("php://input"), true);
}

$method = $_SERVER['REQUEST_METHOD'];

try {
    switch ($method) {
        case 'POST': // Criar alternativas (pode ser um array)
            $data = getInputData();
            $idsCriados = [];

            foreach ($data as $alt) {
                $alternativa = new Alternativa();
                $alternativa->setIdAlternativa($alt['id_alternativa'])
                            ->setIdQuestao($alt['id_questao'])
                            ->setTexto($alt['texto'])
                            ->setCorreta($alt['correta']);
                $idsCriados[] = $dao->criarAlternativa($alternativa);
            }

            echo json_encode(["success" => true, "ids" => $idsCriados]);
            break;

        case 'GET':
            if (isset($_GET['id'])) {
                $alt = $dao->getAlternativaById((int)$_GET['id']);
                echo json_encode($alt ?? ["error" => "Alternativa não encontrada"]);
            } else {
                echo json_encode($dao->getAllAlternativa());
            }
            break;

        case 'PUT':
            $data = getInputData();
            $alternativa = new Alternativa();

            $alternativa->setIdAlternativa($data['id_alternativa'])
                        ->setIdQuestao($data['id_questao'])
                        ->setTexto($data['texto'])
                        ->setCorreta($data['correta']);

            $ok = $dao->atualizarAlternativa($alternativa);
            echo json_encode(["success" => $ok]);
            break;

        case 'DELETE':
            if (!isset($_GET['id'])) {
                http_response_code(400);
                echo json_encode(["error" => "ID da alternativa é obrigatório"]);
                exit;
            }
            $ok = $dao->excluirAlternativa((int)$_GET['id']);
            echo json_encode(["success" => $ok]);
            break;

        default:
            http_response_code(405);
            echo json_encode(["error" => "Método não permitido"]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
