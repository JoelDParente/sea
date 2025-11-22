import type { Metadata } from 'next';
import { config } from '@/config';
import { Box, Typography } from '@mui/material';

export const metadata: Metadata = {
  title: `Criação de Provas | ${config.site.name}`,
  description: 'Monte uma nova prova completa com cabeçalho e slots de questões.',
};

export default function CriacaoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ p: 0 }}>
      {children}
    </Box>
  );
}
