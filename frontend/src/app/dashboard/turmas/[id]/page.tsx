'use client';

import * as React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Container, Box, Typography, Stack, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StudentsTable from '@/components/dashboard/turmas/StudentsTable';
import axios from 'axios';

export default function TurmaDetailPage(): React.JSX.Element {
  const router = useRouter();
  const search = typeof window !== 'undefined' ? window.location.pathname : '';
  const parts = search.split('/');
  const id = Number(parts[parts.length - 1] ?? 0);

  const [turma, setTurma] = React.useState<any | null>(null);

  React.useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await axios.get(`http://localhost/sea/backend/controllers/TurmaController.php?id_turma=${id}`);
        setTurma(res.data);
      } catch (err) { console.error(err); }
    })();
  }, [id]);

  return (
    <Container sx={{ py: 4 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button variant="text" startIcon={<ArrowBackIcon />} onClick={() => router.push('/dashboard/turmas')}>Voltar</Button>
          <Typography variant="h5">{turma ? `${turma.nome_turma} — ${turma.serie}` : 'Carregando...'}</Typography>
        </Stack>
      </Stack>

      <Box sx={{ display: 'grid', gap: 2 }}>
        <StudentsTable idTurma={id} />
      </Box>
    </Container>
  );
}
