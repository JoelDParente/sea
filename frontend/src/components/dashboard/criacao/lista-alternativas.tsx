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

export interface Alternativa {
  id: string;
  texto: string;
  correta: boolean;
}

interface ListaAlternativasProps {
  alternativas: Alternativa[];
  setAlternativas: (alt: Alternativa[]) => void;
}

export default function ListaAlternativas({ alternativas, setAlternativas }: ListaAlternativasProps) {
  const MAX_ALTERNATIVES = 26;
  const MIN_ALTERNATIVES = 2;

  const handleTextoChange = (id: string, novoTexto: string) => {
    setAlternativas(alternativas.map(a => (a.id === id ? { ...a, texto: novoTexto } : a)));
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
      { id: crypto.randomUUID(), texto: '', correta: false },
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
                border: '1px solid',
                borderColor: alt.correta ? 'success.light' : 'divider',
                borderRadius: 1.5,
                p: 1,
                transition: '0.2s',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              {/* Letra */}
              <Grid >
                <Typography
                  sx={{
                    width: 24,
                    fontWeight: 'bold',
                    textAlign: 'right',
                    color: alt.correta ? 'success.main' : 'text.primary',
                  }}
                >
                  {letra})
                </Typography>
              </Grid>

              {/* Campo de texto */}
              <Grid >
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  value={alt.texto}
                  onChange={(e) => handleTextoChange(alt.id, e.target.value)}
                  placeholder={`Escreva a alternativa ${letra}`}
                />
              </Grid>

              {/* Correta */}
              <Grid >
                <Checkbox
                  checked={alt.correta}
                  onChange={() => handleCorretaChange(alt.id)}
                  color="success"
                  title="Marcar como correta"
                />
              </Grid>

              {/* Excluir */}
              <Grid >
                <IconButton
                  color="error"
                  onClick={() => handleRemover(alt.id)}
                  disabled={alternativas.length <= MIN_ALTERNATIVES}
                  title="Remover alternativa"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Grid>
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
