'use client';

import { Box, Button, Typography } from '@mui/material';
import { ArrowLeft } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';
import { paths } from '@/paths';
import EditorProva from '@/components/dashboard/criacao/prova/editor-prova';

export default function CriarProvaPage() {
  const router = useRouter();

  return (
    <Box sx={{ p: 2, width: '100%', maxWidth: '1400px', mx: 'auto' }}>
      {/* Botão de voltar */}
      <Button
        startIcon={<ArrowLeft size={18} />}
        onClick={() => router.push(paths.dashboard.criacao.root)}
        sx={{ mb: 2 }}
      >
        Voltar para o Menu
      </Button>

      {/* Título */}
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        Criar Nova Prova 📝
      </Typography>

      {/* Componente principal */}
      <EditorProva />
    </Box>
  );
}
