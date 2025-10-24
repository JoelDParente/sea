'use client';
import React from 'react';
import { Box, TextField, FormControlLabel, Checkbox } from '@mui/material';

interface AlternativaProps {
  index: number;
  texto: string;
  correta: boolean;
  onChangeTexto: (value: string) => void;
  onChangeCorreta: () => void;
}

const Alternativa: React.FC<AlternativaProps> = ({ index, texto, correta, onChangeTexto, onChangeCorreta }) => (
  <Box display="flex" alignItems="center" gap={2} mb={1}>
    <TextField
      fullWidth
      label={`Alternativa ${String.fromCharCode(65 + index)}`}
      value={texto}
      onChange={(e) => onChangeTexto(e.target.value)}
    />
    <FormControlLabel
      control={<Checkbox checked={correta} onChange={onChangeCorreta} />}
      label="Correta"
    />
  </Box>
);

export default React.memo(Alternativa);
