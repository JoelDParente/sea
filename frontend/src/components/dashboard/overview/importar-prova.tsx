import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import type { SxProps } from '@mui/material/styles';
import { UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';

export interface ImportarProvaProps {
  sx?: SxProps;
}

export function ImportarProva({ sx }: ImportarProvaProps): React.JSX.Element {
  return (
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
  );
}
