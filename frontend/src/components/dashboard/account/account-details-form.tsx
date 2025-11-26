'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useUser } from '@/hooks/use-user';


export function AccountDetailsForm(): React.JSX.Element {
    const { user } = useUser();  // ← dados do JWT

  const fullName = String(user?.nome ?? user?.name ?? '');
  const nameParts = fullName.trim() === '' ? [] : fullName.trim().split(/\s+/);
  const firstName = nameParts.length > 0 ? nameParts[0] : '';
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
  const email = String(user?.email ?? '');
  const phone = String(user?.telefone ?? user?.phone ?? '');
  const city = String(user?.cidade ?? user?.city ?? '');

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Card>
        <CardHeader subheader="As informações podem ser editadas" title="Perfil" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid
              size={{
                md: 6,
                xs: 12,
              }}
            >
              <FormControl fullWidth required>
                <InputLabel>Primeiro Nome</InputLabel>
                <OutlinedInput defaultValue={firstName} label="Primeiro Nome" name="firstName" />
              </FormControl>
            </Grid>
            <Grid
              size={{
                md: 6,
                xs: 12,
              }}
            >
              <FormControl fullWidth required>
                <InputLabel>Sobrenome</InputLabel>
                <OutlinedInput defaultValue={lastName} label="Sobrenome" name="lastName" />
              </FormControl>
            </Grid>
            <Grid
              size={{
                md: 6,
                xs: 12,
              }}
            >
              <FormControl fullWidth required>
                <InputLabel>Email</InputLabel>
                <OutlinedInput defaultValue={email} label="Email" name="email" />
              </FormControl>
            </Grid>
            <Grid
              size={{
                md: 6,
                xs: 12,
              }}
            >
              <FormControl fullWidth>
                <InputLabel>Telefone</InputLabel>
                <OutlinedInput defaultValue={phone} label="Telefone" name="phone" type="tel" />
              </FormControl>
            </Grid>
            <Grid
              size={{
                md: 6,
                xs: 12,
              }}
            >
            </Grid>
            <Grid
              size={{
                md: 6,
                xs: 12,
              }}
            >
              <FormControl fullWidth>
                <InputLabel>City</InputLabel>
                <OutlinedInput defaultValue={city} label="City" />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained">Salvar detalhes</Button>
        </CardActions>
      </Card>
    </form>
  );
}
