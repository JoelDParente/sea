import type { Metadata } from 'next';
import { config } from '@/config';
import { Box, Typography } from '@mui/material';

export const metadata: Metadata = {
  title: `Criar Prova | ${config.site.name}`,
  description: 'Monte uma nova prova e defina as questões associadas.',
};

export default function CriarProvaLayout({
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
