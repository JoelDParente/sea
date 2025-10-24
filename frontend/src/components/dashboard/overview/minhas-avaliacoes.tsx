import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import type { SxProps } from '@mui/material/styles';
import { ProvaCard, Prova } from '@/components/dashboard/provas/provas-card';

// Props do componente
export interface MinhasAvaliacoesProps {
  provas?: Prova[];
  sx?: SxProps;
}

// Componente principal
export function MinhasAvaliacoes({
  provas = [],
  sx,
}: MinhasAvaliacoesProps): React.JSX.Element {
  return (
    <Card sx={{ ...sx, mt: 4}}>
      <CardHeader
        title="Minhas Avaliações"
        sx={{
          pb: 1,
          '& .MuiCardHeader-title': { fontSize: '1.25rem', fontWeight: 600 },
        }}
      />

      {/* Grade de cards de provas */}
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          {provas.length > 0 ? (
            provas.map((prova) => (
              <Grid key={prova.id} size={{ lg: 4, md: 6, xs: 12 }}>
                <ProvaCard prova={prova} />
              </Grid>
            ))
          ) : (
            <Grid size={{ xs: 12 }}>
              <Box
                sx={{
                  textAlign: 'center',
                  py: 4,
                  color: 'text.secondary',
                  fontStyle: 'italic',
                }}
              >
                Nenhuma avaliação criada ainda.
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </Card>
  );
}