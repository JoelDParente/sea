'use client';

import * as React from 'react';
import { Container, Box, Typography } from '@mui/material';
import ListaProfessores from '@/components/dashboard/professores/lista-professores';

export default function Page(): React.JSX.Element {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Professores</Typography>
      <Box>
        <ListaProfessores />
      </Box>
    </Container>
  );
}
