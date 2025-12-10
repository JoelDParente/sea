'use client'

import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Typography, Box } from '@mui/material';

import { CriarProva } from '@/components/dashboard/overview/criar-prova';
import { MinhasAvaliacoes } from '@/components/dashboard/overview/minhas-avaliacoes';
import { ImportarProva } from '@/components/dashboard/overview/importar-prova';
import { Calendario } from '@/components/dashboard/overview/corrigir-prova';


export default function Page(): React.JSX.Element {
  const [firstName, setFirstName] = React.useState("Professor");
  const [professorId, setProfessorId] = React.useState<number | null>(null);

  React.useEffect(() => {
    const storedUser = localStorage.getItem("user") || localStorage.getItem('usuario');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        const nome = user?.nome || user?.name;
        if (nome) setFirstName(nome.split(" ")[0]);
        setProfessorId(user?.id || user?.id_usuario || null);
        console.debug('dashboard page setProfessorId', { id: user?.id || user?.id_usuario || null });
      } catch {
        // ignore parse error
      }
    }
  }, []);
  return (
    <Box sx={{ p: 0 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        👋 Bem-vindo(a), {firstName}!
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Aqui você pode criar e acompanhar suas avaliações de forma rápida e intuitiva.
      </Typography>
      {/* Criar Prova */}
      <Grid container spacing={2}>
        <Grid size={{ lg: 5, sm: 6, xs: 12 }}>
          <CriarProva sx={{ height: '100%' }} />
        </Grid>

        <Grid size={{ lg: 7, sm: 6, xs: 12 }}>
          <Calendario sx={{ height: '100%' }} />
        </Grid>

        {/* Minhas Avaliações */}
        <Grid
          size={{
            lg: 12,
            md: 12,
            xs: 12,
          }}
        >
          {
            // tenta obter id do usuário logado e passar para o componente
          }
          <MinhasAvaliacoes sx={{ height: '100%' }} professorId={professorId} />
        </Grid>
      </Grid>
    </Box>
  );
}
