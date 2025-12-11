import type { Metadata } from 'next';
import { config } from '@/config';
import { Box } from '@mui/material';

export const metadata: Metadata = {
  title: `Gerenciamento de Questões | ${config.site.name}`,
  description: 'Edite e delete questões',
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
