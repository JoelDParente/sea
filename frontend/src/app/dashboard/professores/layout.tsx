import type { Metadata } from 'next';
import { config } from '@/config';
import { Box, Typography } from '@mui/material';

export const metadata: Metadata = {
  title: `Professores | ${config.site.name}`,
  description: 'Gerencie os professores cadastrados na plataforma.',
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
