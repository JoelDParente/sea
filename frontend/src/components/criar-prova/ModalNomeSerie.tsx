"use client";

import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@mui/material';

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: (payload: { nome: string; serie: string }) => void;
}

const series = ['1ª ano', '2ª ano', '3ª ano', '4ª ano', '5º ano', '6ª ano', '7ª ano', '8ª ano', '9º ano', '1º ano ao 3º ano '];

export default function ModalNomeSerie({ open, onClose, onConfirm }: Props) {
  const [nome, setNome] = useState('');
  const [serie, setSerie] = useState('');
  const [touched, setTouched] = useState(false);

  const canConfirm = nome.trim().length > 0 && serie !== '';

  const handleConfirm = () => {
    setTouched(true);
    if (!canConfirm) return;
    onConfirm({ nome: nome.trim(), serie });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Nome e Série da Prova</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Nome da Prova"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            fullWidth
            required
            error={touched && nome.trim() === ''}
            helperText={touched && nome.trim() === '' ? 'Informe o nome da prova' : ''}
          />

          <FormControl component="fieldset" error={touched && serie === ''}>
            <FormLabel component="legend">Série</FormLabel>
            <RadioGroup value={serie} onChange={(e) => setSerie(e.target.value)} row>
              {series.map((s) => (
                <FormControlLabel key={s} value={s} control={<Radio />} label={s} />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleConfirm} disabled={!canConfirm}>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
