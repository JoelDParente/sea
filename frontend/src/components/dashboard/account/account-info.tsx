'use client'

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useUser } from '@/hooks/use-user';
import ModalUploadFoto from './modal-upload-foto';

export function AccountInfo(): React.JSX.Element {
  const { user } = useUser();

  const [openModal, setOpenModal] = React.useState(false);

  const avatar = user?.foto ?? '../assets/avatar.png';

  function handleUpload(file: File) {
    console.log('Arquivo recebido:', file);
  }

  function capitalizarPrimeiraLetra(texto: string): string {
  if (!texto) {
    return ""; 
  }
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

  return (
    <>
      <Card>
        <CardContent>
          <Stack spacing={2} sx={{ alignItems: 'center' }}>
            <Avatar src={String(avatar)} sx={{ height: 80, width: 80 }} />

            <Stack spacing={1} sx={{ textAlign: 'center' }}>
              <Typography variant="h5">{String(user?.nome ?? '')}</Typography>
              <Typography color="text.secondary" variant="body2">
                {capitalizarPrimeiraLetra(String(user?.tipo ?? ''))}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>

        <Divider />

        <CardActions>
          <Button
            fullWidth
            variant="text"
            onClick={() => setOpenModal(true)}
          >
            Mudar foto
          </Button>
        </CardActions>
      </Card>

      <ModalUploadFoto
        open={openModal}
        onClose={() => setOpenModal(false)}
        onUpload={handleUpload}
      />
    </>
  );
}