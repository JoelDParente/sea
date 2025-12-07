<?php
require_once 'vendor/autoload.php';

use Dompdf\Dompdf;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

try {
    // CRIA O PDF
    $dompdf = new Dompdf();
    $html = '<!DOCTYPE html>
    <html lang="pt-BR">
    <head>
    <meta charset="UTF-8" />
    <title>Gabarito Ceará - A5 Otimizado para TCPDF</title>
    <style>
      /* Estilos otimizados para TCPDF: removidos grid/flex, usados tables e inline-block */
      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        padding: 0;
        font-family: Arial, Helvetica, sans-serif;
      }

      .folha {
        width: 185mm; /* Ajustado para caber em A5 paisagem com margens */
        border-collapse: collapse;
      }

      .esquerda {
        border: 1px solid #000;
        border-right: none;
        padding: 3mm 2.5mm;
        vertical-align: top;
      }

      .direita {
        width: 30mm;
        border: 1px solid #000;
        background: #f8f8f8;
        padding: 3mm 2mm;
        font-size: 7pt;
        vertical-align: center;
      }

      .cabecalho {
        width: 100%;
        border-bottom: 1px solid #000;
        padding-bottom: 2mm;
        margin-bottom: 2mm;
      }

        
      .cabecalho td {
       vertical-align: top;
      }

.logo img {
  height: 70px; /* ajuste como quiser */
}

.titulo {
  font-size: 14pt;
  font-weight: bold;
  text-align: center;
}

.nome {
  font-weight: normal;
  font-size: 12pt;
  margin-top: 3px;
  text-align: left;
}

      .cabecalho td img {
        height: 11mm;
        vertical-align: middle;
      }

      .titulo {
        font-size: 11pt;
        font-weight: bold;
        text-align: center;
      }

      .informacoes-alinhadas {
        width: 100%;
        margin-bottom: 10mm;
        border-collapse: collapse;
      }

      .informacoes-aluno,
      .informacoes-professor {
        border-bottom: 1px solid #000;
        padding: 1mm 3mm;
        font-size: 6pt;
        line-height: 1.2;
        vertical-align: top;
      }

      .informacoes-aluno {
        border-right: 1px solid #000;
      }

      .nome,
      .curso,
      .professor-info {
        font-weight: bold;
        font-size: 10pt;
        margin: 5mm 0;
      }

      .grade {
        width: 100%;
        border-collapse: collapse;
      }

      .coluna-questao {
        border-right: 1px solid #000;
        padding: 0.8mm 1mm;
        vertical-align: top;
      }

      .coluna-questao:last-child {
        border-right: none;
      }

      .questao {
        margin-bottom: 0.8mm;
        text-align: center;
      }

      .num {
        display: inline-block;
        width: 5mm;
        text-align: right;
        font-weight: bold;
        font-size: 8pt;
      }

      .bolas {
        display: inline-block;
      }

      .bola {
        display: inline-block;
        width: 3.2mm;
        height: 3.2mm;
        border: 0.8px solid #000;
        border-radius: 50%;
        background: white;
        text-align: center;
        line-height: 3.2mm;
        font-size: 6pt;
        margin-left: 1.2mm;
      }

      .numero-aluno {
        text-align: center;
        margin-bottom: 3mm;
      }

      .numero-aluno strong {
        font-size: 8pt;
        display: block;
        margin-bottom: 2mm;
      }

      .digitos .digito {
        display: inline-block;
        width: 5.5mm;
        height: 8mm;
        line-height: 8mm;
        border: 1px solid #000;
        text-align: center;
        font-weight: bold;
        font-size: 10pt;
        margin-right: 2.5mm;
      }

      .digitos .digito:last-child {
        margin-right: 0;
      }

      .qr {
        width: 18mm;
        height: 18mm;
        background: #ccc;
        border: 1px solid #000;
        margin: 4mm auto;
      }

      .bloco {
        width: 100%;
        margin: 4mm 0;
        text-align: left;
      }

      .bloco strong {
        display: block;
        margin-bottom: 2mm;
        font-size: 8pt;
      }

      .bloco label {
        display: block;
        margin: 1mm 0;
        font-size: 7pt;
      }

      .bloco.verificador {
        text-align: center;
      }

      .bloco.serie {
        margin: 4mm 0;
      }

      .bloco.serie label {
        margin: 0.5mm 0;
      }

      .bloco.serie .bola {
        display: inline-block;
        margin-right: 2mm;
      }

      .bloco.serie p {
        display: inline-block;
        margin: 0;
      }

      .instrucao {
        margin-top: auto;
        text-align: center;
        font-weight: bold;
        font-size: 7pt;
        border: 1px solid #000;
        padding: 2mm;
        background: white;
      }

      input[type="checkbox"],
      input[type="radio"] {
        width: 2mm;
        height: 2mm;
        margin-right: 1mm;
      }
    </style>
  </head>
  <body>
    <table class="folha">
      <tr>
        <td class="esquerda">
<table class="cabecalho" cellspacing="0" cellpadding="0">
  <tr>
    <td class="logo">
      <img src="http://localhost/sea/backend/uploads/logos/logo-sea.png" alt="Ceará" />
    </td>

    <td class="titulo">
      AVALIAÇÃO BIMESTRAL DE LÍNGUA PORTUGUESA - 3º BIM
      <div class="nome" style="font-size: 6pt;">Nome do participante:</div>
      <div class="nome">JOEL DAMASCENO PARENTE</div>
    </td>
  </tr>
</table>

          <table class="informacoes-alinhadas" cellspacing="0" cellpadding="0" >
            <tr>
              <td class="informacoes-aluno">
                <div class="curso" style="font-size: 6pt;">1ª - 1ª SÉRIE CURSO TÉCNICO EM INFORMÁTICA - INFORMÁTICA - Integral - 2024</div>
              </td>
              <td class="informacoes-professor">
                <div class="professor-info" style="font-size: 6pt;">Para uso exclusivo do professor ou aplicador</div>
                <div class="questao" style="display: inline;">

                    <div class="bola"> </div> 
                    <span class="num" style="display: inline;">Aluno ausente</span> 
                    
                    <div class="bola"> </div> 
                    <span class="num" style="display: inline;">Aluno ausente</span>
                    
                </div>               
              </td>
            </tr>
          </table>

          <table class="grade" cellspacing="0" cellpadding="0">
            <tr>
              <td class="coluna-questao" id="col1">
                <div class="questao"><span class="num">1</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">2</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">3</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">4</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">5</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">6</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">7</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">8</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">9</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">10</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">11</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">12</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">13</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">14</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">15</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
              </td>
              <td class="coluna-questao" id="col2">
                <div class="questao"><span class="num">16</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">17</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">18</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">19</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">20</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">21</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">22</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">23</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">24</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">25</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">26</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">27</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">28</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">29</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">30</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
              </td>
              <td class="coluna-questao" id="col3">
                <div class="questao"><span class="num">31</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">32</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">33</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">34</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">35</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">36</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">37</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">38</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">39</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">40</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">41</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">42</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">43</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">44</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">45</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
              </td>
              <td class="coluna-questao" id="col4">
                <div class="questao"><span class="num">46</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">47</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">48</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">49</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">50</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">51</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">52</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">53</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">54</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">55</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">56</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">57</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">58</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">59</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
                <div class="questao"><span class="num">60</span><span class="bolas"><div class="bola">A</div><div class="bola">B</div><div class="bola">C</div><div class="bola">D</div><div class="bola">E</div></span></div>
              </td>
            </tr>
          </table>
        </td>
          <td class="direita">
              <table class="vertical-between">
                <div class="numero-aluno">
                 <strong>Número</strong>
                       <div class="digitos">
                <div class="digito">1</div>
                     <div class="digito">8</div>
              </div>
              </div>

            <tr>
            <td class="spacer">&nbsp;</td>
            </tr>

          <div class="bloco verificador">
            <label for="qr">Verificador</label>
            <div class="qr"></div>
          </div>

            <tr>
                  <td class="spacer">&nbsp;</td>
             </tr>

          <div class="bloco serie">
            <strong>Cor da Prova:</strong>
            <label><div class="bola"> </div><p>Azul</p></label>
            <label><div class="bola"> </div><p>Amarela</p></label>
            <label><div class="bola"> </div><p>Rosa</p></label>
            <label><div class="bola"> </div><p>Verde</p></label>
          </div>

                <tr>
                <td class="footer">
               <!-- BLOCO INFERIOR -->
              <div class="instrucao">
               ATENÇÃO<br />
              A correção desta folha é automática.<br />
             Não rasgue.
            </div>
            </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>';

    $dompdf->loadHtml($html);
    $dompdf->setPaper('A4');
    $dompdf->render();

    // GARANTE QUE A PASTA EXISTE
    $folder = __DIR__ . "/pdfs/";
    if (!is_dir($folder)) {
        mkdir($folder, 0777, true);
    }

    // SALVA O PDF NO SERVIDOR
    $filePath = $folder . "teste.pdf";
    file_put_contents($filePath, $dompdf->output());

    echo json_encode([
        "url" => "http://localhost/sea/backend/pdfs/teste.pdf"
    ]);
} catch (Exception $e) {
    echo json_encode(["erro" => $e->getMessage()]);
}
