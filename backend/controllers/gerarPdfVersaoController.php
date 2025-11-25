<?php
// controllers/gerarPdfVersaoController.php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

require_once __DIR__ . '/../vendor/autoload.php'; // Carrega o Composer

require_once('../config/database.php');
require_once('../dao/ProvasVersoesDAO.php');
require_once('../dao/ProvasVersoesQuestoesDAO.php');
require_once('../dao/questaoDAO.php');
require_once('../dao/alternativasDAO.php');
require_once('../dao/usuarioDAO.php');

// DAOs
$versaoDAO = new ProvasVersoesDAO();
$versaoQuestoesDAO = new ProvasVersoesQuestoesDAO();
$questaoDAO = new QuestaoDAO();
$alternativaDAO = new AlternativaDAO();

// receber nome do professor via query param (opcional)
$nome_professor = isset($_GET['nome_professor']) ? trim($_GET['nome_professor']) : null;
// receber nome da prova via query param (opcional)
$nome_prova = isset($_GET['nome_prova']) ? trim($_GET['nome_prova']) : null;

if (!isset($_GET['id_versao'])) {
    http_response_code(400);
    echo json_encode(['erro' => 'Parâmetro obrigatório: id_versao']);
    exit;
}

$id_versao = (int) $_GET['id_versao'];

// Dados da versão
$versao = $versaoDAO->buscarPorId($id_versao);

if (!$versao) {
    http_response_code(404);
    echo json_encode(['erro' => 'Versão não encontrada']);
    exit;
}

// Questões da versão
$questoes = $versaoQuestoesDAO->listarQuestoesDaVersao($id_versao);

if (!$questoes || count($questoes) === 0) {
    http_response_code(404);
    echo json_encode(['erro' => 'Nenhuma questão encontrada para essa versão']);
    exit;
}

/* -----------------------------------------------------------
   CONFIGURAÇÃO DO PDF
----------------------------------------------------------- */

$pdf = new TCPDF();

function coluna($pdf)
{
    $top = 45;
    $bottom = 287;
    $x = 105;
    $pdf->Line($x, $top, $x, $bottom);
}

$pdf->SetAuthor($nome_professor && $nome_professor !== '' ? $nome_professor : 'SEA - Sistema Elaborador de Avaliações');
$pdf->SetTitle("Prova Versão " . $versao['codigo_versao']);
$pdf->SetMargins(15, 20, 15);
$pdf->AddPage();
coluna($pdf);

$pdf->SetFont('helvetica', '', 11);


/* -----------------------------------------------------------
CABEÇALHO DA PROVA
----------------------------------------------------------- */


$codigoVersao = $versao['codigo_versao'];
$pdf->SetFont('helvetica', '', 11);

// preparar nome da prova para exibição (sanitizar)
$nomeAval = $nome_prova && $nome_prova !== '' ? htmlspecialchars($nome_prova, ENT_QUOTES, 'UTF-8') : '&nbsp;';

$htmlHeader = '

<table border="1" cellpadding="6" style="font-size: 11px;">
<tr>
<td colspan="2" style="text-align: center;"><b> ' . $nomeAval . '</b></td>
<td colspan="1"><b>Versão:</b>' . $codigoVersao . ' </td>
</tr>
<tr>
<td colspan="1"><b>Data: </b> ____/____/_______ </td>
<td colspan="2"><b>Nome: </b>_______________________________________________</td>
</tr>
</table>

<br><br>
';

$pdf->writeHTML($htmlHeader, false, false, false, false, '');

$pdf->setEqualColumns(2, 88); // duas colunas de 95 mm
$colunaAtual = 0;
$pdf->selectColumn($colunaAtual);
/* -----------------------------------------------------------
   QUESTÕES
----------------------------------------------------------- */

foreach ($questoes as $index => $q) {

    // Troca de coluna se chegar no final da página
    if ($pdf->getY() >= 260) {
        $colunaAtual++;

        // troca de coluna ou cria nova página
        if ($colunaAtual >= 2) {
            $pdf->AddPage();
            coluna($pdf);
            $colunaAtual = 0;
        }

        $pdf->selectColumn($colunaAtual);
    }

    // Número da questão
    $pdf->writeHTML("<p><strong>Questão " . ($index + 1) . ":</strong></p>", true, false, true, false, '');

    // Enunciado com HTML do banco
    $pdf->writeHTML('
    <p style="text-align: justify;">
        ' . $q['enunciado'] . '
    </p>
', true, false, true, false, '');


    // Imagem da questão
    if (!empty($q['imagem'])) {
        $path = "../uploads/questoes/" . $q['imagem'];
        if (file_exists($path)) {
            $pdf->Image($path, '', '', 85);
            $pdf->Ln(0);
        }
    }

    // Alternativas
    $alternativas = $alternativaDAO->listarPorQuestao($q['id_questao']);
    $letras = ['A', 'B', 'C', 'D', 'E'];

    foreach ($alternativas as $i => $alt) {
$htmlAlt = '
    <p>
        <b>'.$letras[$i].')</b> '.$alt['texto'].'
    </p>
';
$pdf->writeHTML($htmlAlt, true, false, true, false, '');

    }

    $pdf->Ln(5);
}

/* -----------------------------------------------------------
   SAÍDA DO PDF
----------------------------------------------------------- */

$pdf->Output("prova_versao_{$id_versao}.pdf", 'I');
exit;
