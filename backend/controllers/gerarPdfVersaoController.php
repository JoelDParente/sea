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

// DAOs
$versaoDAO = new ProvasVersoesDAO();
$versaoQuestoesDAO = new ProvasVersoesQuestoesDAO();
$questaoDAO = new QuestaoDAO();
$alternativaDAO = new AlternativaDAO();

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

$pdf->SetAuthor('SEA - Sistema Elaborador de Avaliações');
$pdf->SetTitle("Prova Versão " . $versao['codigo_versao']);
$pdf->SetMargins(15, 20, 15);
$pdf->AddPage();

$pdf->SetFont('helvetica', '', 12);

/* -----------------------------------------------------------
   CABEÇALHO
----------------------------------------------------------- */

$pdf->SetFont('helvetica', 'B', 16);
$pdf->Cell(0, 10, "Prova - Versão " . $versao['codigo_versao'], 0, 1, 'C');

$pdf->Ln(5);
$pdf->SetFont('helvetica', '', 12);

/* -----------------------------------------------------------
   QUESTÕES
----------------------------------------------------------- */

foreach ($questoes as $index => $q) {
    $numero = $index + 1;

    $pdf->SetFont('helvetica', 'B', 12);
    $pdf->MultiCell(0, 7, "Questão $numero:", 0, 'L');

    $pdf->SetFont('helvetica', '', 12);
    $pdf->MultiCell(0, 7, $q['enunciado'], 0, 'L');
    $pdf->Ln(2);

    // Imagem
    if (!empty($q['imagem'])) {
        $path = "../uploads/questoes/" . $q['imagem'];

        if (file_exists($path)) {
            $pdf->Image($path, '', '', 100);
            $pdf->Ln(2);
        }
    }

    // Alternativas
    $alternativas = $alternativaDAO->listarPorQuestao($q['id_questao']);

    $letras = ['A', 'B', 'C', 'D', 'E'];
    $i = 0;

    foreach ($alternativas as $alt) {
        $pdf->SetFont('helvetica', '', 11);
        $pdf->MultiCell(0, 6, "  {$letras[$i]})  {$alt['texto']}", 0, 'L');
        $i++;
    }

    $pdf->Ln(5);
}

/* -----------------------------------------------------------
   SAÍDA DO PDF
----------------------------------------------------------- */

$pdf->Output("prova_versao_{$id_versao}.pdf", 'I');
exit;
