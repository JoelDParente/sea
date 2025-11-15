"use client";

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  Divider,
} from '@mui/material';

import { Question } from './ListaQuestoes';

interface Props {
  questoes: Question[];
  onRemove: (id: string | number) => void;
}

export default function QuestoesSelecionadas({ questoes, onRemove }: Props) {
  if (!questoes || questoes.length === 0) {
    return <Typography>Nenhuma questão selecionada.</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {questoes.map((q) => (
        <Grid size={{xs: 12, sm:6, md:4}} key={q.id_questao}>
          <Card>
            <CardContent>
              <Typography variant="body2" dangerouslySetInnerHTML={{ __html: q.enunciado }} />
            </CardContent>
            <Divider />
            <CardActions>
              <Button size="small" color="error" onClick={() => onRemove(q.id_questao)}>
                Remover
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
