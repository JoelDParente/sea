<?php
// controllers/gerarPdfVersaoController.php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

require_once __DIR__ . '/../vendor/autoload.php'; 

require_once('../config/database.php');
require_once('../dao/ProvasVersoesDAO.php');
require_once('../dao/ProvasVersoesQuestoesDAO.php');
require_once('../dao/questaoDAO.php');
require_once('../dao/alternativasDAO.php');
require_once('../dao/usuarioDAO.php');
require_once('../dao/disciplinaDAO.php');

// DAOs
$versaoDAO = new ProvasVersoesDAO();
$versaoQuestoesDAO = new ProvasVersoesQuestoesDAO();
$questaoDAO = new QuestaoDAO();
$alternativaDAO = new AlternativaDAO();
$disciplinaDAO = new DisciplinaDAO();

$nome_professor = isset($_GET['nome_professor']) ? trim($_GET['nome_professor']) : null;
$serie = isset($_GET['serie']) ? trim($_GET['serie']) : null;
$id_disciplina = isset($_GET['id_disciplina']) ? (int)trim($_GET['id_disciplina']) : null;
$nome_prova = isset($_GET['nome_prova']) ? trim($_GET['nome_prova']) : null;


$nome_disciplina = '';
if ($id_disciplina) {
    $disciplina = $disciplinaDAO->getDisciplinaById($id_disciplina);
    if ($disciplina) {
        $nome_disciplina = $disciplina->getNomeDisciplina();
    }
}

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
    $top = 62;
    $bottom = 287;
    $x = 105;
    $pdf->Line($x, $top, $x, $bottom);
}

function novaPagina($pdf) {
    $pdf->AddPage();
    coluna($pdf); 
}


$pdf->SetAuthor($nome_professor && $nome_professor !== '' ? $nome_professor : 'SEA - Sistema Elaborador de Avaliações');
$pdf->SetTitle("Prova Versão " . $versao['codigo_versao']);
$pdf->SetMargins(15, 20, 15);
novaPagina($pdf);

$pdf->SetFont('helvetica', '', 11);


/* -----------------------------------------------------------
CABEÇALHO DA PROVA
----------------------------------------------------------- */


$codigoVersao = $versao['codigo_versao'];
$pdf->SetFont('helvetica', '', 11);

// preparar nome da prova para exibição (sanitizar)
$nomeAval = $nome_prova && $nome_prova !== '' ? htmlspecialchars($nome_prova, ENT_QUOTES, 'UTF-8') : '&nbsp;';
$logoEscola = 'http://localhost/sea/backend/uploads/logos/logo-sea.png';

$htmlHeader = '

 <style>
td {
    font-size: 11px;
}
.titulo-escola {
    font-size: 11px;
    font-weight: bold;
    text-align: center;
}
.caixa {
    border: 1px solid #000;
}
</style>

<table cellpadding="4" cellspacing="0" border="1" width="100%">
    <tr>
        <td rowspan="4" width="15%" style="text-align:center;">
            <b><img src="http://localhost/sea/backend/uploads/logos/logo-sea.png" alt="Logo não encontrada"></b>
        </td>
        <td width="70%" class="titulo-escola">
            EEEP OSMIRA EDUARDO DE CASTRO
        </td>
        <td width="15%" style="text-align:center;">
            <b>'.date('Y').'</b>
        </td>
    </tr>

    <tr>
        <td width="60%"><b>ALUNO(A):</b> ______________________________________ </td>
        <td  width="10%"><b>Nº:</b>____</td>
        <td style="text-align:center;"  width="15%"><b>NOTA</b></td>
    </tr>
    
    <tr>
        <td rowspan="2" width="10%" style="font-size: 30px; text-align: center;"><b>'.substr($serie, 0, 3).'</b></td>
        <td  width="40%"><b>TÉCNICO EM:</b> <b></b></td>
        <td width="20%"><b>DATA:         </b>__ /__  </td>
        <td rowspan="3" width="15%"> </td>
    </tr>
    
    <tr>
        <td width="40%" style="text-align: center;"><b>'.$nomeAval.'</b></td>
        <td rowspan="2" width="20%" style="text-align: center; vertical-align: center;"><b>'.mb_strtoupper($nome_disciplina, 'UTF-8').'</b></td>
    </tr>

    <tr>
        <td width="65%"><b>PROFESSOR(A): '.$nome_professor.'</b></td>
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
            novaPagina($pdf);
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
