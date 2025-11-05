"use client";

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import type { SxProps } from '@mui/material/styles';
import { UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';

export interface ImportarProvaProps {
  sx?: SxProps;
}

export function ImportarProva({ sx }: ImportarProvaProps): React.JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [alert, setAlert] = React.useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setAlert(null);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedFile(null);
    setAlert(null);
  };

  const handleImport = () => {
    if (!selectedFile) {
      setAlert('Selecione um arquivo antes de importar.');
      return;
    }

    // placeholder: aqui você pode enviar o arquivo para o backend ou processar localmente
    setAlert(`Arquivo "${selectedFile.name}" preparado para importação.`);
  };

  const [isDragging, setIsDragging] = React.useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
      setAlert(null);
    }
  };

  return (
    <>
      <Card
        sx={{
          ...sx,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          p: 2,
        }}
      >
        <CardContent>
          <Stack spacing={3}>
            <Stack
              direction="row"
              sx={{ alignItems: 'center', justifyContent: 'space-between' }}
              spacing={3}
            >
              <Stack spacing={1}>
                <Typography color="text.primary" variant="h5">
                  Importar Prova
                </Typography>
                <Typography color="text.secondary" variant="body1">
                  Faça o upload de avaliações existentes em .pdf e .docx.
                </Typography>
              </Stack>

              <Avatar
                sx={{
                  backgroundColor: 'var(--mui-palette-warning-light)',
                  height: '56px',
                  width: '56px',
                }}
              >
                <UploadIcon fontSize="var(--icon-fontSize-lg)" />
              </Avatar>
            </Stack>

            <Button
              variant="contained"
              onClick={handleOpen}
              sx={{
                textTransform: 'none',
                alignSelf: 'flex-start',
                mt: 1,
                backgroundColor: 'var(--mui-palette-warning-light)',
                '&:hover': {
                  backgroundColor: 'var(--mui-palette-warning-dark)',
                },
              }}
            >
              Ir para criação
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Adicionar prova</DialogTitle>
        <DialogContent>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Faça upload de arquivos de prova para corrigir questões automaticamente.
          </Typography>

          <Box
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            sx={{
              border: `2px dashed ${isDragging ? 'rgba(33,150,243,0.6)' : 'rgba(0,0,0,0.12)'}`,
              borderRadius: 2,
              p: 4,
              textAlign: 'center',
              backgroundColor: isDragging ? 'action.hover' : 'transparent',
            }}
          >
            <input
              accept=".pdf,.txt,.md,.docx,.jpg,.jpeg,.png,.mp3"
              style={{ display: 'none' }}
              id="import-upload"
              type="file"
              onChange={handleFileChange}
            />

            <label htmlFor="import-upload">
              <Button component="span" startIcon={<UploadIcon />} variant="outlined">
                Fazer upload de provas
              </Button>
            </label>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Arraste e solte ou selecione o arquivo para fazer upload
            </Typography>

            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Tipos de arquivos compatíveis: PDF e .docx
            </Typography>

            {selectedFile && (
              <Typography sx={{ mt: 2 }}>
                Arquivo selecionado: {selectedFile.name}
              </Typography>
            )}

            {alert && (
              <Alert severity="info" sx={{ mt: 2 }}>
                {alert}
              </Alert>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fechar</Button>
          <Button variant="contained" onClick={handleImport}>
            Importar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
