<?php
// lib/GabaritoGenerator.php

use TCPDF;

class GabaritoGenerator
{
    private $tcpdf;
    private $pageWidth;
    private $pageHeight;

    public function __construct()
    {
        $this->tcpdf = null;
        $this->pageWidth = 210; // A4
        $this->pageHeight = 297; // A4
    }

    /**
     * Gera HTML do gabarito com dados do aluno
     */
    public function gerarHTMLGabarito(array $dadosAluno, array $questoes, array $gabaritos): string
    {
        $nomeAluno = htmlspecialchars($dadosAluno['nome'] ?? 'Aluno', ENT_QUOTES, 'UTF-8');
        $matriculaAluno = htmlspecialchars($dadosAluno['matricula'] ?? '', ENT_QUOTES, 'UTF-8');
        $dataGeracao = date('d/m/Y H:i:s');

        // Iniciar HTML
        $html = '
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 10px;
                font-size: 11pt;
            }
            .header {
                text-align: center;
                margin-bottom: 20px;
                border-bottom: 2px solid #333;
                padding-bottom: 10px;
            }
            .header h1 {
                margin: 0;
                font-size: 18pt;
                color: #333;
            }
            .header p {
                margin: 5px 0;
                font-size: 10pt;
                color: #666;
            }
            .student-info {
                display: flex;
                justify-content: space-between;
                margin-bottom: 15px;
                padding: 8px;
                background-color: #f5f5f5;
                border-radius: 4px;
            }
            .student-info div {
                flex: 1;
                margin-right: 20px;
            }
            .student-info label {
                font-weight: bold;
                font-size: 9pt;
                color: #333;
            }
            .student-info value {
                font-size: 10pt;
                color: #555;
            }
            .gabarito-container {
                margin-top: 20px;
            }
            .gabarito-title {
                font-weight: bold;
                font-size: 12pt;
                background-color: #e0e0e0;
                padding: 8px;
                margin-bottom: 10px;
                border-left: 4px solid #333;
            }
            .questao-gabarito {
                margin-bottom: 12px;
                padding: 8px;
                border-left: 3px solid #ccc;
                background-color: #fafafa;
            }
            .questao-numero {
                font-weight: bold;
                color: #333;
                font-size: 11pt;
            }
            .alternativa {
                color: #d32f2f;
                font-weight: bold;
                font-size: 12pt;
                margin: 5px 0;
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                font-size: 8pt;
                color: #999;
                border-top: 1px solid #ddd;
                padding-top: 10px;
            }
        </style>

        <div class="header">
            <h1>GABARITO</h1>
            <p>Documento gerado automaticamente pelo sistema SEA</p>
        </div>

        <div class="student-info">
            <div>
                <label>Aluno:</label>
                <value>' . $nomeAluno . '</value>
            </div>
            <div>
                <label>Matrícula:</label>
                <value>' . $matriculaAluno . '</value>
            </div>
            <div>
                <label>Data:</label>
                <value>' . $dataGeracao . '</value>
            </div>
        </div>

        <div class="gabarito-container">
            <div class="gabarito-title">Respostas Corretas por Questão</div>
        ';

        // Adicionar respostas
        if (!empty($gabaritos)) {
            foreach ($gabaritos as $gab) {
                $numQuestao = htmlspecialchars($gab['questao'] ?? '', ENT_QUOTES, 'UTF-8');
                $alternativaCorreta = htmlspecialchars($gab['alternativa'] ?? '', ENT_QUOTES, 'UTF-8');

                $html .= '
                <div class="questao-gabarito">
                    <div class="questao-numero">Questão ' . $numQuestao . '</div>
                    <div class="alternativa">Resposta: ' . strtoupper($alternativaCorreta) . '</div>
                </div>
                ';
            }
        } else {
            $html .= '<div class="questao-gabarito">Nenhum gabarito disponível para esta prova.</div>';
        }

        $html .= '
        </div>

        <div class="footer">
            <p>Gerado em: ' . $dataGeracao . ' | Sistema Eletrônico de Avaliação - SEA</p>
        </div>
        ';

        return $html;
    }

    /**
     * Gera PDF do gabarito e retorna o caminho do arquivo
     */
    public function gerarPDFGabarito(
        array $dadosAluno,
        array $gabaritos,
        string $nomeProva,
        string $nomeAluno,
        string $tempDir
    ): ?string {
        require_once(__DIR__ . '/../vendor/autoload.php');

        try {
            // Gerar HTML
            $html = $this->gerarHTMLGabarito($dadosAluno, [], $gabaritos);

            // Criar TCPDF
            $pdf = new TCPDF('P', 'mm', 'A4', true, 'UTF-8', false);
            $pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
            $pdf->SetMargins(15, 15, 15);
            $pdf->SetAutoPageBreak(true, 20);

            // Adicionar página
            $pdf->AddPage();
            $pdf->SetFont('helvetica', '', 11);

            // Escrever HTML
            $pdf->writeHTML($html, true, false, true, false, '');

            // Gerar nome do arquivo
            $nomeAluntoSanitizado = preg_replace('/[^a-zA-Z0-9_-]/', '_', $nomeAluno);
            $nomeProvaSanitizado = preg_replace('/[^a-zA-Z0-9_-]/', '_', $nomeProva);
            $fileName = "gabarito_{$nomeProvaSanitizado}_{$nomeAluntoSanitizado}.pdf";
            $filePath = $tempDir . '/' . $fileName;

            // Salvar em buffer para arquivo (sem Output direto)
            $pdf->Output($filePath, 'F');

            if (!file_exists($filePath)) {
                error_log("Erro ao salvar PDF de gabarito: {$filePath}");
                return null;
            }

            return $filePath;
        } catch (Exception $e) {
            error_log("Erro ao gerar PDF de gabarito: " . $e->getMessage());
            return null;
        }
    }
}
?>
