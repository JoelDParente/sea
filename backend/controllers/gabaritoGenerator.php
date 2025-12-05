<?php

require_once __DIR__ . '/../vendor/autoload.php';


class GabaritoGenerator extends TCPDF
{
    /**
     * Gera gabarito para um único aluno (2 gabaritos por página)
     */
    public function gerarGabaritoUnico($aluno, $prova, $turma)
{
    $this->SetCreator('SEA');
    $this->SetAuthor('SEA');
    $this->SetTitle('Gabarito - Prova ' . $prova);
    $this->SetMargins(10, 10, 10);
    $this->SetAutoPageBreak(true, 10);

    $this->AddPage('P', 'A4');

    $qrData = json_encode([
        'aluno' => $aluno,
        'prova' => $prova,
        'turma' => $turma
    ]);

    $this->drawGabarito(10, 10, $qrData, $aluno, $prova, $turma);
    $this->drawGabarito(10, 155, $qrData, $aluno, $prova, $turma);

    $this->Output('gabarito.pdf', 'I');
    exit;
}


    /**
     * Gera gabaritos em lote para múltiplos alunos (1 gabarito por aluno em páginas separadas)
     * @param array $alunos Array de alunos com {id_aluno, nome, ...}
     * @param string $prova Nome/código da prova
     * @param string $turma Nome da turma
     * @return string PDF
     */
    public function gerarGabaritoEmLote($alunos, $prova, $turma)
{
    $this->SetCreator('SEA');
    $this->SetAuthor('SEA');
    $this->SetTitle('Gabaritos - Prova ' . $prova);
    $this->SetMargins(10, 10, 10);
    $this->SetAutoPageBreak(true, 10);

    foreach ($alunos as $aluno) {
        $this->AddPage('P', 'A4');

        $qrData = json_encode([
            'id_aluno' => $aluno['id_aluno'],
            'nome_aluno' => $aluno['nome_aluno'],
            'prova' => $prova,
            'turma' => $turma,
            'data' => date('Y-m-d H:i:s')
        ]);

        $this->drawGabarito(10, 10, $qrData, $aluno['nome_aluno'], $prova, $turma);
    }

    $this->Output('gabaritos.pdf', 'I');
    exit;
}


    private function drawGabarito($x, $y, $qrData, $aluno, $prova, $turma)
    {
        // Caixa principal
        $this->RoundedRect($x, $y, 190, 140, 2, '1111', 'D');

        // Cabeçalho simples
        $this->SetFont('helvetica', 'B', 12);
        $this->SetXY($x + 5, $y + 5);
        $this->Cell(0, 8, 'GABARITO DE RESPOSTAS', 0, 1);

        $this->SetFont('helvetica', '', 10);
        $this->SetXY($x + 5, $y + 14);
        $this->Cell(0, 6, "Aluno: $aluno   |   Prova: $prova   |   Turma: $turma", 0, 1);

        // QR CODE
        $this->write2DBarcode($qrData, 'QRCODE,H', $x + 150, $y + 10, 40, 40);

        // Bloco das questões
        $startX = $x + 5;
        $startY = $y + 30;

        $this->SetFont('helvetica', '', 9);

        $colWidth = 55;
        $rowHeight = 5;

        $questao = 1;

        for ($col = 0; $col < 3; $col++) {
            $colX = $startX + ($colWidth * $col);

            for ($i = 0; $i < 20; $i++) {
                $linhaY = $startY + ($i * $rowHeight);

                if ($questao > 60) break;

                // Número da questão
                $this->SetXY($colX, $linhaY);
                $this->Cell(10, $rowHeight, $questao, 0, 0);

                // Bolhas A-E
                $bolhas = ['A', 'B', 'C', 'D', 'E'];
                $bX = $colX + 12;

                foreach ($bolhas as $b) {
                    $this->Circle($bX, $linhaY + 2.5, 2, 0, 360, 'D');
                    $this->SetXY($bX - 1.2, $linhaY + 1.2);
                    $this->Cell(4, 3, $b, 0, 0, 'C');

                    $bX += 9;
                }

                $questao++;
            }
        }
    }
}
