"use client";

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { useRouter } from 'next/navigation';
import { paths } from '@/paths';

type Turma = {
  id_turma: number;
  id_escola: number;
  nome_turma: string;
  serie: string;
  turno: string;
  imageUrl?: string | null;
};

const turmas: Turma[] = [
  { id_turma: 1, id_escola: 1, nome_turma: '1º EM A', serie: '1', turno: 'Manhã', imageUrl: null },
  { id_turma: 2, id_escola: 1, nome_turma: '2º EM A', serie: '2', turno: 'Manhã', imageUrl: '/assets/sample-class-1.jpg' },
  { id_turma: 3, id_escola: 1, nome_turma: '3º EM A', serie: '3', turno: 'Manhã', imageUrl: null },
  { id_turma: 4, id_escola: 1, nome_turma: '1º EM B', serie: '1', turno: 'Tarde', imageUrl: '/assets/sample-class-2.jpg' },
  { id_turma: 5, id_escola: 1, nome_turma: '2º EM B', serie: '2', turno: 'Tarde', imageUrl: null },
  { id_turma: 6, id_escola: 1, nome_turma: '3º EM B', serie: '3', turno: 'Tarde', imageUrl: null }
];

export default function TurmasClient(): React.JSX.Element {
  const router = useRouter();

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Turmas</Typography>
        </Stack>

        
      </Stack>

      <Box
        component="div"
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(5, 1fr)'
          }
        }}
      >
        {turmas.map((turma) => (
          <Box key={turma.id_turma}>
            <Card
              onClick={() => router.push(`${paths.dashboard.turmas}/${turma.id_turma}`)}
              sx={{
                cursor: 'pointer',
                height: 140,
                width: '105%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  boxShadow: 6,
                  transform: 'translateY(-4px)',
                  transition: 'all 0.2s ease-in-out'
                }
              }}
            >
              <Box
                sx={{
                  height: 100,
                  backgroundColor: 'grey.100',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {turma.imageUrl ? (
                  <Box component="img" src={turma.imageUrl} alt={turma.nome_turma} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <Box sx={{ width: '100%', height: '100%', bgcolor: 'primary.main' }} />
                )}
              </Box>

              <CardContent sx={{ py: 1, px: 2, flex: '0 0 auto' }}>
                <Typography variant="subtitle1" color="text.primary">
                  {turma.nome_turma}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {`${turma.serie}º Ano EM • ${turma.turno}`}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Stack>
  );
}
