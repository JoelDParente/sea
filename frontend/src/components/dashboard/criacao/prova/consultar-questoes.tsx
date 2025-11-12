'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  CircularProgress,
  Typography,
  Paper,
  Chip,
  Stack,
} from '@mui/material';
import axios from 'axios';

const API_BASE = 'http://localhost/sea/backend/controllers';

interface Questao {
  id_questao: number;
  titulo: string;
  enunciado: string;
  alternativas?: { texto: string }[];
  resposta_correta?: string;
}

interface ConsultarQuestoesProps {
  onSelectQuestao: (questao: Questao) => void;
}

export default function ConsultarQuestoes({ onSelectQuestao }: ConsultarQuestoesProps) {
  const [disciplinas, setDisciplinas] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [assuntos, setAssuntos] = useState<any[]>([]);
  const [questoes, setQuestoes] = useState<Questao[]>([]);

  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState<number | ''>('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<number | ''>('');
  const [assuntoSelecionado, setAssuntoSelecionado] = useState<number | ''>('');

  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  // Carregar disciplinas ao montar
  useEffect(() => {
    const buscarDisciplinas = async () => {
      try {
        const res = await axios.get(`${API_BASE}/QuestaoController.php?tipo=disciplinas`);
        setDisciplinas(Array.isArray(res.data) ? res.data : Object.values(res.data || {}));
      } catch (err) {
        console.error('Erro ao buscar disciplinas:', err);
      }
    };
    buscarDisciplinas();
  }, []);

  // Buscar categorias quando disciplina muda
  const handleDisciplinaChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const idDisciplina = Number(e.target.value);
    setDisciplinaSelecionada(idDisciplina);
    setCategorias([]);
    setAssuntos([]);
    setQuestoes([]);
    setCategoriaSelecionada('');
    setAssuntoSelecionado('');

    if (idDisciplina) {
      try {
        const res = await axios.get(
          `${API_BASE}/QuestaoController.php?tipo=categorias&id_disciplina=${idDisciplina}`
        );
        setCategorias(Array.isArray(res.data) ? res.data : Object.values(res.data || {}));
      } catch (err) {
        console.error('Erro ao buscar categorias:', err);
      }
    }
  };

  // Buscar assuntos quando categoria muda
  const handleCategoriaChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const idCategoria = Number(e.target.value);
    setCategoriaSelecionada(idCategoria);
    setAssuntos([]);
    setQuestoes([]);
    setAssuntoSelecionado('');

    if (idCategoria) {
      try {
        const res = await axios.get(
          `${API_BASE}/QuestaoController.php?tipo=assuntos&id_categoria=${idCategoria}`
        );
        setAssuntos(Array.isArray(res.data) ? res.data : Object.values(res.data || {}));
      } catch (err) {
        console.error('Erro ao buscar assuntos:', err);
      }
    }
  };

  // Buscar questões do assunto selecionado
  const buscarQuestoes = async () => {
    if (!assuntoSelecionado) {
      alert('Selecione um assunto para buscar questões.');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(
        `${API_BASE}/QuestaoController.php?tipo=questoes&id_assunto=${assuntoSelecionado}`
      );
      const questoesFetched = Array.isArray(res.data) ? res.data : Object.values(res.data || {});
      setQuestoes(questoesFetched);
    } catch (err) {
      console.error('Erro ao buscar questões:', err);
      setQuestoes([]);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar questões por texto de busca
  const questoesFiltradas = questoes.filter((q) =>
    q.titulo.toLowerCase().includes(searchText.toLowerCase()) ||
    q.enunciado.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>


      {/* Filtros */}
      <Stack spacing={2}>
        <TextField
          select
          label="Disciplina"
          value={disciplinaSelecionada}
          onChange={handleDisciplinaChange}
          fullWidth
          size="small"
        >
          <MenuItem value="">Selecione uma disciplina</MenuItem>
          {disciplinas.map((d) => (
            <MenuItem key={d.id_disciplina} value={d.id_disciplina}>
              {d.nome_disciplina}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Categoria"
          value={categoriaSelecionada}
          onChange={handleCategoriaChange}
          fullWidth
          size="small"
          disabled={!disciplinaSelecionada}
        >
          <MenuItem value="">Selecione uma categoria</MenuItem>
          {categorias.map((c) => (
            <MenuItem key={c.id_categoria} value={c.id_categoria}>
              {c.nome_categoria}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Assunto"
          value={assuntoSelecionado}
          onChange={(e) => {
            setAssuntoSelecionado(Number(e.target.value) || '');
            setQuestoes([]);
          }}
          fullWidth
          size="small"
          disabled={!categoriaSelecionada}
        >
          <MenuItem value="">Selecione um assunto</MenuItem>
          {assuntos.map((a) => (
            <MenuItem key={a.id_assunto} value={a.id_assunto}>
              {a.nome_assunto}
            </MenuItem>
          ))}
        </TextField>

        <Button
          variant="contained"
          color="primary"
          onClick={buscarQuestoes}
          disabled={!assuntoSelecionado || loading}
          fullWidth
        >
          {loading ? <CircularProgress size={24} /> : 'Buscar Questões'}
        </Button>
      </Stack>

      <Typography variant="body2" color="textSecondary">
        Total de questões: {questoesFiltradas.length}
      </Typography>

      {/* Barra de busca por texto */}
      {questoesFiltradas.length > 0 && (
        <TextField
          placeholder="Buscar por título ou enunciado..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          fullWidth
          size="small"
          variant="outlined"
        />
      )}

      {/* Lista de questões */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && questoesFiltradas.length > 0 && (
        <Paper sx={{ maxHeight: 400, overflow: 'auto', border: '1px solid #ddd' }}>
          <List>
            {questoesFiltradas.map((questao) => (
              <ListItem key={questao.id_questao} disablePadding>
                <ListItemButton
                  onClick={() => onSelectQuestao(questao)}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    p: 1.5,
                    borderBottom: '1px solid #f0f0f0',
                    '&:hover': { backgroundColor: '#f5f5f5' },
                  }}
                >
                  <ListItemText
                    primary={questao.titulo}
                    secondaryTypographyProps={{ component: 'div' }}
                    secondary={
                      <Box
                        sx={{
                          mt: 0.5,
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 2,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'pre-wrap',
                        }}
                        dangerouslySetInnerHTML={{ __html: questao.enunciado }}
                      />
                    }
                  />
                  {questao.alternativas && questao.alternativas.length > 0 && (
                    <Stack direction="row" spacing={0.5} sx={{ mt: 1, flexWrap: 'wrap', gap: 0.5 }}>
                      {questao.alternativas.map((alt, idx) => (
                        <Chip
                          key={idx}
                          label={`${String.fromCharCode(65 + idx)}. ${alt.texto.substring(0, 20)}...`}
                          size="small"
                          variant={questao.resposta_correta === String.fromCharCode(65 + idx) ? 'filled' : 'outlined'}
                          color={questao.resposta_correta === String.fromCharCode(65 + idx) ? 'success' : 'default'}
                        />
                      ))}
                    </Stack>
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      {!loading && questoesFiltradas.length === 0 && questoes.length > 0 && (
        <Typography variant="body2" color="textSecondary" sx={{ p: 2, textAlign: 'center' }}>
          Nenhuma questão encontrada com os filtros aplicados.
        </Typography>
      )}

      {!loading && questoes.length === 0 && assuntoSelecionado && (
        <Typography variant="body2" color="textSecondary" sx={{ p: 2, textAlign: 'center' }}>
          Nenhuma questão encontrada para o assunto selecionado.
        </Typography>
      )}
    </Box>
  );
}
