'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

type Escola = {
  nome_escola?: string;
  inep?: string;
  email?: string;
  telefone?: string;
};

export function EscolaDetailsForm(): React.JSX.Element {
  const [escola, setEscola] = React.useState<Escola | null>(null);

  React.useEffect(() => {
    const storedEscola = localStorage.getItem('escola');
    if (storedEscola) {
      setEscola(JSON.parse(storedEscola));
    }
  }, []);

  console.log('localStorage escola:', localStorage.getItem('escola'));

  if (!escola) {
    return <></>; // ou Skeleton
  }

  return (
    <Card>
      <CardHeader
        title="Sobre sua Escola"
        subheader="Veja alguns dados sobre ela"
      />
      <Divider />
      <CardContent>
        <Grid container spacing={3}>
          <Grid size={{ md: 6, xs: 12 }}>
            <FormControl fullWidth>
              <InputLabel>Nome</InputLabel>
              <OutlinedInput value={escola.nome_escola || ''} readOnly />
            </FormControl>
          </Grid>

          <Grid size={{ md: 6, xs: 12 }}>
            <FormControl fullWidth>
              <InputLabel>INEP</InputLabel>
              <OutlinedInput value={escola.inep || ''} readOnly />
            </FormControl>
          </Grid>

          <Grid size={{ md: 6, xs: 12 }}>
            <FormControl fullWidth>
              <InputLabel>Email</InputLabel>
              <OutlinedInput value={escola.email || ''} readOnly />
            </FormControl>
          </Grid>

          <Grid size={{ md: 6, xs: 12 }}>
            <FormControl fullWidth>
              <InputLabel>Telefone</InputLabel>
              <OutlinedInput value={escola.telefone || ''} readOnly />
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}