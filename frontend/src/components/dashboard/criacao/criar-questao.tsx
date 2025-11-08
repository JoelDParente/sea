'use client';
import React, { useState } from 'react';
import { Box, Button, Typography, Card, CardContent } from '@mui/material';
import ListaAlternativas, { Alternativa } from './lista-alternativas';
import ModalUploadImagem from './modal-upload-imagem';
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'

export default function CriarQuestao({ onSave }: { onSave: (questao: any) => void }) {
  const [imagem, setImagem] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const getInitialAlternatives = () => [
    { id: crypto.randomUUID(), texto: '', correta: true },
    { id: crypto.randomUUID(), texto: '', correta: false },
    { id: crypto.randomUUID(), texto: '', correta: false },
    { id: crypto.randomUUID(), texto: '', correta: false },
  ];

  const [enunciado, setEnunciado] = useState('');
  const [alternativas, setAlternativas] = useState<Alternativa[]>(getInitialAlternatives());

  const handleSave = () => {
    if (!enunciado.trim()) {
      alert('O enunciado não pode estar vazio.');
      return;
    }

    if (!alternativas.some((alt) => alt.correta)) {
      alert('Marque a alternativa correta.');
      return;
    }

const questaoFinal = {
      titulo: enunciado.substring(0, 50) + '...',
      enunciado,
      imagem, // adiciona caminho da imagem
      alternativas: alternativas.map((alt, index) => ({
        ...alt,
        id: String.fromCharCode(65 + index),
      })),
    };
    onSave(questaoFinal);
    setEnunciado('');
    setAlternativas(getInitialAlternatives());
    setImagem(null);
  };

  return (
    <Card
      sx={{
        width: '100%',
        height: '85vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'none',
        p: 0,
      }}
    >
      {/* Conteúdo principal dividido em duas colunas */}
      <CardContent
        sx={{
          flex: 1,
          display: 'flex',
          gap: 2,
          p: 0,
          overflow: 'hidden',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {/* 🧠 Coluna Esquerda: Enunciado */}
        <Box
          sx={{
            flex: { xs: 'auto', md: 2 },
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'primary.light',
            p: 2,
            minHeight: { xs: '40vh', md: '100%' },
            overflow: 'hidden',
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ mb: 1, color: 'primary.main' }}
          >
            Enunciado da Questão
          </Typography>
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              borderRadius: 1,
              pr: 1,
            }}
          >
            <SimpleEditor />
          </Box>
        </Box>

        {/* 🔡 Coluna Direita: Alternativas */}
        <Box
          sx={{
            flex: { xs: 'auto', md: 1 },
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'secondary.light',
            p: 2,
            overflowY: 'auto',
            minHeight: { xs: '30vh', md: '100%' },
          }}
        >
          <ListaAlternativas
            alternativas={alternativas}
            setAlternativas={setAlternativas}
          />
        </Box>
      </CardContent>

      {/* Rodapé fixo com botão de salvar */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          borderTop: '1px solid #eee',
          p: 2,
          backgroundColor: 'background.paper',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          size="large"
        >
          Salvar Questão
        </Button>
      </Box>

      <ModalUploadImagem
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onUploadSuccess={setImagem}
      />
    </Card>
  );
}