'use client';
import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Snackbar,
  Alert,
  MenuItem,
  TextField,
} from '@mui/material';
import CriarQuestao from '@/components/dashboard/criacao/criar-questao';
import { salvarQuestaoCompleta } from '@/services/questaoService';

export default function PageCriarQuestao() {
  const [assunto, setAssunto] = useState('');
  const [professor, setProfessor] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'warning' | 'info',
  });

  const assuntosDisponiveis = [
    { id: 1, nome: 'Matemática' },
    { id: 2, nome: 'Português' },
    { id: 3, nome: 'Ciências' },
  ];

  const professoresMock = [
    { id: 1, nome: 'Prof. João Silva' },
    { id: 2, nome: 'Profª Ana Souza' },
  ];

  const handleSaveQuestao = async (questao: any) => {
    try {
      if (!assunto) {
        setSnackbar({
          open: true,
          message: 'Selecione um assunto antes de salvar.',
          severity: 'warning',
        });
        return;
      }

      if (!professor) {
        setSnackbar({
          open: true,
          message: 'Selecione o professor responsável.',
          severity: 'warning',
        });
        return;
      }

      const { enunciado, alternativas } = questao;

      if (!enunciado.trim()) {
        setSnackbar({
          open: true,
          message: 'Digite o enunciado da questão!',
          severity: 'warning',
        });
        return;
      }

      if (alternativas.some((a: any) => !a.texto.trim())) {
        setSnackbar({
          open: true,
          message: 'Preencha todas as alternativas!',
          severity: 'warning',
        });
        return;
      }

      const correta = alternativas.find((a: any) => a.correta);
      if (!correta) {
        setSnackbar({
          open: true,
          message: 'Marque uma alternativa correta.',
          severity: 'warning',
        });
        return;
      }

      const novaQuestao = {
        id_assunto: Number(assunto),
        uid_professor: Number(professor),
        enunciado,
        resposta_correta: correta.id,
        tipo: 'objetiva',
        publico: true,
      };

      const sucesso = await salvarQuestaoCompleta(novaQuestao, alternativas);

      setSnackbar({
        open: true,
        message: sucesso
          ? '✅ Questão salva com sucesso!'
          : '❌ Erro ao salvar questão.',
        severity: sucesso ? 'success' : 'error',
      });
    } catch (error) {
      console.error('Erro ao salvar questão:', error);
      setSnackbar({
        open: true,
        message: '❌ Ocorreu um erro inesperado.',
        severity: 'error',
      });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        color="primary"
        textAlign="center"
        mb={4}
      >
        Criar Questão
      </Typography>

      <Box display="flex" gap={2} mb={4}>
        <TextField
          select
          label="Assunto"
          value={assunto}
          onChange={(e) => setAssunto(e.target.value)}
          fullWidth
        >
          {assuntosDisponiveis.map((a) => (
            <MenuItem key={a.id} value={a.id}>
              {a.nome}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Professor"
          value={professor}
          onChange={(e) => setProfessor(e.target.value)}
          fullWidth
        >
          {professoresMock.map((p) => (
            <MenuItem key={p.id} value={p.id}>
              {p.nome}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <CriarQuestao onSave={handleSaveQuestao} />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}