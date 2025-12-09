import type { Metadata } from 'next';
import { config } from '@/config';
import { Box, Typography } from '@mui/material';

export const metadata: Metadata = {
  title: `Criar Questão | ${config.site.name}`,
  description: 'Crie e edite questões para suas avaliações.',
};

export default function CriarQuestaoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ p: 4 }}>
      {children}
    </Box>
  );
}
