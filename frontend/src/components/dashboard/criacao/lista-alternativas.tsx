'use client';
import React from 'react';
import {
  Box,
  TextField,
  Checkbox,
  Typography,
  Button,
  IconButton,
  Grid,
  Stack,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MiniEditor from './mini-editor';

export interface Alternativa {
  id: string;
  texto: string;
  correta: boolean;
  imagemUrl?: string | null;
}

interface ListaAlternativasProps {
  alternativas: Alternativa[];
  setAlternativas: (alt: Alternativa[]) => void;
}

export default function ListaAlternativas({ alternativas, setAlternativas }: ListaAlternativasProps) {
  const MAX_ALTERNATIVES = 26;
  const MIN_ALTERNATIVES = 2;

  const handleTextoChange = (id: string, novoTexto: string) => {
    const extractFirstImageUrl = (html: string) => {
      const div = document.createElement('div');
      div.innerHTML = html || '';
      const img = div.querySelector('img');
      return img ? img.getAttribute('src') : null;
    }

    setAlternativas(alternativas.map(a => (a.id === id ? { ...a, texto: novoTexto, imagemUrl: extractFirstImageUrl(novoTexto) } : a)));
  };

  const handleCorretaChange = (id: string) => {
    setAlternativas(alternativas.map(a => ({ ...a, correta: a.id === id })));
  };

  const handleAdicionar = () => {
    if (alternativas.length >= MAX_ALTERNATIVES) {
      alert(`Limite máximo de ${MAX_ALTERNATIVES} alternativas (A-Z) atingido.`);
      return;
    }
    setAlternativas([
      ...alternativas,
      { id: crypto.randomUUID(), texto: '', correta: false, imagemUrl: null },
    ]);
  };

  const handleRemover = (id: string) => {
    setAlternativas(alternativas.filter(a => a.id !== id));
  };

  return (
    <Box>
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
        Alternativas
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
        Marque a caixa para indicar a resposta correta.
      </Typography>

      <Stack spacing={1.2}>
        {alternativas.map((alt, index) => {
          const letra = String.fromCharCode(65 + index); // A, B, C...

          return (
            <Grid
            key={alt.id}
              container
              alignItems="center"
              spacing={1}
              wrap="nowrap"
              sx={{
                border: "1px solid #ccc",
                borderRadius: 2,
                p: 1.5,
                mb: 1.5,
                alignItems: "flex-start",
              }}
            >
              {/* Letra */}
              <Typography sx={{ fontWeight: "bold", mt: 1 }}>
                {letra})
              </Typography>

              {/* Mini Editor */}
              <Box sx={{ flex: 1 }}>
                <MiniEditor
                  value={alt.texto}
                  onChange={(html) => handleTextoChange(alt.id, html)}
                />
              </Box>

              {/* Correta */}
              <Checkbox checked={alt.correta} onChange={() => handleCorretaChange(alt.id)} />

              {/* Deletar */}
              <IconButton onClick={() => handleRemover(alt.id)}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          );
        })}
      </Stack>

      <Box textAlign="center" mt={2}>
        <Button
          startIcon={<AddCircleOutlineIcon />}
          onClick={handleAdicionar}
          disabled={alternativas.length >= MAX_ALTERNATIVES}
          size="small"
        >
          Adicionar Alternativa ({alternativas.length}/{MAX_ALTERNATIVES})
        </Button>
      </Box>
    </Box>
  );
}
