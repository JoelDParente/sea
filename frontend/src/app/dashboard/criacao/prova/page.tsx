"use client";

import React, { useEffect, useState } from 'react';
import { Container, Box, Button, Typography, Stack, TextField } from '@mui/material';
import ModalNomeSerie from '@/components/dashboard/criar-prova/ModalNomeSerie';
import ModalComponenteCurricular from '@/components/dashboard/criar-prova/ModalDisciplina';
import ConstrutorTabs from '@/components/dashboard/criar-prova/ConstrutorTabs';
import ListaQuestoes, { Question } from '@/components/dashboard/criar-prova/ListaQuestoes';
import QuestoesSelecionadas from '@/components/dashboard/criar-prova/QuestoesSelecionadas';
import { ArrowLeft } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';
import { paths } from '@/paths';
import axios from 'axios';

export default function Page() {
  const router = useRouter();
  const [openNomeSerie, setOpenNomeSerie] = useState(false);
  const [prova, setProva] = useState<{ nome: string; turmas: any[] } | null>(null);

  const [openComponente, setOpenComponente] = useState(false);
  const [componenteSelecionado, setComponenteSelecionado] = useState<any | null>(null);

  const [tab, setTab] = useState(0);

  const [questoesSelecionadas, setQuestoesSelecionadas] = useState<Question[]>([]);
  const [versionsCount, setVersionsCount] = useState<number>(1);
  const [loadingGerar, setLoadingGerar] = useState(false);

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
        try { sessionStorage.setItem('criarProvaNomeSerieDone', '1'); } catch (e) {}
        setOpenNomeSerie(false);
        setOpenComponente(false);
      } else {
        const done = sessionStorage.getItem('criarProvaNomeSerieDone');
        if (!done) setOpenNomeSerie(true);
      }
    } catch (e) {
      console.warn('Erro ao ler criarProvaInit', e);
      const done = sessionStorage.getItem('criarProvaNomeSerieDone');
      if (!done) setOpenNomeSerie(true);
    }
  }, []);

  const handleConfirmNomeSerie = (payload: { nome: string; turmas: any[] }) => {
    setProva(payload);
    setOpenNomeSerie(false);
    try { sessionStorage.setItem('criarProvaNomeSerieDone', '1'); } catch (e) {}
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
    if (!prova || !componenteSelecionado || !Array.isArray(prova.turmas) || prova.turmas.length === 0) return;
    setLoadingGerar(true);
    try {
      const payloadVersoes = {
        nome_prova: prova.nome,
        serie: prova.turmas[0]?.serie ?? '',
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
          } catch (e) {}
          return null;
        })(),
        nome_professor: (() => {
          try {
            const u = localStorage.getItem('user');
            if (u) {
              const parsed = JSON.parse(u);
              return parsed?.nome || parsed?.nome_professor || parsed?.nome_usuario || null;
            }
          } catch (e) {}
          return null;
        })(),
      };

      const resVersoes = await axios.post('http://localhost/sea/backend/controllers/gerarVersoesProvaController.php', payloadVersoes);

      if (resVersoes.data?.sucesso && Array.isArray(resVersoes.data.versoes) && resVersoes.data.versoes.length > 0) {
        const payloadZip = {
          id_prova: resVersoes.data.id_prova,
          versoes: resVersoes.data.versoes,
          nome_prova: prova.nome,
          id_disciplina: componenteSelecionado.id_disciplina,
          serie: prova.turmas[0]?.serie ?? '',
          nome_professor: resVersoes.data.payload_zip?.nome_professor ?? null,
          id_turmas: prova.turmas.map((t:any)=>t.id_turma)
        };

        const resZip = await axios.post('http://localhost/sea/backend/controllers/downloadProvasZipController.php', payloadZip);
        if (resZip.data?.sucesso && resZip.data.url_download) {
          window.location.href = resZip.data.url_download;
        } else {
          console.error('Erro ao gerar ZIP no servidor:', resZip.data);
          alert('Erro: Não foi possível gerar o arquivo ZIP no servidor');
        }
      } else {
        console.error('Resposta inesperada ao gerar versões:', resVersoes.data);
        alert('Erro: Não foi possível gerar as versões de prova');
      }
    } catch (err) {
      console.error('Erro ao gerar PDF:', err);
      alert('Erro ao gerar PDF: ' + (err instanceof Error ? err.message : 'Desconhecido'));
    } finally {
      setLoadingGerar(false);
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
          <Typography variant="subtitle1">{prova ? `${prova.nome} — ${prova.turmas?.map((t:any)=>t.nome_turma).join(', ')}` : 'Nome e turmas não definidos'}</Typography>
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
              <Button
                variant="contained"
                color="primary"
                onClick={handleGerarPDF}
                disabled={!prova || !componenteSelecionado || questoesSelecionadas.length === 0 || !(Array.isArray(prova?.turmas) && prova?.turmas.length>0) || loadingGerar}
              >
                {loadingGerar ? 'Gerando provas e gabaritos...' : 'Gerar Provas e Gabaritos'}
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
