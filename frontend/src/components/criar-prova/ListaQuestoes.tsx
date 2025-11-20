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
import axios from 'axios';

export interface Question {
  id_questao: string | number;
  enunciado: string;
  imagem?: string | null;
}

interface Props {
  id_disciplina: string | number | null;
  onSelect: (q: Question) => void;
  selectedIds?: Array<string | number>;
}

export default function ListaQuestoes({ id_disciplina, onSelect, selectedIds = [] }: Props) {
  const [questoes, setQuestoes] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id_disciplina) return setQuestoes([]);
    const fetchQuestoes = async () => {
      setLoading(true);
      try {
        // Ajuste a URL conforme seu backend
        const res = await axios.get(`http://localhost/sea/backend/controllers/QuestaoController.php?tipo=questoes&id_disciplina=${id_disciplina}`);
        const data = Array.isArray(res.data) ? res.data : Object.values(res.data || {});
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

  if (!id_disciplina) return <Typography>Selecione um componente curricular para listar questões.</Typography>;

  return (
    <Box>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {questoes.map((q) => (
            <Grid size={{xs: 12, sm:8, md:6}} key={q.id_questao}>
              <Card>
                {q.imagem && (
                  <CardMedia component="img" height="140" image={q.imagem} alt={`imagem-${q.id_questao}`} />
                )}
                <CardContent>
                  <Typography variant="body2" dangerouslySetInnerHTML={{ __html: q.enunciado }} />
                </CardContent>
                <Divider />
                <Box sx={{ p: 1, display: 'flex', justifyContent: 'flex-end' }}>
                  {(() => {
                    const isSelected = selectedIds.some((id) => String(id) === String(q.id_questao));
                    return (
                      <Button
                        size="small"
                        variant={isSelected ? 'outlined' : 'contained'}
                        onClick={() => onSelect(q)}
                        disabled={isSelected}
                      >
                        {isSelected ? 'Selecionada' : 'Selecionar'}
                      </Button>
                    );
                  })()}
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
