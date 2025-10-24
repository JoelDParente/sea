'use client';
import React, { useState, useEffect } from 'react';
import { Box, Stack, TextField, MenuItem, Button, Drawer, Typography, IconButton, Paper, Divider, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PrintIcon from '@mui/icons-material/Print';
import { FloppyDiskIcon } from '@phosphor-icons/react';
import FolhasA4 from './folhaA4';
import ModalCriarQuestao from './modal-criar-questao';

interface FormProva {
  titulo: string;
  disciplina: string;
  dificuldade: 'Fácil' | 'Médio' | 'Difícil' | '';
  numQuestoes: number;
}

const DISCIPLINAS = [
  { value: 'Matemática', label: 'Matemática' },
  { value: 'Português', label: 'Português' },
  { value: 'História', label: 'História' },
  { value: 'Geografia', label: 'Geografia' },
  { value: 'Química', label: 'Química' },
];

const APP_BAR_HEIGHT_OFFSET = 64;

const CriarProva: React.FC = () => {
  const [form, setForm] = useState<FormProva>({
    titulo: 'Minha Avaliação Bimestral',
    disciplina: 'Química',
    dificuldade: 'Médio',
    numQuestoes: 6,
  });

  const [questoes, setQuestoes] = useState<(any | null)[]>(Array(form.numQuestoes).fill(null));
  const [modalAberto, setModalAberto] = useState(false);
  const [slotAtivo, setSlotAtivo] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(true);

  useEffect(() => {
    setQuestoes((prev) => {
      const novo = Array(form.numQuestoes).fill(null);
      prev.forEach((q, i) => {
        if (i < novo.length) novo[i] = q;
      });
      return novo;
    });
  }, [form.numQuestoes]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'numQuestoes' ? Math.max(1, Math.min(50, Number(value))) : value });
  };

  const abrirModal = (index: number) => {
    setSlotAtivo(index);
    setModalAberto(true);
  };

  const salvarQuestao = (questao: any) => {
    if (slotAtivo === null) return;
    const novasQuestoes = [...questoes];
    novasQuestoes[slotAtivo] = {
      ...questao,
      ordem: slotAtivo + 1
    };
    setQuestoes(novasQuestoes);
    setModalAberto(false);
    setSlotAtivo(null);
  };

  const publicarProva = () => {
    const questoesValidas = questoes.filter(q => q !== null);
    if (questoesValidas.length === 0) {
      alert('Adicione pelo menos uma questão antes de publicar.');
      return;
    }
    console.log('Prova Publicada:', { form, questoes: questoesValidas });
    alert('Prova publicada com sucesso!');
  };

  const handleExportPdf = () => {
    alert('Simulando a exportação para PDF/Impressão. Para ver o resultado, visualize a Folha A4.');
    window.print();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: `calc(100vh - ${APP_BAR_HEIGHT_OFFSET}px)`, // Define a altura total da área de trabalho
        overflow: 'hidden', // Impede a rolagem do contêiner pai
      }}
    >

      {/* Menu Lateral de Configurações */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={drawerOpen}
        sx={{
          width: 300,
          flexShrink: 0,
          zIndex: 100, // Z-index alto para sobrepor o conteúdo
          '& .MuiDrawer-paper': {
            width: 300,
            boxSizing: 'border-box',
            position: 'static', // Importante: Garante que o Drawer ocupe espaço
            overflowY: 'visible',
          },
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 3,
            // Painel Fixo: Ocupa toda a altura visível e permite rolagem interna
            position: 'sticky',
            top: 0,
            maxHeight: `calc(100vh - ${APP_BAR_HEIGHT_OFFSET}px)`,
            overflowY: 'auto',
            zIndex: 50, // Menor que o Drawer, mas garante o contexto sticky
          }}
        >
          <Typography variant="h6" fontWeight="bold" color="primary" gutterBottom>
            Configurações da Prova
          </Typography>
          <Stack spacing={3} mt={2}>
            {/* ... Campos de Formulário ... */}
            <TextField
              label="Título da Prova"
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              select
              label="Disciplina"
              name="disciplina"
              value={form.disciplina}
              onChange={handleChange}
              fullWidth
            >
              {DISCIPLINAS.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              type="number"
              label="Número de Questões"
              name="numQuestoes"
              value={form.numQuestoes}
              onChange={handleChange}
              fullWidth
              inputProps={{ min: 1, max: 50 }}
            />
          </Stack>
        </Paper>
      </Drawer>

      {/* Conteúdo Principal: Folhas A4 (Área de Rolagem) */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: drawerOpen ? `calc(100% - 300px)` : '100%',
          height: `calc(100vh - ${APP_BAR_HEIGHT_OFFSET}px)`,
          overflowY: 'auto',
          p: 2,
        }}
      >
        {/* Barra de Ações Flutuante (Fica no topo desta área de rolagem) */}
        <Paper
          elevation={4}
          sx={{
            top: 0,
            zIndex: 10,
            p: 1,
            mb: 3,
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 2
          }}
        >
          <Tooltip title="Salvar Rascunho">
            <IconButton onClick={() => alert('Rascunho salvo!')} size="small">
              <FloppyDiskIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Exportar PDF">
            <IconButton onClick={handleExportPdf} size="small">
              <PrintIcon />
            </IconButton>
          </Tooltip>
          {/* O botão principal Publicar PROVA deve permanecer um Button para destaque. */}
          <Button variant="contained" color="primary" size="small" onClick={publicarProva}>
            Publicar Prova
          </Button>
        </Paper>

        {/* Folhas A4 com slots dinâmicos */}
        <FolhasA4
          questoes={questoes}
          onSlotClick={abrirModal}
          slotsPorFolha={6}
          metadata={{ titulo: form.titulo, disciplina: form.disciplina }}
        />

        {/* Modal de criação de questão */}
        <ModalCriarQuestao
          open={modalAberto && slotAtivo !== null}
          onClose={() => {
            setModalAberto(false);
            setSlotAtivo(null);
          }}
          onSave={salvarQuestao}
        />
      </Box>
    </Box>
  );
};

export default CriarProva;