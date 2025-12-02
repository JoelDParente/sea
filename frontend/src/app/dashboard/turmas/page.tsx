'use client';

import * as React from 'react';
import { Container, Box, Typography } from '@mui/material';
import TurmasList from '@/components/dashboard/turmas/TurmasList';

export default function Page(): React.JSX.Element {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Turmas</Typography>
      <Box>
        <TurmasList />
      </Box>
    </Container>
  );
}
