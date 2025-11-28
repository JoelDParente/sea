"use client";

import React, { useEffect, useState } from 'react';
import { Container, Box, Button, Typography, Stack, TextField } from '@mui/material';
import ModalNomeSerie from '@/components/criar-prova/ModalNomeSerie';
import ModalComponenteCurricular from '@/components/criar-prova/ModalDisciplina';
import ConstrutorTabs from '@/components/criar-prova/ConstrutorTabs';
import ListaQuestoes, { Question } from '@/components/criar-prova/ListaQuestoes';
import QuestoesSelecionadas from '@/components/criar-prova/QuestoesSelecionadas';
import { ArrowLeft } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';
import { paths } from '@/paths';
import axios from 'axios';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export default function Page() {
  const router = useRouter();
  // Etapa 1: Nome e Série
  const [openNomeSerie, setOpenNomeSerie] = useState(false);
  const [prova, setProva] = useState<{ nome: string; serie: string } | null>(null);

  // Etapa 2: Componente curricular
  const [openComponente, setOpenComponente] = useState(false);
  const [componenteSelecionado, setComponenteSelecionado] = useState<any | null>(null);

  // Tabs
  const [tab, setTab] = useState(0);

  // Questões selecionadas
  const [questoesSelecionadas, setQuestoesSelecionadas] = useState<Question[]>([]);
  // Quantidade de versões a gerar (1..4)
  const [versionsCount, setVersionsCount] = useState<number>(1);

  // Ao montar, verificar se existe um payload de inicialização vindo do CardAcao (sessionStorage)
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('criarProvaInit');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.prova) {
          setProva(parsed.prova);
        }
        if (parsed?.turma) {
          setComponenteSelecionado(parsed.turma);
        }
        sessionStorage.removeItem('criarProvaInit');
        setOpenNomeSerie(false);
        setOpenComponente(false);
      } else {
        setOpenNomeSerie(true);
      }
    } catch (e) {
      console.warn('Erro ao ler criarProvaInit', e);
      setOpenNomeSerie(true);
    }
  }, []);

  // Abre o modal do componente ao confirmar nome/serie
  const handleConfirmNomeSerie = (payload: { nome: string; serie: string }) => {
    setProva(payload);
    setOpenNomeSerie(false);
    setOpenComponente(true);
  };

  const handleConfirmComponente = (turma: any) => {
    setComponenteSelecionado(turma);
    setOpenComponente(false);
    setTab(0);
  };

  const handleSelectQuestao = (q: Question) => {
    if (questoesSelecionadas.find((x) => String(x.id_questao) === String(q.id_questao))) return;
    setQuestoesSelecionadas((s) => [...s, q]);
  };

  const handleRemoveQuestao = (id: string | number) => {
    setQuestoesSelecionadas((s) => s.filter((q) => String(q.id_questao) !== String(id)));
  };

  const handleGerarPDF = async () => {
    if (!prova || !componenteSelecionado) return;
    try {
      const payload = {
        nome_prova: prova.nome,
        serie: prova.serie,
        id_disciplina: componenteSelecionado.id_disciplina,
        questoes: questoesSelecionadas.map((q) => q.id_questao),
        qtd_versoes: versionsCount,
        id_professor: (() => {
          try {
            const u = localStorage.getItem('user');
            if (u) {
              const parsed = JSON.parse(u);
              return parsed?.id || parsed?.id_professor || parsed?.id_usuario || null;
            }
          } catch (e) {
            // ignore
          }
          return null;
        })(),
        nome_professor: (() => {
          try {
            const u = localStorage.getItem('user');
            if (u) {
              const parsed = JSON.parse(u);
              return parsed?.nome || parsed?.nome_professor || parsed?.nome_usuario || null;
            }
          } catch (e) {
            // ignore
          }
          return null;
        })(),
      };

      console.log('Payload:', payload);
      
      const res = await axios.post('http://localhost/sea/backend/controllers/gerarVersoesProvaController.php', payload);
      
      if (res.data?.sucesso && Array.isArray(res.data.versoes) && res.data.versoes.length > 0) {
        console.log('Versões criadas:', res.data.versoes);
        
        // Criar ZIP com jszip
        const zip = new JSZip();
        let pdfCount = 0;
        
        for (const versao of res.data.versoes) {
          if (!versao.url_pdf) continue;
          
          try {
            // Baixar PDF
            const pdfRes = await axios.get(versao.url_pdf, {
              responseType: 'arraybuffer',
              timeout: 30000,
            });
            
            // Adicionar ao ZIP
            const fileName = `prova_versao_${versao.codigo_versao}.pdf`;
            zip.file(fileName, pdfRes.data, { binary: true });
            pdfCount++;
            console.log(`✓ PDF adicionado ao ZIP: ${fileName}`);
          } catch (pdfErr) {
            console.error(`Erro ao baixar PDF da versão ${versao.codigo_versao}:`, pdfErr);
          }
        }
        
        if (pdfCount === 0) {
          alert('Erro: Nenhum PDF foi baixado com sucesso');
          return;
        }
        
        // Gerar ZIP e disparar download
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const zipName = `${prova.nome.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.zip`;
        saveAs(zipBlob, zipName);
        
        console.log(`✓ ZIP gerado e baixado: ${zipName} (${pdfCount} PDFs)`);
      } else {
        console.error('Resposta inesperada ao gerar versões:', res.data);
        alert('Erro: Não foi possível gerar as versões de prova');
      }
    } catch (err) {
      console.error('Erro ao gerar PDF:', err);
      alert('Erro ao gerar PDF: ' + (err instanceof Error ? err.message : 'Desconhecido'));
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Construtor de Provas
      </Typography>
      <Button
        startIcon={<ArrowLeft size={18} />}
        onClick={() => router.push(paths.dashboard.criacao.root)}
        sx={{ mb: 2 }}
      >
        Voltar para o Menu
      </Button>

      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Box>
          <Typography variant="subtitle1">{prova ? `${prova.nome} — ${prova.serie}` : 'Nome e série não definidos'}</Typography>
        </Box>
        <Box>
          <Button variant="outlined" onClick={() => setOpenNomeSerie(true)} sx={{ mr: 1 }}>
            Editar Nome/Série
          </Button>
          <Button variant="outlined" onClick={() => setOpenComponente(true)}>
            Trocar Disciplina
          </Button>
        </Box>
      </Stack>

      <ConstrutorTabs value={tab} onChange={setTab} />

      <Box>
        {tab === 0 && (
          <ListaQuestoes
            id_disciplina={componenteSelecionado?.id_disciplina ?? null}
            onSelect={handleSelectQuestao}
            selectedIds={questoesSelecionadas.map((q) => q.id_questao)}
          />
        )}

        {tab === 1 && (
          <Box>
            <QuestoesSelecionadas questoes={questoesSelecionadas} onRemove={handleRemoveQuestao} />
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}>
              <TextField
                label="Versões"
                type="number"
                size="small"
                value={versionsCount}
                inputProps={{ min: 1, max: 4 }}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  if (isNaN(v)) return setVersionsCount(1);
                  setVersionsCount(Math.max(1, Math.min(4, Math.floor(v))));
                }}
                sx={{ width: 100 }}
              />
              <Button variant="contained" color="primary" onClick={handleGerarPDF} disabled={!prova || !componenteSelecionado || questoesSelecionadas.length === 0}>
                Gerar PDF
              </Button>
            </Box>
          </Box>
        )}
      </Box>

      {/* Modais */}
      <ModalNomeSerie open={openNomeSerie} onClose={() => setOpenNomeSerie(false)} onConfirm={handleConfirmNomeSerie} />

      <ModalComponenteCurricular
        open={openComponente}
        onClose={() => setOpenComponente(false)}
        onConfirm={handleConfirmComponente}
      />
    </Container>
  );
}
