'use client'

import * as React from 'react';
import type { Metadata } from 'next';
import Grid from '@mui/material/Grid';
import { Typography, Box } from '@mui/material';

import { config } from '@/config';
import { CriarProva } from '@/components/dashboard/overview/criar-prova';
import { MinhasAvaliacoes } from '@/components/dashboard/overview/minhas-avaliacoes';
import { ImportarProva } from '@/components/dashboard/overview/importar-prova';
import { CorrigirProva } from '@/components/dashboard/overview/corrigir-prova';


export default function Page(): React.JSX.Element {
  const [firstName, setFirstName] = React.useState("Professor");

  React.useEffect(() => {
    // Esse código só roda no cliente
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const nome = user?.nome || user?.name;
      if (nome) setFirstName(nome.split(" ")[0]);
    }
  }, []);
  return (
    <Box sx={{ p: 0 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        👋 Bem-vindo(a), {firstName}!
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Aqui você pode criar, corrigir e acompanhar suas avaliações de forma rápida e intuitiva.
      </Typography>
      {/* Criar Prova */}
      <Grid container spacing={2}>
        <Grid size={{ lg: 4, sm: 6, xs: 12 }}>
          <CriarProva sx={{ height: '100%' }} />
        </Grid>
        {/* Corrigir Prova */}
        <Grid size={{ lg: 4, sm: 6, xs: 12 }}>
          <CorrigirProva sx={{ height: '100%' }} />
        </Grid>
        {/* Importar Prova */}
        <Grid size={{ lg: 4, sm: 6, xs: 12 }}>
          <ImportarProva sx={{ height: '100%' }} />
        </Grid>
        {/* Minhas Avaliações */}
        <Grid
          size={{
            lg: 12,
            md: 12,
            xs: 12,
          }}
        >
          <MinhasAvaliacoes sx={{ height: '100%' }}
            provas={[
              {
                id: '1',
                title: 'Prova de Matemática',
                description: 'Equações, funções e geometria.',
                logo: '/assets/provas/math.svg',
                installs: 45,
                updatedAt: new Date(),
              },
              {
                id: '2',
                title: 'Prova de História',
                description: 'Brasil Império e movimentos sociais.',
                logo: '/assets/provas/history.svg',
                installs: 32,
                updatedAt: new Date(),
              },
            ]}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
