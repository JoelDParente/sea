"use client";

import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, List, ListItem, ListItemText, Box } from '@mui/material';

export interface Alt { texto: string }
export interface FullQuestion {
  id_questao: string | number;
  enunciado: string;
  imagem?: string | null;
  alternativas?: Alt[];
}

interface Props {
  open: boolean;
  onClose: () => void;
  question?: FullQuestion | null;
}

export default function ModalVerMais({ open, onClose, question }: Props) {
  if (!question) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Visualizar questão</DialogTitle>
      <DialogContent dividers>
        {question.imagem && (
          <Box sx={{ mb: 2 }}>
            <img src={question.imagem} alt={`img-${question.id_questao}`} style={{ maxWidth: '100%', height: 'auto' }} />
          </Box>
        )}
        <Typography variant="body1" sx={{ mb: 2 }} dangerouslySetInnerHTML={{ __html: question.enunciado }} />

        <Typography variant="subtitle2" sx={{ mb: 1 }}>Alternativas</Typography>
        <List>
          {(question.alternativas || []).map((alt, i) => (
            <ListItem key={i} disablePadding>
              <ListItemText primary={`${String.fromCharCode(65 + i)}) ${alt.texto}`} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
}
