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

export function AccountInfo(): React.JSX.Element {
  const { user } = useUser();

  const name = user?.nome ?? 'Usuário';
  const email = user?.email ?? name;

  // Foto real se existir no JWT (Google, Microsoft, etc)
  const realPhoto = user?.photoURL;

  // Avatar automático da Dicebear baseado no e-mail ou nome
  const fallbackAvatar = `../assets/avatar.png`;

  return (
    <Card>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <Avatar
            src={fallbackAvatar}
            sx={{ height: '80px', width: '80px' }}
          />

          <Stack spacing={1} sx={{ textAlign: 'center' }}>
            <Typography variant="h5">{String(user?.nome ?? '')}</Typography>
            <Typography color="text.secondary" variant="body2">
              {String(user?.tipo ?? '')}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>

      <Divider />

      <CardActions>
        <Button fullWidth variant="text">
          Mudar foto
        </Button>
      </CardActions>
    </Card>
  );
}