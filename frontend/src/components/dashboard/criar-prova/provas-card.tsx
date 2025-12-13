"use client";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { ClockIcon } from '@phosphor-icons/react/dist/ssr/Clock';
import { DownloadSimple, Pencil, TrashSimple, Eye } from '@phosphor-icons/react/dist/ssr';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

export interface Prova {
  id: string;
  title: string;
  description?: string;
  logo?: string;
  installs?: number;
  updatedAt?: string | Date;
}

export interface ProvaCardProps {
  prova: Prova;
  onView?: (id: string) => void;
  onDownload?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function ProvaCard({ prova, onView, onDownload, onEdit, onDelete }: ProvaCardProps): React.JSX.Element {
  const router = useRouter();

  const handleView = () => {
    if (onView) return onView(prova.id);
    try {
      router.push(`/dashboard/criacao/prova?id=${prova.id}`);
    } catch {
      console.debug('view not wired', prova.id);
    }
  };

  const handleEdit = () => {
    if (onEdit) return onEdit(prova.id);
    try {
      router.push(`/dashboard/criacao/prova?edit=${prova.id}`);
    } catch {
      console.debug('edit not wired', prova.id);
    }
  };

  const handleDownload = () => {
    if (onDownload) return onDownload(prova.id);
    const url = `http://localhost/sea/backend/controllers/downloadProvasZipController.php?id_prova=${prova.id}`;
    window.open(url, '_blank');
  };

  const handleDelete = async () => {
    if (onDelete) return onDelete(prova.id);
    if (!confirm('Deseja realmente deletar esta avaliação? Esta ação não pode ser desfeita.')) return;
    console.warn('delete requested for prova', prova.id);
  };
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', borderColor: 'var(--mui-palette-divider)', borderWidth: 1, borderStyle: 'solid' }} >
      <CardContent sx={{ flex: '1 1 auto' }}>
        <Stack spacing={2}>
          <Stack spacing={1}>
            <Typography align="center" variant="h5">
              {prova.title}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
        <Stack sx={{ alignItems: 'center' }} direction="row" spacing={1}>
          <ClockIcon fontSize="var(--icon-fontSize-sm)" />
          <Typography color="text.secondary" display="inline" variant="body2">
            Criada em {dayjs(prova.updatedAt ?? new Date()).format('DD/MM/YYYY')}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={0}>
          <Tooltip title="Deletar">
            <IconButton size="small" color="error" onClick={handleDelete}>
              <TrashSimple weight="bold" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </Card>
  );
}