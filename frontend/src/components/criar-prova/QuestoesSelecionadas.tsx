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
import ModalVerMais from './ModalVerMais';

interface Props {
  questoes: Question[];
  onRemove: (id: string | number) => void;
}

export default function QuestoesSelecionadas({ questoes, onRemove }: Props) {
  if (!questoes || questoes.length === 0) {
    return <Typography>Nenhuma questão selecionada.</Typography>;
  }

  const [openQuestion, setOpenQuestion] = React.useState<Question | null>(null);

  return (
    <>
      <Grid container spacing={2}>
        {questoes.map((q) => (
          <Grid item xs={12} sm={6} md={4} key={q.id_questao}>
            <Card sx={{ height: 180, display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: 1, overflow: 'hidden' }}>
                <Typography
                  variant="body2"
                  dangerouslySetInnerHTML={{ __html: q.enunciado }}
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 5,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                />
              </CardContent>
              <Divider />
              <CardActions>
                <Button size="small" onClick={() => setOpenQuestion(q)}>Ver mais</Button>
                <Button size="small" color="error" onClick={() => onRemove(q.id_questao)}>
                  Remover
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <ModalVerMais open={!!openQuestion} question={openQuestion || undefined} onClose={() => setOpenQuestion(null)} />
    </>
  );
}
