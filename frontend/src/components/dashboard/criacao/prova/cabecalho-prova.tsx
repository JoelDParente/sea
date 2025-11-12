import { Box, Typography, Divider } from '@mui/material';
import React from 'react';

interface CabecalhoProvaProps {
  titulo: string;
  disciplina: string;
  professor: string;
  avaliacao: string;
}

const CabecalhoProva: React.FC<CabecalhoProvaProps> = ({
  titulo,
  disciplina,
  professor,
  avaliacao,
}) => (
  <Box sx={{ textAlign: 'center', mb: 2 }}>
    <Typography variant="h6" fontWeight={600}>
      {titulo}
    </Typography>
    <Typography variant="subtitle1" color="text.secondary">
      {disciplina} — {avaliacao}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Professor(a): {professor}
    </Typography>
    <Divider sx={{ mt: 1 }} />
  </Box>
);

export default CabecalhoProva;
