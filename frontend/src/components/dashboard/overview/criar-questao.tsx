'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Pencil } from '@phosphor-icons/react/dist/ssr/Pencil';
import { useRouter } from 'next/navigation';
import type { SxProps } from '@mui/material/styles';
import { paths } from '@/paths';

export interface CriarQuestaoProps {
  sx?: SxProps;
}

export function CriarQuestao({ sx }: CriarQuestaoProps): React.JSX.Element {
  const router = useRouter();

  return (
    <Card
      sx={{
        ...sx,
        display: "flex",
        flexDirection: "column",
        p: 3,
        borderRadius: "18px",
        border: "1px solid rgba(0,0,0,0.06)",
        background: "var(--mui-palette-background-paper)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
        transition: "all .25s ease",
        "&:hover": {
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          borderColor: "rgba(0,0,0,0.12)",
          transform: "translateY(-3px)",
        }
      }}
    >
      <CardContent>
        <Stack spacing={3}>

          {/* Header */}
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack spacing={1}>
              <Typography variant="h5" fontWeight={600}>
                Criar Questão
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Crie questões para diversas matérias.
              </Typography>
            </Stack>

            <Avatar
              sx={{
                height: 56,
                width: 56,
                borderRadius: "14px",
                background: "rgba(25, 192, 128, 0.1)",
                color: "var(--mui-palette-success-main)",
                boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
              }}
            >
              <Pencil size={30} weight="duotone" />
            </Avatar>
          </Stack>

          {/* Action */}
          <Button
            variant="contained"
            onClick={() => router.push(paths.dashboard.criacao.questao)}
            sx={{
              px: 3,
              py: 1.2,
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 500,
              alignSelf: "flex-start",
            }}

            color="success"
          >
            Criar questão
          </Button>

        </Stack>
      </CardContent>
    </Card>
  );
}
