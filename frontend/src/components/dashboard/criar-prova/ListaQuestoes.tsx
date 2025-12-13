"use client";

import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  CircularProgress,
  Divider,
} from '@mui/material';
import ModalVerMais from './ModalVerMais';
import axios from 'axios';

export interface Question {
  id_questao: string | number;
  enunciado: string;
  imagem?: string | null;
  alternativas?: { texto: string }[];
}

interface Props {
  id_disciplina: string | number | null;
  onSelect: (q: Question) => void;
  selectedIds?: Array<string | number>;
}

export default function ListaQuestoes({
  id_disciplina,
  onSelect,
  selectedIds = [],
}: Props) {
  const [questoes, setQuestoes] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [openQuestion, setOpenQuestion] = useState<Question | null>(null);

  useEffect(() => {
    if (!id_disciplina) {
      setQuestoes([]);
      return;
    }

    const fetchQuestoes = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost/sea/backend/controllers/QuestaoController.php?tipo=questoes&id_disciplina=${id_disciplina}`
        );
        const data = Array.isArray(res.data)
          ? res.data
          : Object.values(res.data || {});
        setQuestoes(data as Question[]);
      } catch (err) {
        console.error('Erro ao buscar questões', err);
        setQuestoes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestoes();
  }, [id_disciplina]);

  if (!id_disciplina) {
    return (
      <Typography>
        Selecione um componente curricular para listar questões.
      </Typography>
    );
  }

  return (
    <Box>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {questoes.map((q) => {
            const isSelected = selectedIds.some(
              (id) => String(id) === String(q.id_questao)
            );

            return (
              <Grid key={q.id_questao} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card
                  sx={{
                    height: 260,
                    display: 'flex',
                    flexDirection: 'column',
                    border: isSelected ? '2px solid' : '1px solid',
                    borderColor: isSelected ? 'primary.main' : 'divider',

                    opacity: isSelected ? 0.65 : 1,
                    filter: isSelected ? 'grayscale(30%)' : 'none',

                    boxShadow: isSelected ? 1 : 6,
                    transition: 'all 0.25s ease-in-out',

                    '&:hover': {
                      boxShadow: 4,
                    },
                  }}
                >
                  {q.imagem && (
                    <CardMedia
                      component="img"
                      image={q.imagem}
                      alt={`imagem-${q.id_questao}`}
                      sx={{ height: 120, objectFit: 'cover' }}
                    />
                  )}

                  <CardContent sx={{ flex: 1, overflow: 'hidden' }}>
                    <Typography
                      variant="body2"
                      dangerouslySetInnerHTML={{ __html: q.enunciado }}
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 6,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    />
                  </CardContent>

                  <Divider />

                  <Box
                    sx={{
                      p: 1,
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: 1,
                    }}
                  >
                    <Button size="small" onClick={() => setOpenQuestion(q)} >
                      Ver mais
                    </Button>

                    <Button
                      size="small"
                      variant={isSelected ? 'outlined' : 'contained'}
                      onClick={() => onSelect(q)}
                      disabled={isSelected}
                    >
                      {isSelected ? 'Selecionada' : 'Selecionar'}
                    </Button>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      <ModalVerMais
        open={!!openQuestion}
        question={openQuestion || undefined}
        onClose={() => setOpenQuestion(null)}
      />
    </Box>
  );
}