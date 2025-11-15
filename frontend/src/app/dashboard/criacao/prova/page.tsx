"use client";

import React, { useEffect, useState } from 'react';
import { Container, Box, Button, Typography, Stack } from '@mui/material';
import ModalNomeSerie from '../../../../components/criar-prova/ModalNomeSerie';
import ModalComponenteCurricular from '../../../../components/criar-prova/ModalDisciplina';
import ConstrutorTabs from '../../../../components/criar-prova/ConstrutorTabs';
import ListaQuestoes, { Question } from '../../../../components/criar-prova/ListaQuestoes';
import QuestoesSelecionadas from '../../../../components/criar-prova/QuestoesSelecionadas';
import axios from 'axios';

export default function Page() {
  // Etapa 1: Nome e Série
  const [openNomeSerie, setOpenNomeSerie] = useState(false);
  const [prova, setProva] = useState<{ nome: string; serie: string } | null>(null);

  // Etapa 2: Componente curricular
  const [openComponente, setOpenComponente] = useState(false);
  const [turmaSelecionada, setTurmaSelecionada] = useState<any | null>(null);

  // Tabs
  const [tab, setTab] = useState(0);

  // Questões selecionadas
  const [questoesSelecionadas, setQuestoesSelecionadas] = useState<Question[]>([]);

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
          setTurmaSelecionada(parsed.turma);
        }
        // limpar para não reutilizar
        sessionStorage.removeItem('criarProvaInit');
        // garantir que o fluxo não reabra o modal
        setOpenNomeSerie(false);
        setOpenComponente(false);
      } else {
        // se não há inicialização, forçar o modal obrigatório
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
    setTurmaSelecionada(turma);
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
    if (!prova || !turmaSelecionada) return;
    try {
      const payload = {
        nome_prova: prova.nome,
        serie: prova.serie,
        id_turma: turmaSelecionada.id_turma,
        questoes: questoesSelecionadas.map((q) => q.id_questao),
      };

      // Ajuste a URL conforme seu backend
      const res = await axios.post('/backend/controllers/ProvaController.php?acao=gerarPdf', payload);
      console.log('Gerar PDF resposta:', res.data);
      // você pode mostrar um toast ou iniciar download, dependendo da resposta
    } catch (err) {
      console.error('Erro ao gerar PDF', err);
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Construtor de Provas
      </Typography>

      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Box>
          <Typography variant="subtitle1">{prova ? `${prova.nome} — ${prova.serie}` : 'Nome e série não definidos'}</Typography>
          <Typography variant="caption">Turma: {turmaSelecionada?.nome_turma || 'Nenhuma'}</Typography>
        </Box>
        <Box>
          <Button variant="outlined" onClick={() => setOpenNomeSerie(true)} sx={{ mr: 1 }}>
            Editar Nome/Série
          </Button>
          <Button variant="outlined" onClick={() => setOpenComponente(true)}>
            Trocar Componente
          </Button>
        </Box>
      </Stack>

      <ConstrutorTabs value={tab} onChange={setTab} />

      <Box>
        {tab === 0 && (
          <ListaQuestoes turmaId={turmaSelecionada?.id_turma ?? null} onSelect={handleSelectQuestao} />
        )}

        {tab === 1 && (
          <Box>
            <QuestoesSelecionadas questoes={questoesSelecionadas} onRemove={handleRemoveQuestao} />
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" color="primary" onClick={handleGerarPDF} disabled={!prova || !turmaSelecionada || questoesSelecionadas.length === 0}>
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
