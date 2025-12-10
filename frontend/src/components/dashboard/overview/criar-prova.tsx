'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import type { SxProps } from '@mui/material/styles';
import { FileText } from '@phosphor-icons/react/dist/ssr/FileText';
import { useRouter } from 'next/navigation';
import { paths } from '@/paths';

export interface CriarProvaProps {
  sx?: SxProps;
}

export function CriarProva({ sx }: CriarProvaProps): React.JSX.Element {
  const router = useRouter();

  return (
    <Card
      sx={{
        ...sx,
        display: "flex",
        flexDirection: "row",
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
      <CardContent sx={{ width: "100%" }}>
        <Stack spacing={3}>

          {/* Cabeçalho */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack spacing={1}>
              <Typography variant="h5" fontWeight={600}>
                Criar Prova
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Monte avaliações personalizadas com poucos cliques.
              </Typography>
            </Stack>

            {/* Ícone estilizado */}
            <Avatar
              sx={{
                height: 56,
                width: 56,
                borderRadius: "14px",
                background: "rgba(25,118,210,0.1)",
                color: "var(--mui-palette-primary-main)",
                boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
              }}
            >
              <FileText size={30} weight="duotone" />
            </Avatar>
          </Stack>

          {/* Botão */}
          <Button
            variant="contained"
            onClick={() => router.push(paths.dashboard.criacao.root)}
            sx={{
              px: 3,
              py: 1.2,
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 500,
              alignSelf: "flex-start",
              backgroundColor: "var(--mui-palette-primary-main)",
              "&:hover": {
                backgroundColor: "var(--mui-palette-primary-dark)",
              },
            }}
          >
            Iniciar criação
          </Button>

        </Stack>

        <Box
          sx={{
            height: "1px",
            width: "100%",
            background: "linear-gradient(to right, transparent, rgba(0,0,0,0.12), transparent)",
          }}
        />

        <Stack spacing={3}>

          {/* Cabeçalho */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack spacing={1}>
              <Typography variant="h5" fontWeight={600}>
                Criar Questão
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Crie questões sobre diversas matérias
              </Typography>
            </Stack>

            {/* Ícone estilizado */}
            <Avatar
              sx={{
                height: 56,
                width: 56,
                borderRadius: "14px",
                background: "rgba(25,118,210,0.1)",
                color: "var(--mui-palette-primary-main)",
                boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
              }}
            >
              <FileText size={30} weight="duotone" />
            </Avatar>
          </Stack>

          {/* Botão */}
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
              backgroundColor: "var(--mui-palette-primary-main)",
              "&:hover": {
                backgroundColor: "var(--mui-palette-primary-dark)",
              },
            }}
          >
            Iniciar criação
          </Button>

        </Stack>
      </CardContent>
    </Card>
  );
}